// https://developer.mozilla.org/en-US/docs/Glossary/Truthy

// undefined is false
undefined
  ? console.log("undefined is true")
  : console.log("undefined is false");

// null is false
null ? console.log("null is true") : console.log("null is false");

// STRINGS
// empty string is false
"" ? console.log("empty string is true") : console.log("empty string is false");
// hello is true
"hello" ? console.log("hello is true") : console.log("hello is false");

// NUMBERS
// 0 is false
0 ? console.log("0 is true") : console.log("0 is false");
// 1 is true
1 ? console.log("1 is true") : console.log("1 is false");

// COMPARISON
const a = undefined;
console.log(a);
// undefined is not greater then 0
console.log(a > 0);
// undefined is not less then 0
console.log(a < 0);
// equality of undefined
console.log(a == a);
console.log(a === a);
// adition
console.log(a + a);
const b = {};
console.log(b);
// objects
console.log(b.test ? b.test : 0);
console.log(b?.test ? b.test : 0);

b.test = 1;
console.log(b?.test ? b.test : 0);