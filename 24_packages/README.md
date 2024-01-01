# PACKAGES

Demonstrate some examples of how to develop and use custom packages.  

TODO:

* Create a package that supports both ESM and CJS.  
* Testable in jest with ESM.  CJS is working.
* Remove the tests from the package
* Rebuild when code is modified - fixing the nonsense undetected dependency changes
* Add dependencies to the package omit or something.
* Spellcheck
* Directory to Markdown - a package to create markdown directories. 
* Build types for packages that don't have them. 

DEMONSTRATES:

* Different module systems; CJS and ESM.  
* How to import local packages from the same repo. When installed it creates a symbolic link.  
* CommonJS modules inherently have module and exports objects.  

## Idea

Build a quick little testbed for playing with CJS and ESM packages. There will be three packages; CJS, ESM and a dual build.  

## CJS

* [packages/spellcheck_cjs/README.md](./packages/spellcheck_cjs/README.md)
* [clients/client_cjs/README.md](./clients/client_cjs/README.md)

## ESM

* [packages/spellcheck_esm/README.md](./packages/spellcheck_esm/README.md)
* [clients/client_esm/README.md](./clients/client_esm/README.md)

## Dual ESM and CJS

* [packages/spellcheck_dual/README.md](./packages/spellcheck_dual/README.md)
* [clients/client_dual/README.md](./clients/client_dual/README.md)

## Justfile

REF: [github.com/chrisguest75/shell_examples75_just/README.md](https://github.com/chrisguest75/shell_examples/blob/master/75_just/README.md)  

```sh
./justfile test-all

./justfile test-spellcheck-cjs
./justfile test-spellcheck-esm

# build both esm and cjs for a dual library
./justfile test-spellcheck-dual
```

## Validating Conformance

Lint if a package is published right [publint.dev](https://publint.dev/)  

```sh
npx publint
```

## Resources

* How to Create a Hybrid NPM Module for ESM and CommonJS. [here](https://www.sensedeep.com/blog/posts/2021/how-to-create-single-source-npm-module.html)  
* The Modern Guide to Packaging your JavaScript library [here](https://github.com/frehner/modern-guide-to-packaging-js-library)  
* Node Modules at War: Why CommonJS and ES Modules Can’t Get Along [here](https://redfin.engineering/node-modules-at-war-why-commonjs-and-es-modules-cant-get-along-9617135eeca1)  
* Dual CommonJS/ES module packages [here](https://nodejs.org/api/packages.html#dual-package-hazard)  
* Migrating an NPM package to use ES Modules [here](https://medium.com/digio-australia/migrating-an-npm-package-to-use-es-modules-d59877963d61)  
* Webpack: Providing CommonJs and ESM version (stateful) [here](https://webpack.js.org/guides/package-exports/#providing-commonjs-and-esm-version-stateful)

* [publint.dev](https://publint.dev/)  
* Are the types wrong? [here](https://arethetypeswrong.github.io/)
* arethetypeswrong/cli [here](https://github.com/arethetypeswrong/arethetypeswrong.github.io/blob/main/packages/cli/README.md)

* https://publint.dev/apollo-server-logging@1.0.2

* https://antfu.me/posts/types-for-sub-modules
* https://antfu.me/posts/publish-esm-and-cjs

* https://github.com/kodie/md5-file
* https://github.com/orangewise/s3-zip
* https://github.com/tubbo/apollo-server-logging

