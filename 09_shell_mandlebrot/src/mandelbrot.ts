import { Console } from "console";
import ComplexNumber from "./complexnumber"


export default class Mandelbrot {
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
  
    calculate(ix: number = -2.5, iy: number = -1, mx: number = 1, my: number = 1): number[][] {
      const max_iterations = 200;
      let sx=mx-ix, incx=sx/this.x;
      let sy=my-iy, incy=sy/this.y;

      for(let j:number = 0; j < this.y; j++) {
        for(let i:number = 0; i < this.x; i++) {
          let c = new ComplexNumber(ix + (incx * i), iy + (incy * j))
          let z = new ComplexNumber(0, 0)
          let n = 0
          while (z.abs <= 2.0 && n < max_iterations) {
              z = (z.mul(z)).add(c)
              n += 1
          }
          this.grid[j][i] = n;
          //this.grid[j][i] = (i * j) % this.colours;
        }

      }
      return this.grid;
    }
  }