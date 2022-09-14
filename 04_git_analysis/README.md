# README

Demonstrates a using nodegit and typescript-dotnet

## Learning

* To import the TimeSpan I had to select the package that matched my tsconfig module code generation setting.
* Promises back from async
* await an eventemitter

## How to build

Setup typescript for a basic nodejs project

```sh
npm init -y   
npm install typescript @types/node ts-node nodemon rimraf --save-dev  

# get typescript version
./node_modules/typescript/bin/tsc --version 

# create tsconfig.json
npx tsc --init --rootDir src --outDir build \
--esModuleInterop --resolveJsonModule --lib es6 \
--module commonjs --allowJs true --noImplicitAny true
```

```sh
#add a nodemon.json and run
npm run start:dev
```

## Add linting

Add a basic linter

```sh
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

# add an .eslintrc
```

## Debugging

Add a tasks file that is for npm "tsc: build - 04_git_analysis/tsconfig.json"  

Add a prelaunch task to transpile the code.  

```json
    "preLaunchTask": "tsc: build - 04_git_analysis/tsconfig.json",
```

## Resources

* Typescript [node-starter-project](https://khalilstemmler.com/blogs/typescript/node-starter-project/)
* ESLint [eslint-for-typescript](https://khalilstemmler.com/blogs/typescript/eslint-for-typescript/)  
* [using-eventemitters-to-resolve-promises-from-afar-in-nodejs](https://www.jpwilliams.dev/using-eventemitters-to-resolve-promises-from-afar-in-nodejs)
* [nodegit api](https://www.nodegit.org/api/)
* [nodegit](https://github.com/nodegit/nodegit)  
* [js-git](https://www.npmjs.com/package/js-git)  
