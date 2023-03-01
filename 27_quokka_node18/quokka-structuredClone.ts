// best way to copy a 2d array
// https://stackoverflow.com/questions/597588/how-do-you-clone-an-array-of-objects-in-javascript
// https://2ality.com/2022/01/structured-clone.html
// Spreading has one significant downside – it creates shallow copies: The top levels are copied, but property values are shared.

import { expect } from "expect";

type Piece = "X" | "O" | "."
type Grid = Array<Array<Piece>>;

function createGrid(): Grid {
    const grid: Grid = [ ];
    for (let index = 0; index < 6; index++) {
        grid.push(Array<Piece>(7).fill('.'));
    }
    return grid;
}

function drop(grid: Grid, column: number, piece: Piece): Grid {
    // node14 way
    // const newGrid = grid.map(row => [...row]);

    // node18 way
    // https://simonplend.com/deep-clone-values-with-structuredclone/
    const newGrid = structuredClone(grid);
    // iterate through the rows to find place to drop coin
    for (let row = grid.length - 1; row >= 0; row--) {
        if (newGrid[row][column] === '.') {
            newGrid[row][column] = piece;
            return newGrid;
        }
    }

    throw new Error("Column is full");
}

function testDrop() {
    const grid: Grid = createGrid();
    let newGrid = drop(grid, 0, 'X');
    newGrid = drop(newGrid, 0, 'O');
    newGrid = drop(newGrid, 0, 'X');
    newGrid = drop(newGrid, 0, 'O');
    newGrid = drop(newGrid, 4, 'X');
    newGrid = drop(newGrid, 0, 'O');
    newGrid = drop(newGrid, 4, 'X');

    // assert that the grid is correct
    const shouldBe = [ 
        [ '.', '.', '.', '.', '.', '.', '.' ],
        [ 'O', '.', '.', '.', '.', '.', '.' ],
        [ 'O', '.', '.', '.', '.', '.', '.' ],
        [ 'X', '.', '.', '.', '.', '.', '.' ],
        [ 'O', '.', '.', '.', 'X', '.', '.' ],
        [ 'X', '.', '.', '.', 'X', '.', '.' ] 
    ]
    console.log(newGrid);

    expect(newGrid).toEqual(shouldBe);
}

function testDropFilledColumn() {
    const grid: Grid = createGrid();
    let newGrid = drop(grid, 0, 'X');
    newGrid = drop(newGrid, 0, 'O');
    newGrid = drop(newGrid, 0, 'X');
    newGrid = drop(newGrid, 0, 'O');
    newGrid = drop(newGrid, 0, 'O');
    newGrid = drop(newGrid, 0, 'O');
    newGrid = drop(newGrid, 0, 'O');

    console.log(newGrid);
}

function testWinVertical() {
    const grid: Grid = createGrid();
    let newGrid = drop(grid, 0, 'X');
    newGrid = drop(newGrid, 0, 'X');
    newGrid = drop(newGrid, 0, 'X');
    newGrid = drop(newGrid, 0, 'X');

    // assert that the grid is correct
    const shouldBe = [ 
        [ '.', '.', '.', '.', '.', '.', '.' ],
        [ '.', '.', '.', '.', '.', '.', '.' ],
        [ 'X', '.', '.', '.', '.', '.', '.' ],
        [ 'X', '.', '.', '.', '.', '.', '.' ],
        [ 'X', '.', '.', '.', '.', '.', '.' ],
        [ 'X', '.', '.', '.', '.', '.', '.' ] 
    ]
    console.log(newGrid);

    expect(newGrid).toEqual(shouldBe);

    // TODO: This should check is win.. 

}


testDrop();
expect(() => { testDropFilledColumn() }).toThrowError("Column is full");
testWinVertical();

/*grid[0][0] = 'X';
console.log(grid);

// inplace reverse
console.log(grid.reverse());

console.log(grid);


const row = grid.findIndex(row => row.includes('X'));
console.log(row);

const filtered = grid.filter(row => row.includes('X'));
console.log(filtered);


*/