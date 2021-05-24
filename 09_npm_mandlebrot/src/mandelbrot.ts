

export class Mandelbrot {
    private grid:number[][];
  
    constructor(x: number, y: number, colours:number) {
      this.grid = [];
      for(let j:number = 0; j < y; j++) {
        let line:number[] = [];
        this.grid.push(line);
        for(let i:number = 0; i < x; i++) {
            line.push(i);           
        }
      }

    }
  
    calculate(): number[][] {
        return this.grid;
    }
  }