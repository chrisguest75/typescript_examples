import { Image } from 'image-js';
import { spawnSync } from 'child_process';
import asciifyImage = require("asciify-image")

function imageDetails(image: Image) {
    console.log('Width', image.width);
    console.log('Height', image.height);
    console.log('colorModel', image.colorModel);
    console.log('components', image.components);
    console.log('alpha', image.alpha);
    console.log('channels', image.channels);
    console.log('bitDepth', image.bitDepth);
}

// async function executeJ2PA() {
//     const jp2aCommand: ['ffmpeg', string[], { stdio: 'inherit'[] }] = [
//       'ffmpeg',
//       [
//         '-i',
//         presignedOriginalMedia,
//         ...(mediaType === 'video' ? videoParams : audioParams),
//       ],
//       {
//         stdio: ['inherit', 'inherit', 'inherit'],
//       },
//     ];

//     console.log('FFMPEG Command:', ffmpegCommand.join(' '));

//     const spawnResult = spawnSync();
//     if (spawnResult.status !== 0) {
//       throw new Error(`FFMPEG exited with ${spawnResult.status}`);
//     }

//     if docker:
//     completed = subprocess.run(["jp2a", "--width=" + str(width), "--colors", "--color-depth=24", "--fill", banner_file], capture_output=True)
// else:
//     completed = subprocess.run(["jp2a", "--width=" + str(width), "--invert", banner_file], capture_output=True)


async function execute() {
    let text = "carebear";
    text = text.toUpperCase();
    const font_width=26
    const font_height=26
    const chars_per_row = 12
    const banner = new Image({ width: (font_width*text.length), height: font_height});
    imageDetails(banner);

    let fontImage = await Image.load('./fonts/carebear.jpg');

    for (let c = 0; c < text.length; c++) {
        let letter = text[c];
        let code = text.charCodeAt(c);
        code -= " ".charCodeAt(0)

        let column = Math.floor(code % chars_per_row) * font_width
        let row = Math.floor(code / chars_per_row) * font_width  

        let letterImage = fontImage.crop({x:column, y:row, width:font_width, height:font_height})
        banner.insert(letterImage, {x:(c * font_width), y:0, inPlace:true})

        console.log(`${code} ${column} ${row}`)

    }

    await banner.save('./out/carebear_banner.jpg');

    asciifyImage('./out/carebear_banner.jpg', {fit: 'box', width:  100, height: 26})
        .then(function (asciified) {
            // Print asciified image to console
            console.log(asciified);
        })
        .catch(function (err: Error) {
            // Print error to console
            console.error(err);
        });
}


function main() 
{
    execute().catch(console.error);
    // var a = 0
    console.log('Hello world!!!!')
}

main()