const values = ['ready', 'started', 'live']
const looking = 'ready'

console.log(values[values.length - 1])

console.log(values.includes(looking))


enum Paths {
    Ready = 'ready',
    Started = 'started',
    Live = 'live'
}

// requires tsconfig configuration
// Object.values(Paths).includes(looking)

(<any>Object).values(Paths).includes(looking)


let myArray = [1,2,3,4,5]
console.log(myArray.pop())
console.log(myArray[myArray.length -1])


