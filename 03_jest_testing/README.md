# README

Demonstrates how to test typescript code (including debugging) in Jest  

## Contents

- [README](#readme)
  - [Contents](#contents)
  - [Reason](#reason)
  - [Using Jest](#using-jest)
  - [Filtering tests](#filtering-tests)
  - [Single step debugging](#single-step-debugging)
  - [How to recreate](#how-to-recreate)
  - [Resources](#resources)
    - [Jest](#jest)
    - [Typescript](#typescript)
    - [AWS](#aws)

## Reason

Pretty obvious why I need to use a test framework. The examples included here will show various examples of what is required to write tests; Mocking, Partial Mocking, Spies, Assertions, etc.  
There is an example of using asssertions with `strictNullChecks` in the [s3watcher.test.ts](./tests/s3watcher.test.ts)

NOTES:

* To run a single test when debugging.  Name the test to something you can set in the test pattern like 'ONLY'  `npm run test --  tests/loadwords.test.ts -t "ONLY"`.  

TODO:

* Test reporting?  Github actions?
* Can I measure performance?  CPU and memory usage?

## Using Jest

```sh
nvm use 

# install packages 
npm install

# run tests 
npm run test

# run tests with detect open handles 
npm run test:debug

# include coverage
npm run coverage
```

## Filtering tests

```sh
# only want to run a specific test file
npm run test 'tests/s3watcher.test.ts' 

# watch and filter
npm run test -- --watch 'tests/s3watcher.test.ts'                       
```

## Single step debugging

Make sure you are in the `03_jest_testing` folder. Then use the `vscode` debug extension to select a profile to debug.  
There is an example of running just the filtered tests as well as all of them.  Set breakpoints and debug.  

## How to recreate

Setup typescript for a basic nodejs project  

```sh
npm init -y   
npm install typescript @types/node jest @types/jest ts-jest --save-dev  

npx tsc --init --rootDir src --outDir build \
--esModuleInterop --resolveJsonModule --lib es6 \
--module commonjs --allowJs true --noImplicitAny true --sourceMap
```

## Resources

### Jest

* Jest is a delightful JavaScript Testing Framework with a focus on simplicity [here](https://jestjs.io/)  
* Debugging ts-jest [here](https://kulshekhar.github.io/ts-jest/docs/debugging/)  
* ts-jest repo [here](https://github.com/kulshekhar/ts-jest)  
* Get Jest test name within beforeEach() and afterEach() [here](https://stackoverflow.com/questions/61640896/get-jest-test-name-within-beforeeach-and-aftereach)
* Take advantage of typescript 3.7 assertions functions [jest issue #10094](https://github.com/facebook/jest/issues/10094)
* https://jestjs.io/docs/mock-functions
* https://www.emgoto.com/jest-partial-match/
* https://dev.to/codedivoire/how-to-mock-an-imported-typescript-class-with-jest-2g7j

### Typescript

* Writing unit tests in TypeScript [here](https://medium.com/@RupaniChirag/writing-unit-tests-in-typescript-d4719b8a0a40)  
* strictNullChecks does not detect assertions done before property access [typescript issue #13652](https://github.com/microsoft/TypeScript/issues/13652)
* type narrowing for common testing patterns  [typescript issue #9693](https://github.com/microsoft/TypeScript/issues/9693)
* Control flow based type narrowing for assert(...) calls [typescript issue #8655](https://github.com/microsoft/TypeScript/issues/8655)
* Add support for TypeScript's Assertion Functions https://github.com/DefinitelyTyped/DefinitelyTyped/issues/41179

### AWS

* aws-sdk-client-mock [here](https://github.com/m-radzikowski/aws-sdk-client-mock)
* https://github.com/trivikr/aws-sdk-client-mock-test
* https://stackoverflow.com/questions/68526571/how-do-i-mock-aws-s3-getobjectcommand-with-jest-using-the-v3-sdk