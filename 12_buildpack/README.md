# README
Demonstrates a simple cmdline application packaged in a buildpack

Based on [43_python_buildpacks](https://github.com/chrisguest75/docker_build_examples/tree/master/43_python_buildpacks) and [buildpack-samples](https://github.com/GoogleCloudPlatform/buildpack-samples)  

## How to run
```sh
npm install
npm run start:dev
```

## How to create buildpack
Uses postinstall to compile typescript.  

```json
  // specifies buildpack version of node to use inside package.json  
  "engines": {
    "node": "14.16.0"
  } 
```

Build the image
```sh
# build the image
pack build tsbuildpackexample --builder gcr.io/buildpacks/builder --env GOOGLE_ENTRYPOINT="node ./build/index.js"  
docker run tsbuildpackexample            
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
    "postinstall": "tsc --build",
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

* [google samples](https://github.com/GoogleCloudPlatform/buildpack-samples)  
* [heroku typescript](https://github.com/heroku/buildpacks-nodejs/blob/main/buildpacks/typescript/README.md)  
