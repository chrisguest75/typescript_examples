# README

Demonstrates how to test typescript code (including debugging)

TODO:

* Test reporting?  Github actions?

## Using Jest

```sh
nvm use 16.13.2

# install packages 
npm install

# run tests 
npm run test

# include coverage
npm run coverage
```

## How to build

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
