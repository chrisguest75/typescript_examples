# UPGRADING NPM PACKAGES

If we're upgrading NPM packages in a project there are some pointers below.  

TODO:

* instructions for yarn

## Detection

```sh
# use outdated to show newer package versions 
npm outdated

# also show 
npm audit
```

## npm-check

[npm-check](https://www.npmjs.com/package/npm-check) gives a much better report with links to repos.  

We install globally `npm install -g npm-check`. It's nice because it gives you the command you need to upate the version.  

```sh
npm-check
```

```sh
# upgrade package example
npm install dotenv@16.3.1 --save  
```

## better-npm-audit

[better-npm-audit](https://www.npmjs.com/package/better-npm-audit?activeTab=readme)  

```sh
# add to the project or install globally 
npm install --save better-npm-audit
```

Add the following script if installing into the project.  

```json
"audit": "better-npm-audit audit --production",
```

```sh
npm run audit
```

## Resources

* Updating packages downloaded from the registry [here](https://docs.npmjs.com/updating-packages-downloaded-from-the-registry)
* npm-check [here](https://www.npmjs.com/package/npm-check)
* Better NPM Audit [here](https://www.npmjs.com/package/better-npm-audit?activeTab=readme)
