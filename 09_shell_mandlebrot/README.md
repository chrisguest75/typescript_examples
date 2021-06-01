# README
Demonstrates how to package a typescript tool to npm to be run as npx

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

Add a nodemonConfig to package.json 
```json
  "nodemonConfig": {
    "watch": ["src", "nodemon.json", "tsconfig.json", "package.json"],
    "ext": "ts",
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


## Resources


https://cameronnokes.com/blog/the-30-second-guide-to-publishing-a-typescript-package-to-npm/

https://simple.wikipedia.org/wiki/Mandelbrot_set#:~:text=The%20Mandelbrot%20set%20can%20be,positive%20integer%20(natural%20number).

zn+1 = zn2 + c

https://en.wikipedia.org/wiki/Plotting_algorithms_for_the_Mandelbrot_set#:~:text=The%20simplest%20algorithm%20for%20generating,is%20chosen%20for%20that%20pixel.