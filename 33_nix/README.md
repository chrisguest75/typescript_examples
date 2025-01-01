# README

Demonstrates 33_nix

NOTES:

* The flake file has to be in the git index (committed or staged) before you can enter develop.

TODO:

* develop has no --pure option - how can I stop the environment pollution?

## Prereqs

Install Nix using determinate systems installer.  

REF: [github.com/chrisguest75/nix-examples/15_determinate_install/README.md](https://github.com/chrisguest75/nix-examples/blob/master/15_determinate_install/README.md)  

```sh
# check flakes are enabled
cat /etc/nix/nix.conf 
```

## Development using nix

Open a pure shell and install packages

```sh
cd ./33_nix
# python311 pure
nix-shell --pure -p nodejs_20

nix develop --command zsh
```

## How to run

```sh
node --version
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

* Search more than 80 000 packages [here](https://search.nixos.org/)
