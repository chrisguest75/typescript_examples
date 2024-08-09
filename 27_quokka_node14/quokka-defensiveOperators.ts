// Testing some defensive programming techniques
const myObject = {
  values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
  empty: [],
  novalues: undefined,
};

// A values array with length > 0
const test1 = myObject.values.length > 0 ? myObject.values.length : undefined;
console.log(test1);

// Stupid test I know
const test2 = myObject.empty.length > 0 ? myObject.empty.length : 0;
console.log(test2);

// An undefined value with length > 0. But guarded by the ? operator
// Up to implementation to decide semantics of undefined length or default 0.
const test3 =
  myObject.novalues?.length > 0 ? myObject.novalues.length : undefined;
console.log(test3);

// An undefined value with length > 0. But guarded by the && operator
// Is this better?
const test4 =
  myObject.novalues && myObject.novalues.length > 0
    ? myObject.novalues.length
    : undefined;
console.log(test4);
