import minimist from "minimist";
import { Image } from "image-js";
import { spawnSync } from "child_process";
import asciifyImage = require("asciify-image");
import { logger } from "./logger";
import fs = require("fs");
import fonts from "./fonts.json";

interface Font {
  font_width: number;
  font_height: number;
  chars_per_row: number;
  rows: number;
  first_character: string;
  space: number;
  map: any;
  path: string;
}

interface AsciiRenderer {
  render(inFile: string, columns: number, rows: number): Promise<string>;
}

class AsciifyRender implements AsciiRenderer {
  constructor() {}

  async render(inFile: string, columns: number, rows: number): Promise<string> {
    // asciify
    logger.info("enter render");
    
    let out = await asciifyImage(inFile, { fit: "box", width: columns / 2, height: rows });
    let realOut = "";
    if (Array.isArray(out)) {
      realOut = out[0]
    } else {
      realOut = out
    }

    return new Promise((resolve, reject) => {
      resolve(realOut);
    });
  }
}

class Jp2aRender implements AsciiRenderer {
  constructor() {}

  async jp2aVersion() {
    const spawnResult = spawnSync("jp2a", ["--version"], {
      cwd: process.cwd(),
      env: process.env,
      stdio: "pipe",
      encoding: "utf-8",
    });
    logger.info({ stdout: spawnResult.output });
    if (spawnResult.status !== 0) {
      throw new Error(`jp2a exited with ${spawnResult.status}`);
    } else {
      return spawnResult.output;
    }
  }

  async jp2aImage(width: number, file: string, version: boolean) {
    let options = [`--width=${width}`, "--invert", file];
    if (version == true) {
      options = [
        `--width=${width}`,
        "--colors",
        "--color-depth=24",
        "--fill",
        file,
      ];
    }
    logger.info({ options: "jp2a " + options.join(" ") });
    const spawnResult = spawnSync("jp2a", options, {
      cwd: process.cwd(),
      env: process.env,
      stdio: "pipe",
      encoding: "utf-8",
    });
    //logger.info({"stdout":spawnResult.output});
    if (spawnResult.status !== 0) {
      throw new Error(`jp2a exited with ${spawnResult.status}`);
    } else {
      return spawnResult.output;
    }
  }

  async render(inFile: string, columns: number, rows: number): Promise<string> {
    // jp2a
    await this.jp2aVersion();
    // TODO: if 1.0.6 need to fix colours
    // right now always use 24 bit colour 
    let colours24bit = true;
    let out = await this.jp2aImage(columns, inFile, colours24bit);

    let realOut = "Error";
    if (out != null) {
       realOut = out[1] || ""
    }

    return new Promise((resolve, reject) => {
      resolve(realOut);
    });
  }
}

/*************************************************
 * Log details of the image
 */
function imageDetails(image: Image, path: string) {
  logger.debug({
    path: path,
    width: image.width,
    height: image.height,
    colorModel: image.colorModel,
    components: image.components,
    alpha: image.alpha,
    channels: image.channels,
    bitDepth: image.bitDepth,
  });
}

