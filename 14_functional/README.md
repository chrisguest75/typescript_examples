# README
Demonstrate some basic functional programming.

## Using Jest
```sh
npm install
npm run test
```

## How to build
Setup typescript for a basic nodejs project
```sh
npm init -y   
npm install typescript @types/node jest @types/jest ts-jest --save-dev  
npm install ts-node nodemon rimraf --save-dev 

npx tsc --init --rootDir src --outDir build \
--esModuleInterop --resolveJsonModule --lib es6 \
--module commonjs --allowJs true --noImplicitAny true --sourceMap
```

Add `scripts` section to `package.json` 
```js
  "scripts": {
    "build": "rimraf ./build && tsc",
    "lint": "eslint . --ext .ts",
    "start:dev": "nodemon",
    "test": "echo \"Error: no test specified\" && exit 1"
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
function main() 
{
    // var a = 0
    console.log('Hello world!!!!')
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
  "tabWidth": 2,
  "useTabs": false
}
EOF
```

## Start 

```sh
npm install

# start nodemon
npm run start:dev     

# build
npm run build 
```


## Testing

```sh
npm install jest @types/jest ts-jest --save-dev  
```

Add an `index.test.ts` to `tests`
```bash
mkdir -p ./tests
cat << EOF  > ./tests/index.test.ts
test('empty test', () => {
  // ARRANGE
  let a = 0;
  // ACT

  // ASSERT
  expect(a).toBe(0);
});
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
    '^.+\\.ts?$': 'ts-jest'
  },
  testEnvironment: 'node',
  testRegex: 'tests/.*\\.(test|spec)?\\.(ts|tsx|js)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
EOF
```




# Resources
https://medium.com/@cb.yannick/functional-programming-with-typescript-part-1-3f7167a2c0ad
