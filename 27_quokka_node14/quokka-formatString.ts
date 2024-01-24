
function paddingTest(numbers: number[] ) {
    const padded = numbers.map((number) => {
        return `file${(number).toString().padStart(7, '0')}.wav.m4a`
    })    
    return padded;
}

console.log(paddingTest([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]));


