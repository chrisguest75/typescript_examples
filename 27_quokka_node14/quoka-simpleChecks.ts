// verifying if properties exist on an object
let myObj = { a: 0 }
console.log(myObj.b)

// check if property exists on object
let exists = Object.keys(myObj).includes('b')
exists
console.log(Object.keys(myObj))
exists = Object.keys(myObj).includes('a')
exists

console.log(myObj.hasOwnProperty('b') ? "property exists" : "property does not exist")

// Have to be wary of the following (use linter):
// https://eslint.org/docs/latest/rules/no-prototype-builtins
let dangerousObj = { a: 0, hasOwnProperty: 1 }
exists = Object.prototype.hasOwnProperty.call(dangerousObj, "a")
exists
exists = Object.prototype.hasOwnProperty.call(dangerousObj, "b")
exists
exists = Object.prototype.hasOwnProperty.call(dangerousObj, "hasOwnProperty")
exists

// will crash as trying to use property as a function
console.log(dangerousObj.hasOwnProperty('a'))

