
// JS passes byref for objects. 
function testbyvalue(testobj: {a: number}, newvalue: number) {
    testobj.a = newvalue
    return testobj
}

let myObj = { a: 0 }
let retObj = testbyvalue(myObj, 3)
  
myObj
retObj
let same = myObj === retObj
same

testbyvalue(myObj, 5)
myObj
myObj
same = myObj === retObj
same
