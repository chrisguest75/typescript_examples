# README

Demonstrate examples of using TS as a language for scripting against AWS.  

## Reason

We want to be able to easily script tooling against AWS APIs.  This allows building bespoke tools to manage services and their dependencies.  

## Install & Run

```sh
# install packages for the scripts
npm install

# set environment variables.  
set -a
. ./.env
set +a

npm run start:dev
# or
npm run docker:run
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


https://blog.logrocket.com/typescript-4-7-ecmascript-module-support/
https://devblogs.microsoft.com/typescript/announcing-typescript-4-5-beta/

Creating ESM-based shell scripts for Unix and Windows with Node.js
https://2ality.com/2022/07/nodejs-esm-shell-scripts.html

https://exploringjs.com/nodejs-shell-scripting/ch_creating-shell-scripts.html

Shell scripting with Nodejs
https://exploringjs.com/nodejs-shell-scripting/toc.html


Impatient programmers
https://exploringjs.com/impatient-js/toc.html

Top level await.  Could i solve the ssm issue with a top level await. 
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await#:~:text=Top%20level%20await,other%20child%20modules%20from%20loading.

// fetch request
const colors = fetch("../data/colors.json").then((response) => response.json());

export default await colors;



Imoort assertions
https://v8.dev/features/import-assertions