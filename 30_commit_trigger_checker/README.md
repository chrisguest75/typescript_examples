# README

Demonstrate checking if a commit should trigger docker build  

## Reason

Test the ability to determine if a build should trigger based on a dockerignore file.  

TODO:

* Get signal back out of the container - yes or no
* Share in the dockerignore and the git commits

## Install

```sh
# install extension
code --install-extension WallabyJs.quokka-vscode
```

```sh
# install packages for the scripts
npm install

set -a  
. ./.env
set +a

git log -n 30 --name-only --oneline                              
git show --pretty="format:" --name-only --stat --oneline ecad448 | tail -n +2 > "./commits/ecad448.txt"

npm run test         
npm run docker:build         
npm run docker:run

unset COMMITSPATH   
npm run test "./commits/b363e88.txt" "./test.dockerignore"     
npm run test "./commits/ecad448.txt" "./test.dockerignore"    
```

## Run

```sh
# execute the script
Cmd+Shift+P - Quokka.js Start on Current File
```

## Creating typescript types

It's possible to create typescript types from javascript objects.

```sh
# create typescript types from javascript objects
code --install-extension quicktype.quicktype
```

## Resources

- @balena/dockerignore [here](https://www.npmjs.com/package/@balena/dockerignore)  
- How to parse command line arguments [here](https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/)  
