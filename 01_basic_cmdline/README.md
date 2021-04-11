# README
Demonstrates a simple cmdline application  

## How to build

```sh
npm init -y   
npm install typescript --save-dev  
npm install @types/node --save-dev
npm install ts-node nodemon --save-dev 
npm install rimraf --save-dev 

npx tsc --init --rootDir src --outDir build \
--esModuleInterop --resolveJsonModule --lib es6 \
--module commonjs --allowJs true --noImplicitAny true
```

```sh
#add a nodemon.json and run
npm run start:dev
```


## Resources
* Typescript [node-starter-project](https://khalilstemmler.com/blogs/typescript/node-starter-project/)

