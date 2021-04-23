# README
Demonstrates a simple cmdline application  

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