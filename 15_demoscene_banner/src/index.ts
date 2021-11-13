import { Image } from 'image-js';

function imageDetails(image: Image) {
    console.log('Width', image.width);
    console.log('Height', image.height);
    console.log('colorModel', image.colorModel);
    console.log('components', image.components);
    console.log('alpha', image.alpha);
    console.log('channels', image.channels);
    console.log('bitDepth', image.bitDepth);
}

async function execute() {
/*    const buffer = new ArrayBuffer( * 32);
    let outputImage = await Image.load(buffer);

    let fontImage = await Image.load('./fonts/carebear.jpg');

    copyImage(fontImage, outputImage, x: number, y: number)

       let grey = fontImage
      .grey() // convert the image to greyscale.
      .resize({ width: 200 }) // resize the image, forcing a width of 200 pixels. The height is computed automatically to preserve the aspect ratio.
      .rotate(30); // rotate the image clockwise by 30 degrees.
 
*/
    let text = "carebear";
    text = text.toUpperCase();
    const font_width=24
    const font_height=24
    const chars_per_row = 12
    const banner = new Image({ width: (font_width*text.length), height: font_height});
    imageDetails(banner);

    let fontImage = await Image.load('./fonts/carebear.jpg');

    for (let c = 0; c < text.length; c++) {
        let code = text.charCodeAt(c);
        code -= " ".charCodeAt(0)

        let column = Math.floor(code % chars_per_row) * font_width
        let row = Math.floor(code / chars_per_row) * font_width  

        let letter = fontImage.crop({x:column, y:row, width:font_width, height:font_height})
        banner.insert(letter, {x:(c * font_width), y:0, inPlace:true})
    }

    return banner.save('./fonts/carebear_banner.jpg');
  }


function main() 
{
    execute().catch(console.error);
    // var a = 0
    console.log('Hello world!!!!')
}

main()





