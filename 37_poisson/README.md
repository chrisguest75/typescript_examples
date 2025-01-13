# POISSON

Demonstrates using poisson distribution to generate faked trade events.  

## How to run

```sh
# non-nix
nvm use
# or nix flake
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

# run tests
just test

# generate trades
just start-dev -- --trades --total 100

# simulate
just start-dev -- --simulate
```

## Build docs

```sh
npm run docs:serve
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
* ts-jest ESM Support [here](https://kulshekhar.github.io/ts-jest/docs/guides/esm-support/#support-mts-extension)  

* Chainguard LTS images [here](https://images.chainguard.dev/directory/image/node-lts/versions)
* Node prune [here](https://github.com/tj/node-prune/tree/master)  
