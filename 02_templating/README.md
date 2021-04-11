# README
Demonstrates how to use typescript to template a file

## How to build
Setup typescript for a basic nodejs project
```sh
npm init -y   
npm install typescript @types/node ts-node nodemon rimraf --save-dev  

npx tsc --init --rootDir src --outDir build \
--esModuleInterop --resolveJsonModule --lib es6 \
--module commonjs --allowJs true --noImplicitAny true
```

```sh
#add a nodemon.json and run
npm run start:dev
```

## Using EJS
Have to import the types and the library 
```sh
npm install --save ejs 
npm install --save @types/ejs
```

## Resources
* Typescript [node-starter-project](https://khalilstemmler.com/blogs/typescript/node-starter-project/)
* ESLint [eslint-for-typescript](https://khalilstemmler.com/blogs/
typescript/eslint-for-typescript/)  
* [AdvancedCLI](https://levelup.gitconnected.com/
create-your-own-advanced-cli-with-typescript-5868ae3df397) 
* [Templating](https://colorlib.com/wp/top-templating-engines-for-javascript/)
* Building app in [Typescript](https://www.freecodecamp.org/news/how-to-build-a-todo-app-with-react-typescript-nodejs-and-mongodb/)


