# Debugging Express in Container

Demonstrate how to debug typescript `express` applications in the container.  

## Reason

Sometimes we need to debug inside the actual container.  Especially if we're developing on MacOS.  
This should also allow us to debug on kubernetes or ECS clusters.  

TODO:

* ensure source is same locally as in container - copy the maps from container to local.
* Examine rules and plugins for eslint https://www.npmjs.com/package/eslint-plugin-jest

## Build

```sh
cd ./29_express_debugging

nvm use
npm install

# use typescript compiler
npm run tsc -- --version  

# run targets
npm run start:dev
npm run test
npm run lint

npm run start:dev
```

## Debug locally

To debug locally you can select the debugger tab in `vscode`.  Drop down `node.js` and select the npm script `start:dev:debug`.  
This will allow you to set breakpoints in the typescript code.  

## Debug docker

The the npm script and then start the `Debug Docker` debugger from the `launch.json`

```sh
# NOTE: this will build the code locally to be used for maps.  Should really copy this from intermediate container.  
npm run docker:run:debug 
```

## Debug config

We use the localRoot and remoteRoot to map paths.  

```json
"localRoot": "${workspaceFolder}/build",
"remoteRoot": "/work",
```

## Troubleshoot

If the source maps are not correct you might see something like this.  

```txt
debug console
Could not read source map for file:///work/src/index.js: ENOENT: no such file or directory, open '"git root"/28_debugging/src/index.js.map'
```

```sh
# run outside of npm
docker run -it --rm -p 9229:9229 --name 29_express_debugging 29_express_debugging --inspect-brk=0.0.0.0:9229 /work/src/index.js

# step inside container
docker exec -it 29_express_debugging /busybox/sh
```

## Resources  

* How to remotely debug Node.js app with source maps (using WebStorm) [here](https://stackoverflow.com/questions/36463501/how-to-remotely-debug-node-js-app-with-source-maps-using-webstorm)
* Using sourcemaps on production without exposing the source code 🕵️‍ [here](https://itnext.io/using-sourcemaps-on-production-without-revealing-the-source-code-%EF%B8%8F-d41e78e20c89)

