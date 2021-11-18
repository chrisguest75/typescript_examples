import minimist from "minimist";
import { Image } from "image-js";

import fs = require("fs");
import fonts from "./fonts.json";
import Font from "./interfaces/Font";
import { logger } from "./logger";
import Jp2aRender from "./Jp2aRender";
import AsciifyRender from "./AsciifyRender";
import AsciiRenderer from "./interfaces/AsciiRenderer";


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
  logger.info({ fonts: fonts });

  if (args["list"]) {
      let fontnames = Object.getOwnPropertyNames(fonts)
      for (let i = 0; i < fontnames.length; i++) {
        console.log(fontnames[i]);
      }
  } else {
    let text = "BANNER"
    if (args.hasOwnProperty("banner")) {
      logger.debug("args:" + args["banner"]);
      text = args["banner"];
      text = text.toUpperCase();  
    }

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
  }

  logger.debug("exit main");

  return new Promise((resolve, reject) => {});
}

let args: minimist.ParsedArgs = minimist(process.argv.slice(2), {
  string: ["banner", "font", "width", "height"], // --banner "builder" --font "tcb"
  boolean: ["jp2a", "verbose", "clip", "list"],
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
