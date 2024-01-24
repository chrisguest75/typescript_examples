// Destructuring
function testBasicRemaining() {
  const testOne = { a: 1, b: 2, c: 3, d: 4, e: 5 };
  const { a, b, ...rest } = testOne;
  console.log(a);
  console.log(b);
  // rest takes the remaining properties
  console.log(rest);
}

// Overriding none existing properties
function testDestructuringDefaults() {
  const testOne = { a: 1, b: 2, c: 3, d: 4, e: 5 };
  // z does not exist in testOne
  const { a, b = 60, z = 40, ...rest } = testOne;
  console.log(a);
  console.log(b);
  console.log(z);
  console.log(rest);
}

// nested destructuring with renaming
function testNestingWithRename() {
  const obj = {
    a: 1,
    b: {
      c: 2,
      d: 3,
    },
  };

  const {
    a,
    b: { c, d: chris },
  } = obj;
  console.log(a, c, chris);
}

// destructuring function parameter any type
function testDestructureInputs({ b }: any) {
  // only b is destructured from the input object
  console.log(b);
}

function testConditionalSpread() {
  // if set in environment, use it, otherwise ignore
  const buildId = process.env.BUILDID;
  //const buildId = 333;
  const testOne = { a: 1, b: 2, c: 3, d: 4, e: 5 };
  const final = { ...testOne, ...(buildId ? { buildId } : {}) };

  console.log(final);
}

interface MyError {
  message: string;
  stack: string;
}
// Destructuring types
function testDestructuringCastTypes() {
  const testOne = { message: "hello" } as MyError;
  const { message, stack } = testOne;
  console.log(message);
  console.log(stack);
}

/********************************
 *
 */
testDestructuringCastTypes();
testBasicRemaining();
testDestructuringDefaults();
testNestingWithRename();
testDestructureInputs({ a: 1, b: 2, text: "hello" });
testConditionalSpread();
