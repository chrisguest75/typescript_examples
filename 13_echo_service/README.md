# README

Demonstrates a simple echo service using TSOA

TODO:

* metrics endpoint - requests, etc?
* Bootstrap frontend.  
* OOM 
* Exception logger
* Buildpack.
* Filesystem view
* Tests

## How to run

```sh
npm install

# generate routes, swagger doc and run
npm run rebuild

# run dev nodemon
npm run dev

# open 
xdg-open http://0.0.0.0:8000/docs/
open http://0.0.0.0:8000/docs/
```

## How to recreate

Setup typescript for a basic nodejs project

```sh
# create folder  
mkdir xx_project_name

npm init -y   
npm install typescript @types/node ts-node nodemon rimraf --save-dev  

# get typescript version
./node_modules/typescript/bin/tsc --version 

# create tsconfig.json
npx tsc --init --rootDir src --outDir build \
--esModuleInterop --resolveJsonModule --lib es6 \
--module commonjs --allowJs false --noImplicitAny true  --sourceMap 

npm install --save express 
npm install --save-dev @types/express
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

## Add pino logging

```sh
npm install pino     
npm install --save-dev @types/pino   
npm install express-pino-logger
npm install --save-dev @types/express-pino-logger
```

## Add tsoa swagger

```sh
npm install --save tsoa swagger-ui-express
npm install --save-dev @types/swagger-ui-express
npm install --save-dev concurrently
```

## Add tests

```sh
npm install --save-dev jest-express jest @types/jest ts-jest
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

* Building REST API with Express, TypeScript and Swagger [here](https://rsbh.dev/blog/rest-api-with-express-typescript)
* initializing-our-project [here](https://tsoa-community.github.io/docs/getting-started.html#initializing-our-project)
* Logging with pino & TypeScript JavaScript/Express.js [here](https://blog.morizyun.com/javascript/library-typescript-pino-logger.html)  
* Swagger, NodeJS, & TypeScript : TSOA [here](https://medium.com/willsonic/swagger-nodejs-typescript-tsoa-15a3f10fabaf)
* [express-pino-logger](https://github.com/pinojs/express-pino-logger#readme)  
* [tsoa](https://github.com/lukeautry/tsoa)  
* [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)  



https://github.com/strongpauly/tsoa-starter