# README

Demonstrates generating fake json data.

TODO:

* cmdline tested in docker to using local filesystem volume for output.
* add different types of data

## How to run

```sh
nvm use
npm install

# run targets
npm run start:dev
npm run test
npm run lint

# docker build
npm run docker:build
npm run docker:run
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

## Resources

* My basic typecript cmdline [01_basic_cmdline](https://github.com/chrisguest75/typescript_examples/tree/master/01_basic_cmdline)
* falso [here](https://netbasal.com/generate-fake-data-in-the-browser-and-node-js-using-falso-3998d2bcbaaf)
* falso getting started [here](https://ngneat.github.io/falso/docs/getting-started/)
* faker-js [here](https://github.com/faker-js/faker)
