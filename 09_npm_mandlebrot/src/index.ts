import Mandelbrot from "./mandelbrot"

//https://gist.github.com/mjackson/5311256
/**
 * Converts an HSV color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes h, s, and v are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  v       The value
 * @return  Array           The RGB representation
 */
 function hsvToRgb(h:number, s:number, v:number): number[] {
    let r: number = 0, g: number = 0, b: number = 0;
  
    let i:number = Math.floor(h * 6);
    let f:number = h * 6 - i;
    let p:number = v * (1 - s);
    let q:number = v * (1 - f * s);
    let t:number = v * (1 - (1 - f) * s);
  
    switch (i % 6) {
      case 0: r = v, g = t, b = p; break;
      case 1: r = q, g = v, b = p; break;
      case 2: r = p, g = v, b = t; break;
      case 3: r = p, g = q, b = v; break;
      case 4: r = t, g = p, b = v; break;
      case 5: r = v, g = p, b = q; break;
    }
  
    return [ Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255) ];
}

function create_palette(colours: number): string[] {
    let h:number = 0.5;
    let s:number = 0.5;
    let v:number = 1.0;
    let palette: string[] = [];  
     
    for(let p:number = 0; p < colours; p++) {
        h = (1.0 / colours) * p; 
        let rgb = hsvToRgb(h, s, v);
        let r = rgb[0];
        let g = rgb[1];
        let b = rgb[2];
        palette.push(`\u001b[48;2;${r};${g};${b}m `);
    }    

    return palette;
}

function main() {
    console.log("npm_mandelbrot")
    console.log('Node version: ' + process.version);    
    //console.log(process)
    let columns = process.stdout.columns;
    let rows = process.stdout.rows;    

    console.log('Terminal: ' + columns + 'x' + rows);

    let colours:number = 256; 
    let palette:string[] = create_palette(colours);
    /*for(let p:number = 0; p < palette.length; p++) {
        console.log(`${p} ` + palette[p]);
    }*/   

    let brot = new Mandelbrot(columns, rows, colours-1);
    let grid: number[][] = brot.calculate();

    console.log(`${grid[0].length}x${grid.length}`);

    for(let j:number = 0; j < grid.length; j++) {
        let line:string = "";
        let row = grid[j];
        for(let i:number = 0; i < row.length; i++) {
            line += palette[row[i]];
        }
        console.log(line);
    }
}

main()
