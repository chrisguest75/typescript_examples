# README

Demonstrate examples of using TS as a language for scripting against AWS.  

TODO:

* create a new template so I can test version differences between 16 and 18
* Fix tests to run - issue with jest and modules.
* Why do I need to copy the package.json "type: module" to get it working?
* Dynamic type for config object? Generics?

## Reason

We want to be able to easily script tooling against AWS APIs.  This allows building bespoke tools to manage services and their dependencies.  

## Demonstrates

* Using top level await and module await for config to load from external SSM resource.  
* SSM parameter is typechecked with Zod and values are exported into process environment.  
* Full Node 18 including distroless docker build.  

## Install & Run

```sh
# install packages for the scripts
npm install

# set environment variables.  
set -a
. ./.env
set +a

npm run start:dev -- --throwError
# or
npm run docker:run
npm run docker:run -- /work/src/index.js --throwError

# read only
npm run docker:run -- /work/src/index.js --ssmRead

# write structure
npm run docker:run -- /work/src/index.js --ssmWrite

# increment field example
npm run docker:run -- /work/src/index.js --ssmRead --ssmWrite



# 
export PAGER=
aws --profile ${AWS_PROFILE} --region ${AWS_REGION} ssm describe-parameters 

aws --profile ${AWS_PROFILE} --region ${AWS_REGION} ssm get-parameter --name "testssmdocument"
```

## Troubleshooting

```sh
dive 32_scripting_aws:latest
# 
docker run -it --rm --entrypoint /busybox/sh 32_scripting_aws:latest 
```

## Quokka

Quokka allows quick development of functions in a REPL style environment.  

### Install

```sh
# install extension
code --install-extension WallabyJs.quokka-vscode
```

### Run

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

* AWS SDK for JavaScript [here](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/)  
* ECS Client - AWS SDK for JavaScript v3 [here](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-ecs/index.html)
* aws/aws-sdk-js repo [here](https://github.com/aws/aws-sdk-js)
* aws-samples/aws-sdk-js-tests repo [here](https://github.com/aws-samples/aws-sdk-js-tests)  
* ServiceDiscovery Client - AWS SDK for JavaScript v3 [here](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-servicediscovery/index.html)  
* SSM Client - AWS SDK for JavaScript v3 [here](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-ssm/index.html)  
* Schema validation in TypeScript with Zod [here](https://blog.logrocket.com/schema-validation-typescript-zod/)  
* .mts is a cool file extension (TypeScript ES modules) [here](https://mtsknn.fi/blog/mts-file-extension/)
* Understanding TypeScript 4.7 and ECMAScript module support [here](https://blog.logrocket.com/typescript-4-7-ecmascript-module-support/)
* Announcing TypeScript 4.5 Beta [here](https://devblogs.microsoft.com/typescript/announcing-typescript-4-5-beta/)
* Creating ESM-based shell scripts for Unix and Windows with Node.js [here](https://2ality.com/2022/07/nodejs-esm-shell-scripts.html)
* Creating cross-platform shell scripts [here](https://exploringjs.com/nodejs-shell-scripting/ch_creating-shell-scripts.html)
* Shell scripting with Nodejs [here](https://exploringjs.com/nodejs-shell-scripting/toc.html)
* JavaScript for impatient programmers [here](https://exploringjs.com/impatient-js/toc.html)
* Top level await. You can use the await keyword on its own (outside of an async function) at the top level of a module. This means that modules with child modules that use await will wait for the child modules to execute before they themselves run, all while not blocking other child modules from loading. [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)
* Import assertions [here](https://v8.dev/features/import-assertions)
* Top-level await and Import in Typescript [here](https://stackoverflow.com/questions/71099311/top-level-await-and-import-in-typescript)
* "Uncaught SyntaxError: Cannot use import statement outside a module" when importing ECMAScript 6 [here](https://stackoverflow.com/questions/58211880/uncaught-syntaxerror-cannot-use-import-statement-outside-a-module-when-import)
* Can't run my Node.js Typescript project TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".ts" for /app/src/App.ts ts-node-esm [here](https://stackoverflow.com/questions/62096269/cant-run-my-node-js-typescript-project-typeerror-err-unknown-file-extension)
* Item 54: Know How to Iterate Over Objects [here](https://effectivetypescript.com/2020/05/26/iterate-objects/)