# README
Demonstrates a monte carlo text generator

Based on [03_jest_testing](../03_jest_testing/README.md)

## Using Jest
```sh
npm install
npm run test
```

## How to recreate
Setup typescript for a basic nodejs project
```sh
npm init -y   
npm install typescript @types/node jest @types/jest ts-jest --save-dev  

npx tsc --init --rootDir src --outDir build \
--esModuleInterop --resolveJsonModule --lib es6 \
--module commonjs --allowJs true --noImplicitAny true --sourceMap
```

Create `jest.config.js` file
```js
module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  testEnvironment: 'node',
  testRegex: 'tests/.*\\.(test|spec)?\\.(ts|tsx|js)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
```

```sh
mkdir ./src
mkdir ./tests
```

# Add a class and class.test
```sh
echo "export myclass model {}" > ./src/myclass.ts

```

## Resources




