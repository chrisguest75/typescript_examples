// Destructuring

function testOne() {
    const testOne = { a: 1, b: 2, c: 3, d: 4, e: 5 }
    const { a, b, ...rest } = testOne
    console.log(a)
    console.log(b)
    console.log(rest)    
}

// Overriding none existing properties
function testTwoDefalts() {
    const testOne = { a: 1, b: 2, c: 3, d: 4, e: 5 }
    const { a, b=60, z=40, ...rest } = testOne
    console.log(a)
    console.log(b)
    console.log(z)
    console.log(rest)    
}

testOne()
testTwoDefalts()
