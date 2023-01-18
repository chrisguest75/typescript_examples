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
