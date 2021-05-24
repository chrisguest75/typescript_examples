import { hasSubscribers } from "diagnostic_channel";


export class Mandelbrot {
    private grid:number[][];
    private x:number=0;
    private y:number=0;
    private colours: number=256
  
    constructor(x: number, y: number, colours:number) {
      this.x = x;
      this.y = y;
      this.colours = colours;
      this.grid = [];
      for(let j:number = 0; j < y; j++) {
        let line:number[] = [];
        for(let i:number = 0; i < x; i++) {
            line.push(i);           
        }
        this.grid.push(line);
      }

    }
  
    calculate(): number[][] {
      let ix = -2.5, mx = 1, sx=mx-ix,incx=this.x/sx;
      let iy = -1, my = 1, sy=my-iy,incy=this.y/sy;

      for(let j:number = 0; j < this.y; j++) {
        for(let i:number = 0; i < this.x; i++) {
          this.grid[j][i] = j*i % this.colours;
        }

      }
      return this.grid;
    }
  }