/**
*  ENUMS checking if a string is a value in an enum
* 
*/
function IsEnumValue(theEnum, value: string) {
    return Object.keys(theEnum).map(key => theEnum[key]).includes(value);
}

enum Color {
    Red = "red",
    Blue = "blue",
    Green = "green",
}

const fromSomewhere = "green"
let color : Color = Color[fromSomewhere];
console.log(color)
console.log(IsEnumValue(Color, fromSomewhere))


// Simple functions checks
//const voidFunction = () => void
//console.log(voidFunction())

const arrowFunction = (message: string) => {
    return `message is '${message}'`
}
console.log(arrowFunction("hello"))


// Checking falsy values
const a = undefined
const b = null
const c = void

a ? console.log("a is defined") : console.log("a is undefined")
b ? console.log("b is defined") : console.log("b is undefined")
c ? console.log("c is defined") : console.log("c is undefined")

// Checking object properties
interface test {
    val1?: string
    val2?: string
    val3?: string
    val4?: string
}

const testObj: test = { val1: "hello", val2: undefined, val4: void 0 } } 

console.log(testObj?.val1)

console.log(!! testObj.val1)
console.log(!! testObj.val2)
console.log(!! testObj.val3)
console.log(!! testObj.val4)
