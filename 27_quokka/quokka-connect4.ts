const grid = [
    ['.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.'],
    ['.', '.', '.', '.', '.', '.', '.'],
]




function drop(col: number, player: string) {
    for (let row = 5; row >= 0; row--) {
        if (grid[row][col] === '.') {
            grid[row][col] = player
            return
        }
    }
}

function gameOver() {
    // check for horizontal win
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 4; col++) {
            if (grid[row][col] !== '.') {
                if (grid[row][col] === grid[row][col+1] && grid[row][col] === grid[row][col+2] && grid[row][col] === grid[row][col+3]) {
                    return true
                }
            }
        }
    }
    // check for vertical win
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 7; col++) {
            if (grid[row][col] !== '.') {
                if (grid[row][col] === grid[row+1][col] && grid[row][col] === grid[row+2][col] && grid[row][col] === grid[row+3][col]) {
                    return true
                }
            }
        }
    }
    // check for diagonal win
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 4; col++) {
            if (grid[row][col] !== '.') {
                if (grid[row][col] === grid[row+1][col+1] && grid[row][col] === grid[row+2][col+2] && grid[row][col] === grid[row+3][col+3]) {
                    return true
                }
            }
        }
    }
    // check for diagonal win
    for (let row = 0; row < 3; row++) {
        for (let col = 3; col < 7; col++) {
            if (grid[row][col] !== '.') {
                if (grid[row][col] === grid[row+1][col-1] && grid[row][col] === grid[row+2][col-2] && grid[row][col] === grid[row+3][col-3]) {
                    return true
                }
            }
        }
    }
    return false
}

function display() {
    for (let row = 0; row < 6; row++) {
        let line = ''
        for (let col = 0; col < 7; col++) {
            line += grid[row][col]
        }
        console.log(line)
    }
}

function play() {
    drop(0, 'x')
    drop(0, 'x')
    drop(0, 'x')
    drop(0, 'x')

    return gameOver()
}
                    
console.log(play())

display()

// console.log(grid)