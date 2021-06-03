# README
Demonstrates a simple echo service

TODO:
* Add health and readiness endpoints. 
* Add environment listing
* metrics endpoint - requests, etc? 
* Bootstrap frontend.  
* Wait
* OOM
* Cover all the routes - catch all route.  
* Exception logger
* Buildpack.
* Filesystem view
* Return headers from environment
* Tests

## How to run
```sh
npm install
npm run dev
xdg-open http://0.0.0.0:8000/docs/
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

[rest-api-with-express-typescript](https://rsbh.dev/blog/rest-api-with-express-typescript)  
[library-typescript-pino-logger](https://blog.morizyun.com/javascript/library-typescript-pino-logger.html)  
[express-pino-logger](https://github.com/pinojs/express-pino-logger#readme)  
[tsoa](https://github.com/lukeautry/tsoa)  
[swagger-ui-express](https://github.com/scottie1984/swagger-ui-express)  


https://tsoa-community.github.io/docs/getting-started.html#initializing-our-project