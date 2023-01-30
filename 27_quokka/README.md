# README

Demonstrate some `quokka` examples

## Reason

Quokka allows us to execute and test the behaviour of small snippets of code. It will print outputs on every line thus allowing quick development when working with APIs.  

NOTES:  

* `.quokka` file should have `babel:false` to run javascript.

TODO:

* Add linter to quokka.  
* Go through some of these - https://github.com/30-seconds/30-seconds-of-code/tree/master/snippets

## Install

```sh
# install extension
code --install-extension WallabyJs.quokka-vscode
```

```sh
# install packages for the scripts
npm install
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

* Quokka Plugins [here](https://quokkajs.com/docs/configuration.html#plugins)
* Some examples [here](https://github.com/wallabyjs/interactive-examples/tree/master/JavaScript)
* Can use the AST explorer to understand how code is interpreted [here](https://astexplorer.net/)  
* The ESTree Spec [here](https://github.com/estree/estree)
* Underscore Throttle [here](https://underscorejs.org/#throttle)
* Lodash Throttle [here](https://lodash.com/docs/4.17.15#throttle)
* Lodash [here](https://lodash.com/)
* Difference between lodash and Underscore [here](https://www.geeksforgeeks.org/difference-between-lodash-and-underscore/)
* s3-sync-client [here](https://www.npmjs.com/package/s3-sync-client)  


https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/
https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-ecs/index.html
https://github.com/aws/aws-sdk-js
https://github.com/aws-samples/aws-sdk-js-tests
https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-servicediscovery/index.html