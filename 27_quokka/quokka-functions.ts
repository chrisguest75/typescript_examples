// Simple functions checks
//const voidFunction = () => void
//console.log(voidFunction())

// Callbacks
const arrowFunction = (message: string): string => {
    return `message is '${message}'`
}
console.log(arrowFunction("hello"))

const usesCallbackFunctionReturnValue = (myCallback: (message: string) => string) : string => {
    return myCallback("hello world" )
}
console.log(usesCallbackFunctionReturnValue(arrowFunction))


// Returning functors from functions
function returnsFunction(functionNumber: number) : () => string {
    switch (functionNumber) {
        case 1: 
            return () => "hello world"
        case 2:
            return () => "goodbye world"
        default:
            return () => "default world"
    }
}

console.log(returnsFunction(1)()) 
console.log(returnsFunction(2)()) 
console.log(returnsFunction(3)()) 
