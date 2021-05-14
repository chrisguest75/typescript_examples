# README
Demonstrates a simple cmdline application (copy these steps)  

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

npx tsc --init --rootDir src --outDir build \
--esModuleInterop --resolveJsonModule --lib es6 \
--module commonjs --allowJs true --noImplicitAny true
```

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

# Add linting 
Add a basic linter

```sh
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

# add an .eslintrc
```

## Debugging 
Add a tasks file that is for npm "tsc: build - xx_project_name/tsconfig.json"  

Add a prelaunch task to transpile the code.  
```json
    "preLaunchTask": "tsc: build - xx_project_name/tsconfig.json",
```

## Resources
* Typescript [node-starter-project](https://khalilstemmler.com/blogs/typescript/node-starter-project/)
* ESLint [eslint-for-typescript](https://khalilstemmler.com/blogs/typescript/eslint-for-typescript/)  