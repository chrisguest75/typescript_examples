# UPGRADING NPM PACKAGES

If we're upgrading NPM packages in a project there are some pointers below.  

```sh
# use outdated to show newer package versions 
npm outdated

# also show 
npm audit
```

## npm-check

[npm-check](https://www.npmjs.com/package/npm-check) gives a much better report with links to repos.  

```sh

npm updated
npm outdated

npm audit

https://www.npmjs.com/package/npm-check

npm install dotenv@16.3.1 --save  

better-npm-audit
https://www.npmjs.com/package/better-npm-audit?activeTab=readme

npm install --save better-npm-audit

npm run audit    


    "audit": "better-npm-audit audit --production",




## Resources

https://docs.npmjs.com/updating-packages-downloaded-from-the-registry
https://www.npmjs.com/package/npm-check
https://www.npmjs.com/package/better-npm-audit?activeTab=readme
