# README

Demonstrate using opentelemetry with a simple cli tool  

TODO:

* Add file creation time and scan time to the output

## How to run

```sh
npm install

# run targets
npm run start:dev
npm run test
npm run lint
```

## Start

```sh
npm install

# start nodemon
npm run start:dev     

# build
npm run build 

# pass path in
npm run start:cmd:path --path=../../../../evaluation          
npm run start:cmd:path --path=/Volumes/videoshare/audiobooks

# to import data into mongodb
./import_probe_data.sh
```

```sh
brew install ffmpeg
```

## How to recreate

Create folder  

```sh
mkdir xx_project_name
cd ./xx_project_name

# write out an .nvmrc file
node --version > .nvmrc        
```

Setup typescript for a basic nodejs project

```sh
npm init -y   
npm install typescript @types/node ts-node nodemon rimraf --save-dev  

# get typescript version
./node_modules/typescript/bin/tsc --version 

# create tsconfig.json
npx tsc --init --rootDir "." --outDir build \
--esModuleInterop --resolveJsonModule --lib es6 \
--module commonjs --allowJs true --noImplicitAny true --sourceMap
```

Add `scripts` section to `package.json`

```js
  "scripts": {
    "clean": "rimraf build",
    "build": "tsc",
    "rebuild": "npm run clean && npm run build",
    "clean:build": "npm run rebuild",
    "type-check": "tsc --noEmit",
    "type-check:watch": "npm run type-check -- --watch",
    "start:dev": "npm run rebuild && nodemon"
  },
```

Add a `nodemonConfig` to `package.json`

```json
  "nodemonConfig": {
    "watch": ["src", "nodemon.json", "tsconfig.json", "package.json"],
    "ext": "ts",
    "ignore": [],
    "exec": "ts-node ./src/index.ts"
  }
```

Add an `index.ts` to `src`

```bash
mkdir -p ./src
cat << EOF  > ./src/index.ts
export function main(): number {
  // var a = 0
  console.log('Hello world!!!!')
  return 0
}

main()
EOF
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

```sh
#run it
npm run start:dev
```

## Testing

```sh
npm install jest @types/jest ts-jest --save-dev  
```

Add an `index.test.ts` to `tests`

```bash
mkdir -p ./tests
cat << EOF  > ./tests/index.test.ts
import { main } from '../src/index'

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
  testRegex: 'tests/.*\\\\.(test|spec)?\\\\.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}
EOF
```

```sh
#test it
npm run test
```

## Add linting

Add a basic linter

```sh
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install eslint-plugin-prettier@latest eslint-config-prettier --save-dev 

# add an .eslintrc
cat << EOF > ./.eslintignore
node_modules
build
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

## Debugging

Ensure that the sourcemap output is enabled.  

```json
  "sourceMap": true,  
```

Open `vscode` in the correct directory.  

```sh
# you must be in the code directory and not in the git root
cd ./xx_project_name
nvm install

# if the code is built it will use the version in here to debug
npm run clean
code .
```

1. Select `./src/index.ts` and put a breakpoint on the log line.  
2. Click the debug icon. Click on create a `launch.json` and select `node.js` NOTE: If you select Run and Debug it will fail because the code is not built.  
3. Click the debug icon again and then drop down the selection to select node.js and select a target of "start:dev"

The code should break on the breakpoint.  

## Add pino logging

```sh
npm install pino     
npm install --save-dev @types/pino   
```

## Integrate Honeycomb

Follow "OpenTelemetry for JavaScript" [here](https://docs.honeycomb.io/getting-data-in/javascript/opentelemetry/)

```sh
npm install --save @grpc/grpc-js
npm install --save @opentelemetry/api
npm install --save @opentelemetry/sdk-node
npm install --save @opentelemetry/exporter-trace-otlp-grpc
npm install --save @opentelemetry/auto-instrumentations-node
npm install dotenv       
```

Copy the `./.env.template` to `./.env` and get APIKEY from [honeycomb account](https://ui.honeycomb.io/account)

```sh
#test it
npm run start:dev
```

## Resources

* How to Setup a TypeScript + Node.js Project [node-starter-project](https://khalilstemmler.com/blogs/typescript/node-starter-project/)  
* How to use ESLint with TypeScript [eslint-for-typescript](https://khalilstemmler.com/blogs/typescript/eslint-for-typescript/)  
* OpenTelemetry for JavaScript [here](https://docs.honeycomb.io/getting-data-in/javascript/opentelemetry/)  
* Step 2: Instrument Your Application to Send Telemetry Data to Honeycomb [here](https://docs.honeycomb.io/getting-started/quickstart/#step-2-instrument-your-application-to-send-telemetry-data-to-honeycomb)
* Service Instrumentation: The Basic Concepts [here](https://logz.io/learn/opentelemetry-guide/#concepts)
* lightstep/opentelemetry-examples repo [here](https://github.com/lightstep/opentelemetry-examples/tree/main/nodejs)
* Create spans [here](https://opentelemetry.io/docs/instrumentation/js/instrumentation/#create-spans)
* OpenTelemetry JavaScript Tracing API Documentation [here](https://opentelemetry.io/docs/instrumentation/js/api/tracing/)
* OpenTelemetry for NodeJS: All you need to know about tracing [here](https://medium.com/@tedsuo/opentelemetry-nodejs-all-you-need-to-know-a4e1c8f2f93)
