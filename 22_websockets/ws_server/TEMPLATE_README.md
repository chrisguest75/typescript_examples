# README

Demonstrates ws_server

## How to run

```sh
# non-nix
nvm use
# or nix flake (remember to add flake.nix to git staged)
just nix 
# or
nix develop --command zsh

# install packages
npm install
just install

# use typescript compiler
npm run tsc -- --version  

# run targets
npm run start:dev
npm run test
npm run lint

# docker build
npm run docker:build
npm run docker:run


# run all tests
just local-test-pipeline
```

## Debugging

Ensure that the sourcemap output is enabled.  

```json
  "sourceMap": true,  
```

Open `vscode` in the correct directory.  

```sh
# you must be in the code directory and not in the git root
cd ./xx_project_name
nvm install

# if the code is built it will use the version in here to debug
npm run clean
code .
```

1. Select `./src/index.ts` and put a breakpoint on the log line.  
2. Click the debug icon. Click on create a `launch.json` and select `node.js` NOTE: If you select Run and Debug it will fail because the code is not built.  
3. Click the debug icon again and then drop down the selection to select node.js and select a target of "start:dev"

The code should break on the breakpoint.  

## How it was created

```sh
npm install --save express 
npm install --save-dev @types/express
npm install express-pino-logger
npm install --save-dev @types/express-pino-logger
```

## Resources

* My basic typecript cmdline [01_basic_cmdline](https://github.com/chrisguest75/typescript_examples/tree/master/01_basic_cmdline)
* ts-jest ESM Support [here](https://kulshekhar.github.io/ts-jest/docs/guides/esm-support/#support-mts-extension)  

* Chainguard LTS images [here](https://images.chainguard.dev/directory/image/node-lts/versions)
* Node prune [here](https://github.com/tj/node-prune/tree/master)  
* https://expressjs.com/en/guide/debugging.html
* https://medium.com/kocfinanstech/socket-io-with-node-js-express-5cc75aa67cae
* https://stackoverflow.com/questions/42318773/how-to-log-every-http-request-made-in-node