import minimist from 'minimist';
import { Image } from 'image-js';
import { spawnSync } from 'child_process';
import asciifyImage = require("asciify-image")
import { logger } from "./logger";
import fs = require('fs');
import fonts from "./fonts.json";
//var fonts = require("./fonts.json");

interface Font {
    font_width: number,
    font_height: number,
    chars_per_row: number,
    rows: number,
    first_character: string,
    path: string
}

/*interface AsciiRenderer {
    render(in: string): string;
}
class AsciiRenderer {
    render(in: string): string;
}*/

function imageDetails(image: Image, path: string) {
    logger.debug({ "path": path, "width": image.width, "height": image.height, "colorModel": image.colorModel, "components": image.components, "alpha": image.alpha, 'channels': image.channels, "bitDepth": image.bitDepth});
}

async function jp2aVersion() {
    const spawnResult = spawnSync("jp2a", ["--version"], {
        cwd: process.cwd(),
        env: process.env,
        stdio: 'pipe',
        encoding: 'utf-8'
    });
    logger.info({"stdout":spawnResult.output});
    if (spawnResult.status !== 0) {
        throw new Error(`jp2a exited with ${spawnResult.status}`);
    } else {
        return spawnResult.output
    }
}

async function jp2aImage(width:number, file:string, version: boolean ) {
    
    let options = [`--width=${width}`, "--invert", file]
    if (version == true) {
        options = [`--width=${width}`, "--colors", "--color-depth=24", "--fill", file]
    }
    logger.info({"options":"jp2a " + options.join(" ")});
    const spawnResult = spawnSync("jp2a", options, {
        cwd: process.cwd(),
        env: process.env,
        stdio: 'pipe',
        encoding: 'utf-8'
    });
    //logger.info({"stdout":spawnResult.output});
    if (spawnResult.status !== 0) {
        throw new Error(`jp2a exited with ${spawnResult.status}`);
    } else {
        return spawnResult.output
    }
}

async function render(text: string, font: Font) {
    const font_width=font.font_width
    const font_height=font.font_height
    const chars_per_row = font.chars_per_row

    // create output banner image
    const banner = new Image({ width: (font_width*text.length), height: font_height});
    imageDetails(banner, "memory");

    let fontImage = await Image.load(font.path);
    imageDetails(fontImage, font.path);

    // render the characters
    for (let c = 0; c < text.length; c++) {
        let letter = text[c];
        let code = text.charCodeAt(c);
        code -= font.first_character.charCodeAt(0)

        let column = Math.floor(code % chars_per_row) * font_width
        let row = Math.floor(code / chars_per_row) * font_height  

        let letterImage = fontImage.crop({x:column, y:row, width:font_width, height:font_height})
        banner.insert(letterImage, {x:(c * font_width), y:0, inPlace:true})

        logger.debug({"charcode":code, "x":column, "y":row})
    }

    // save the banner
    var outPath = './out';
    if (!fs.existsSync(outPath)){
        fs.mkdirSync(outPath);
    }

    const outFile = `${outPath}/banner.jpg`
    await banner.save(outFile);



    // output ascii
    let terminalColumns = process.stdout.columns;
    let terminalRows = process.stdout.rows;    
    logger.info({ "width": terminalColumns, "height": terminalRows});

    // jp2a
    await jp2aVersion()
    // TODO: if 1.0.6 need to fix colours 
    let colours24bit = true
    let out = await jp2aImage(terminalColumns, outFile, colours24bit)
    console.log(out[1])

    // asciify
    asciifyImage(outFile, {fit: 'box', width:  terminalColumns / 2, height: terminalRows})
        .then(function (asciified) {
            // Print asciified image to console
            console.log(asciified);
        })
        .catch(function (err: Error) {
            // Print error to console
            console.error(err);
        });
}

/*
main
*/
async function main(args: minimist.ParsedArgs) {
    logger.debug('enter main:'+ args._);
    logger.debug('args:'+ args["banner"]);
    let text = args["banner"]
    text = text.toUpperCase();

    logger.info({"fonts": fonts})

    let font = fonts["carebear"]
    switch (args["font"]) {
        case "carebear":
            font = fonts["carebear"]
            break;
        case "cuddly":
            font = fonts["cuddly"]
            break;
        case "knight4":
            font = fonts["knight4"]
            break;
        case "tcb":
            font = fonts["tcb"]
            break;    
        }

    await render(text, font).catch(console.error);
    logger.debug('exit main');  

    return new Promise((resolve, reject) => {
    });   
}

let args: minimist.ParsedArgs = minimist(process.argv.slice(2), {
    string: ['banner', 'font'] ,         // --banner "builder" --font "tcb"
    boolean: ['jp2a']
    //boolean: ['jp2a'],     // --version
    //alias: { v: 'version' }
});
logger.info(args)
main(args).then(() => {
    process.exit(0)
}).catch((e) => {
    console.log(e);
    process.exit(1);
});
