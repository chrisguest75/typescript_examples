# README
Demonstrate how to build a docker container containing typescript transpiled application  

Based on [d3_examples](https://github.com/chrisguest75/d3_examples)  

## Run it
```sh
# install
npm install
```

Local build and development
```sh
# run it locally
npm run start
npm run start:dev_browser
```

Docker build and development
```sh
# build globe container
npm run build:image
# run it from an image
npm run start:image
# open in broswer
npm run start:image_browser       
```
## How it was built

```sh
npm init -y  

# bundling https://parceljs.org/
npm install parcel --save-dev

# typescript https://www.npmjs.com/package/rimraf

npm install typescript @types/node ts-node nodemon rimraf npm-run-all --save-dev  

# add a tsconfig
npx tsc --init --rootDir src --outDir build \
--esModuleInterop --resolveJsonModule --lib es6 \
--module commonjs --allowJs true --noImplicitAny true

# d3
npm install d3 --save
npm install @types/d3 --save-dev
```

Update the package.json
```json
    "start": "run-p -l type-check:watch start:dev",
    "type-check": "tsc --noEmit",
    "type-check:watch": "npm run type-check -- --watch",
    "start:dev": "parcel ./src/index.html",
    "start:browser": "open http://localhost:1234"
```

Use the "start" target in the npm script in vscode
Also use the live server update  
## Notes

