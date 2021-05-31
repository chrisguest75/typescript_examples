# README
Demonstrates a simple cmdline application packaged in a buildpack

https://github.com/chrisguest75/docker_build_examples/tree/master/43_python_buildpacks


## How to run
```sh
npm install
npm run start:dev
```

## How to create buildpack
```sh
pack build tsbuildpackexample --builder heroku/nodejs-typescript
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
* Typescript [node-starter-project](https://khalilstemmler.com/blogs/typescript/node-starter-project/)
* ESLint [eslint-for-typescript](https://khalilstemmler.com/blogs/typescript/eslint-for-typescript/)  
* [typescript-cli](https://walrus.ai/blog/2019/11/typescript-cli/)  

https://github.com/heroku/buildpacks-nodejs/blob/main/buildpacks/typescript/README.md