# README
Demonstrates how to package a typescript tool to npm to be run as npx

## How to run
```sh
npm install

# run once 
npm run start
```
## How to develop
```sh
npm run start:dev
```

## Publish 
After writing some code you can publish it.
```sh
# make sure you update the package version in package.json before updating
npm version patch       

# publish it
npm publish --access public
```

## Run as npx
Run the published package
```sh
# run and print out palette
npx @chrisguest75/09_shell_mandlebrot 

# run a specific version
npx @chrisguest75/09_shell_mandlebrot@x.x.x 
```

## How to recreate
Create folder  
```sh
mkdir xx_project_name
```
## Create
Setup typescript for a basic nodejs project
```sh
npm init --scope=@chrisguest75 -y   
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
* [npx docs](https://nodejs.dev/learn/the-npx-nodejs-package-runner)
* [awesome-npx](https://github.com/junosuarez/awesome-npx)

https://itnext.io/step-by-step-building-and-publishing-an-npm-typescript-package-44fe7164964c


https://cameronnokes.com/blog/the-30-second-guide-to-publishing-a-typescript-package-to-npm/

https://simple.wikipedia.org/wiki/Mandelbrot_set#:~:text=The%20Mandelbrot%20set%20can%20be,positive%20integer%20(natural%20number).

zn+1 = zn2 + c

https://en.wikipedia.org/wiki/Plotting_algorithms_for_the_Mandelbrot_set#:~:text=The%20simplest%20algorithm%20for%20generating,is%20chosen%20for%20that%20pixel.