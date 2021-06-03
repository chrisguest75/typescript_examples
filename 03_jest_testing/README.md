# README
Demonstrates how to test typescript code

TODO:
* Create a basic package that I can include
* Add a basic piece of code that needs testing
* Test reporting?  Github actions?
* TDD

## How to build
Setup typescript for a basic nodejs project
```sh
npm init -y   
npm install typescript @types/node jest @types/jest ts-jest --save-dev  

npx tsc --init --rootDir src --outDir build \
--esModuleInterop --resolveJsonModule --lib es6 \
--module commonjs --allowJs true --noImplicitAny true --sourceMap
```

```sh
#add a nodemon.json and run
npm run test
```

## Using Jest


## Resources
https://jestjs.io/


https://medium.com/@RupaniChirag/writing-unit-tests-in-typescript-d4719b8a0a40

https://github.com/kulshekhar/ts-jest

https://itnext.io/testing-with-jest-in-typescript-cc1cd0095421

https://kulshekhar.github.io/ts-jest/docs/debugging/

https://github.com/ChiragRupani/TSUnitTestsSetup/blob/master/HelloJest/package.json

