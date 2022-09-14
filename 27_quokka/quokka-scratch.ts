

//const voidFunction = () => void
//console.log(voidFunction())

const arrowFunction = (message: string) => {
    return `message is '${message}'`
}
console.log(arrowFunction("hello"))

const a = undefined
const b = null
const c = void

a ? console.log("a is defined") : console.log("a is undefined")
b ? console.log("b is defined") : console.log("b is undefined")
c ? console.log("c is defined") : console.log("c is undefined")