async function render(
  text: string,
  font: Font,
  renderer: AsciiRenderer,
  terminalColumns: number,
  terminalRows: number
) {
  const font_width = font.font_width;
  const font_height = font.font_height;
  const chars_per_row = font.chars_per_row;

  let lines = [" "]
  let lines_count = 1
  let max_length = 1
  if (text.length > 0) {
    lines = text.split("\n") 
    lines_count = lines.length
    if (lines_count == 1) {
      max_length = lines[0].length
    } else {
      max_length = Math.max(...(lines.map(el => el.length)));
    }
  }

  logger.debug({ lines_count: lines_count, max_length: max_length });

  // create output banner image
  const banner = new Image({
    width: font_width * max_length,
    height: font_height * lines_count,
  });
  imageDetails(banner, "memory");

  let fontImage = await Image.load(font.path);
  imageDetails(fontImage, font.path);

  // render the characters
  let line = 0, cursor = 0 
  for (let c = 0; c < text.length; c++) {
    let letter = text[c];
    if (letter == "\n") {
      line += font_height
      cursor = 0 
      continue
    }
    // map the character code 
    let useMap = false
    let code = text.charCodeAt(c);
    let newcode = code

    if (font.first_character == " ") {
      // if " " is configured as first character of the font we assume it is in order 
      newcode -= font.first_character.charCodeAt(0);
    } else {
      // otherwise we use the map
      // if not in range we attempt to find code - otherwise unknown characters rendered as spaces. 
      newcode = (font.map as any)[letter] || font.space 
      if (code >= "A".charCodeAt(0) && code <= "Z".charCodeAt(0)) {
        if (font.map.hasOwnProperty("A-Z")) {
          newcode = font.map["A-Z"] + (letter.charCodeAt(0) - "A".charCodeAt(0))
        }
      } 
      if (code >= "0".charCodeAt(0) && code <= "9".charCodeAt(0)) {
        if (font.map.hasOwnProperty("0-9")) {
          newcode = font.map["0-9"] + (letter.charCodeAt(0) - "0".charCodeAt(0))
        }
      } 
      useMap = true
    }

    let column = Math.floor(newcode % chars_per_row) * font_width;
    let row = Math.floor(newcode / chars_per_row) * font_height;
  
    logger.debug({ charcode: code, newcharcode: newcode, x: column, y: row, useMap: useMap });
  
    if (column >= 0 && row >= 0) {
      if ((row < (font.rows * font_height)) && (column < (chars_per_row * font_width) )) {
        let clip_height = font_height
        if (row + clip_height > fontImage.height) {
          clip_height -= ((row + clip_height) - fontImage.height)
        }
        let letterImage = fontImage.crop({
          x: column,
          y: row,
          width: font_width,
          height: clip_height,
        });
        banner.insert(letterImage, { x: cursor * font_width, y: line, inPlace: true });  
      }
    }
    cursor++

  }

  // save the banner
  var outPath = "./out";
  if (!fs.existsSync(outPath)) {
    fs.mkdirSync(outPath);
  }

  const outFile = `${outPath}/banner.jpg`;
  await banner.save(outFile);

  let renderColumns = terminalColumns
  if (banner.width < terminalColumns) {
    renderColumns = banner.width
  }
  let output = await renderer.render(outFile, renderColumns, terminalRows);
  console.log(output);
}

// Main
async function main(args: minimist.ParsedArgs) {
  logger.debug("enter main:" + args._);
  logger.debug("args:" + args["banner"]);
  let text = args["banner"];
  text = text.toUpperCase();

  logger.info({ fonts: fonts });

  // choose the font or default
  let fontname = "carebear"
  let font = fonts["carebear"];
  if (fonts.hasOwnProperty(args["font"])) {
    font = (fonts as any)[args["font"]];
    fontname = args["font"];
  } 
  logger.info({
    actual_font: fontname,
    requested_font: args["font"],
  });

  // output ascii
  let terminalColumns = process.stdout.columns;
  let terminalRows = process.stdout.rows;
  if (args["width"] != null) {
    let width = parseInt(args["width"], 10);
    if (args["clip"]) {
      if (width < terminalColumns) {
        logger.info("width larger than terminal clipping");
        terminalColumns = width;
      }
    } else {
      terminalColumns = width;
    }
  }
  if (args["height"] != null) {
    let height = parseInt(args["height"], 10);
    if (args["clip"]) {
      if (height < terminalRows) {
        logger.info("height larger than terminal clipping");
        terminalRows = height;
      } else {
        terminalRows = height;
      }
    }
  }
  logger.info({
    width: terminalColumns,
    height: terminalRows,
    passedwidth: args["width"],
    passedheight: args["height"],
  });

  if (args["jp2a"]) {
    await render(
      text, 
      font, 
      new Jp2aRender(), 
      terminalColumns, 
      terminalRows
    );
  } else {
    await render(
      text,
      font,
      new AsciifyRender(),
      terminalColumns,
      terminalRows
    );
  }

  logger.debug("exit main");

  return new Promise((resolve, reject) => {});
}

let args: minimist.ParsedArgs = minimist(process.argv.slice(2), {
  string: ["banner", "font", "width", "height"], // --banner "builder" --font "tcb"
  boolean: ["jp2a", "verbose", "clip"],
  //alias: { v: 'version' }
});
if (args["verbose"]) {
  logger.level = "debug";
} else {
  logger.level = "error";
}
logger.info(args);
main(args)
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
