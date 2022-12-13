# README

Demonstrate checking if a commit should trigger docker build  

## Reason

Test the ability to determine if a build should trigger based on a dockerignore file.  

TODO:

* Get signal back out of the container - yes or no
* Share in the dockerignore and the git commits

## Test (local)

```sh
# install packages for the scripts
npm install

# will not trigger (exitcode 0)
npm run test "./commits/ecad448.txt" "./testNoTrigger.dockerignore"
npm run start:dev -- "./commits/ecad448.txt" "./testNoTrigger.dockerignore"
echo $? 
# will trigger (exitcode 1)
npm run test "./commits/ecad448.txt" "./testTrigger.dockerignore"
npm run start:dev -- "./commits/ecad448.txt" "./testTrigger.dockerignore"
echo $? 

# also works off envvars
set -a  
. ./.env
set +a

# list commits
git log -n 30 --name-only --oneline
# create a commit file
git show --pretty="format:" --name-only --stat --oneline ecad448 | tail -n +2 > "./commits/ecad448.txt"
git show --pretty="format:" --name-only --stat --oneline $(git rev-parse HEAD) | tail -n +2 > "./commits/$(git rev-parse HEAD).txt"
```

## Test (docker)

```sh
# build the 30_commit_trigger_checker image
npm run docker:build
npm run docker:run

# run with filter
docker create --rm -it --name 30_commit_trigger_checker 30_commit_trigger_checker /work/commits.txt /work/.dockerignore
docker cp "./commits/ecad448.txt" 30_commit_trigger_checker:/work/commits.txt
docker cp "./testTrigger.dockerignore" 30_commit_trigger_checker:/work/.dockerignore
# execute
docker start -ai 30_commit_trigger_checker
echo $? 
```

## Install Quokka

```sh
# install extension
code --install-extension WallabyJs.quokka-vscode
```

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

* @balena/dockerignore [here](https://www.npmjs.com/package/@balena/dockerignore)  
* How to parse command line arguments [here](https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/)  
