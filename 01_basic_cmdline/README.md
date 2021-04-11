# README
Demonstrates a simple cmdline application  

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

# Add linting 
Add a basic linter

```sh
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

# add an .eslintrc
```

## Resources
* Typescript [node-starter-project](https://khalilstemmler.com/blogs/typescript/node-starter-project/)
* ESLint [eslint-for-typescript](https://khalilstemmler.com/blogs/typescript/eslint-for-typescript/)  