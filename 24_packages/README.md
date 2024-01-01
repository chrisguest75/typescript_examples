# PACKAGES

Demonstrate some examples of how to develop and use custom packages.  

TODO:

* Create a package that supports both ESM and CJS.  
* Testable in jest
* Rebuild when code is modified - fixing the nonsense undetected dependency changes
* Add dependencies to the package omit or something.
* Spellcheck
* Directory to Markdown
* Build types for packages that don't have them.
* Could also be a package to create markdown directories.  

DEMONSTRATES:

* Different module systems; CJS and ESM.  
* How to import local packages from the same repo.  
* CommonJS modules inherently have module and exports objects.  
* 

## Idea

Build a quick little testbed for playing with CJS and ESM packages. There will be three packages; CJS, ESM and a dual build.  

## CJS

* [packages/spellcheck_cjs/README.md](./packages/spellcheck_cjs/README.md)

## Validating Conformance

Lint if a package is published right [publint.dev](https://publint.dev/)  

```sh
npx publint
```

## Resources

* How to Create a Hybrid NPM Module for ESM and CommonJS. [here](https://www.sensedeep.com/blog/posts/2021/how-to-create-single-source-npm-module.html)  
* The Modern Guide to Packaging your JavaScript library [here](https://github.com/frehner/modern-guide-to-packaging-js-library)
* [publint.dev](https://publint.dev/)  
* https://publint.dev/apollo-server-logging@1.0.2

* https://antfu.me/posts/types-for-sub-modules
* https://antfu.me/posts/publish-esm-and-cjs

* https://webpack.js.org/guides/package-exports/#providing-commonjs-and-esm-version-stateful

* https://redfin.engineering/node-modules-at-war-why-commonjs-and-es-modules-cant-get-along-9617135eeca1

* https://nodejs.org/api/packages.html#dual-package-hazard

* https://github.com/kodie/md5-file
* https://github.com/orangewise/s3-zip
* https://github.com/tubbo/apollo-server-logging

* https://medium.com/digio-australia/migrating-an-npm-package-to-use-es-modules-d59877963d61