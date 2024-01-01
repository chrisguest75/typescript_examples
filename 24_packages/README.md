# PACKAGES

* Spellcheck
* Directory to Markdown

NOTE:

* Could also be a package to create markdown directories.  

TODO:

* Create a package that supports both ESM and CJS.  
* Testable in jest

## Create

Setup typescript for a basic nodejs project  

```sh
mkdir -p spellcheck

nvm use --lts
node --version > .nvmrc

npm init --scope=@chrisguest75 -y
npm install typescript @types/node ts-node nodemon rimraf --save-dev  

# get typescript version
./node_modules/typescript/bin/tsc --version 

# create tsconfig.json
npx tsc --init --rootDir src --outDir dist \
--esModuleInterop --resolveJsonModule --lib es6 \
--module commonjs --allowJs false --noImplicitAny true --declaration true --declarationMap true --sourceMap true
```

Add a nodemonConfig to package.json  

```json
  "nodemonConfig": {
    "watch": ["src", "nodemon.json", "tsconfig.json", "package.json"],
    "ext": "ts",
    "ignore": [],
    "exec": "ts-node ./src/index.ts"
  }
```

```sh
#run
Copy the template ./src folder to the new project
```sh
cp ./src ../xx_project_name
```

Copy over the package.json scripts  

```json
  "scripts": {
    "clean": "rimraf dist",
    "build": "tsc",
    "rebuild": "npm run clean && npm run build",
    "clean:build": "npm run rebuild",
    "type-check": "tsc --noEmit",
    "type-check:watch": "npm run type-check -- --watch",
    "start:dev": "npm run rebuild && nodemon"
  },
```

Install prettier

```sh
code --install-extension esbenp.prettier-vscode
npm install --save-dev prettier 

cat << EOF  > ./.prettierrc
{
  "useTabs": false,
  "semi":  false,
  "trailingComma":  "all",
  "singleQuote":  true,
  "printWidth":  120,
  "tabWidth":  2
}
EOF
```

## Testing

```sh
npm install jest @types/jest ts-jest --save-dev  
```

Add an `index.test.ts` to `tests`

```bash
cat << EOF  > ./src/index.test.ts
import { main } from './index'

test('empty test', () => {
  // ARRANGE
  const a = 0
  // ACT

  // ASSERT
  expect(main()).toBe(0)
})
EOF
```

Add more targets to `scripts` section in `package.json`

```js
  "scripts": {
    "test": "jest",
    "coverage": "jest --coverage"
  },
```

Add a `jest.config.js` file

```sh
cat << EOF > ./jest.config.js
module.exports = {
  transform: {
    '^.+\\\\.ts?$': 'ts-jest',
  },
  testEnvironment: 'node',
  testRegex: 'src/.*\\\\.(test|spec)?\\\\.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}
EOF
```

## Add linting

Add a basic linter

```sh
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install eslint-plugin-prettier@latest eslint-config-prettier --save-dev 

# add an .eslintrc
cat << EOF > ./.eslintignore
node_modules
dist
EOF

cat << EOF > ./.eslintrc
{
  "env": {
      "browser": false,
      "es2021": true
  },
  "extends": [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:prettier/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
      "ecmaVersion": 2019,
      "sourceType": "module"
  },
  "plugins": [
      "@typescript-eslint", 
      "prettier"
  ],
  "rules": {
      "prettier/prettier": [
          "error",
          {
              "useTabs": false,
              "semi":  false,
              "trailingComma":  "all",
              "singleQuote":  true,
              "printWidth":  120,
              "tabWidth":  2
          }]
  }
}
EOF
```

Add more targets to `scripts` section in `package.json`

```js
  "scripts": {
    "lint": "eslint . --ext .ts",
    "lint:fix": "eslint . --ext .ts --fix",
  },
```

```sh
#test it
npm run lint
```

## Documentation

```sh
# install typedoc
npm install --savedev typedoc  

# generate docs
npx typedoc src/index.ts
```



## Resources

* How to Create a Hybrid NPM Module for ESM and CommonJS. [here](https://www.sensedeep.com/blog/posts/2021/how-to-create-single-source-npm-module.html)  
https://antfu.me/posts/types-for-sub-modules
https://antfu.me/posts/publish-esm-and-cjs

https://publint.dev/
https://publint.dev/apollo-server-logging@1.0.2

https://webpack.js.org/guides/package-exports/#providing-commonjs-and-esm-version-stateful

https://redfin.engineering/node-modules-at-war-why-commonjs-and-es-modules-cant-get-along-9617135eeca1

https://nodejs.org/api/packages.html#dual-package-hazard

https://github.com/kodie/md5-file
https://github.com/orangewise/s3-zip
https://github.com/tubbo/apollo-server-logging

https://medium.com/digio-australia/migrating-an-npm-package-to-use-es-modules-d59877963d61