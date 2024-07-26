# README

Demonstrates how to test typescript code (including debugging) in Jest  

## Reason

Pretty obvious why I need to use a test framework. The examples included here will show various examples of what is required to write tests; Mocking, Partial Mocking, Spies, Assertions, etc.  
There is an example of using asssertions with `strictNullChecks` in the [s3watcher.test.ts](./tests/s3watcher.test.ts)

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

* [jestio](https://jestjs.io/)  
* [example blog](https://medium.com/@RupaniChirag/writing-unit-tests-in-typescript-d4719b8a0a40)  
* [example](https://github.com/ChiragRupani/TSUnitTestsSetup/ blob/master/HelloJest/package.json)  
* [ts-jest](https://github.com/kulshekhar/ts-jest)  
* [ts-jest-debugging](https://kulshekhar.github.io/ts-jest/docs/debugging/)  
* [testing with jest](https://itnext.io/testing-with-jest-in-typescript-cc1cd0095421)  
* Get Jest test name within beforeEach() and afterEach() [here](https://stackoverflow.com/questions/61640896/get-jest-test-name-within-beforeeach-and-aftereach)
* https://github.com/m-radzikowski/aws-sdk-client-mock
* https://github.com/trivikr/aws-sdk-client-mock-test
* https://stackoverflow.com/questions/68526571/how-do-i-mock-aws-s3-getobjectcommand-with-jest-using-the-v3-sdk
* strictNullChecks does not detect assertions done before property access https://github.com/microsoft/TypeScript/issues/13652
* type narrowing for common testing patterns https://github.com/microsoft/TypeScript/issues/9693
* Control flow based type narrowing for assert(...) calls https://github.com/microsoft/TypeScript/issues/8655
* Take advantage of typescript 3.7 assertions functions https://github.com/facebook/jest/issues/10094
* Add support for TypeScript's Assertion Functions https://github.com/DefinitelyTyped/DefinitelyTyped/issues/41179
* https://www.emgoto.com/jest-partial-match/
* https://jestjs.io/docs/mock-functions
* https://dev.to/codedivoire/how-to-mock-an-imported-typescript-class-with-jest-2g7j
