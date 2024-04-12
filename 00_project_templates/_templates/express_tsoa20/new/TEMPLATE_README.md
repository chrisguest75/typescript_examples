---
to: <%= name %>/TEMPLATE_README.md
---
# README

Demonstrates <%= name %>

* REF: [github.com/chrisguest75/typescript_examples/13_echo_service](https://github.com/chrisguest75/typescript_examples/tree/master/13_echo_service)  
* REF: [github.com/chrisguest75/typescript_examples/34_todo_api](https://github.com/chrisguest75/typescript_examples/tree/master/34_todo_api)  

NOTES:

* Commented out node-prune because it was removing required dependencies.  
* Use `esm:true` in the `tsoa.json` to enable .js extensions.  
* Testing required because of esm, ts-node, jest and node:
    * `npm run build:run` - from build directory
    * `npm run start:dev` - using ts-node
    * `npm run test` - run with jest
    * `npm run docker:run` - run inside docker
    * `npm run docker:run:chainguard` - run inside docker with chainguard

## How to run

```sh
nvm use
npm install

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

npm install --save tsoa swagger-ui-express
npm install --save-dev @types/swagger-ui-express
```

## Resources

* My basic typecript cmdline [01_basic_cmdline](https://github.com/chrisguest75/typescript_examples/tree/master/01_basic_cmdline)
* ts-jest ESM Support [here](https://kulshekhar.github.io/ts-jest/docs/guides/esm-support/#support-mts-extension)  

* Chainguard LTS images [here](https://images.chainguard.dev/directory/image/node-lts/versions)
* Node prune [here](https://github.com/tj/node-prune/tree/master)  
