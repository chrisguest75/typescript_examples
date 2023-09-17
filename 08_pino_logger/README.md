# README

Demonstrates how to use pino logger in typescript  

## How to run

```sh
npm install
npm run start:dev
```

## How to recreate

Create folder  

```sh
mkdir xx_project_name
```

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

Add a nodemon.json  

```json
{
  "watch": ["src", "nodemon.json", "tsconfig.json", "package.json"],
  "ext": ".ts,.js",
  "ignore": [],
  "exec": "ts-node ./src/index.ts"
}
```

```sh
#run
Copy the template ./src folder to the new project
```sh
cp ./src ../xx_project_name
```

Copy over the package.json scripts

```json
  "scripts": {
    "build": "rimraf ./build && tsc",
    "lint": "eslint . --ext .ts",
    "start:dev": "nodemon",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

```sh
#add the nodemon.json and run
npm run start:dev
```

## Add pino

```sh
npm install pino     
npm install --save-dev @types/pino   
```

## Add linting

Add a basic linter

```sh
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

# add an .eslintrc
```

## Debugging

Ensure that the sourcemap output is enabled.  

```json
    "sourceMap": true,  
```

Add a tasks file that is for npm "tsc: build - xx_project_name/tsconfig.json"  

Add a prelaunch task to transpile the code.  

```json
    "preLaunchTask": "tsc: build - xx_project_name/tsconfig.json",
```

## Resources

* https://blog.morizyun.com/javascript/library-typescript-pino-logger.html