# CJS PACKAGE

## Create

Setup typescript for a basic nodejs CJS package.  

```sh
mkdir -p spellcheck_cjs

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
```

```js
  "scripts": {
      "docs": "typedoc --out docs src"
  },
```

```sh
# generate docs
npm run docs   
```

## Resources
