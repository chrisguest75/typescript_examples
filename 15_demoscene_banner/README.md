# README

Demonstrate creating a ascii banner from an old demoscene font.

Based on this Python Service [here](https://github.com/chrisguest75/banner_service)  

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

```sh
npm install image-js 

brew install graphicsmagick

npm install --save image-to-ascii    

brew install jp2a  

```

## Debugging

Add a tasks file that is for npm "tsc: build - 15_demoscene_banner/tsconfig.json"  

Add a prelaunch task to transpile the code.  

```json
    "preLaunchTask": "tsc: build - 15_demoscene_banner/tsconfig.json",
```

## Patching image-js

```sh
# edit the types file 15_demoscene_banner/node_modules/image-js/index.d.ts

# Add the insert prototype 
insert(toInsert: Image, options: object?): Image;

# create a patch file
npx patch-package image-js        

# applying a patch
patch -p1 -i patches/image-js+0.33.1.patch    
# git apply only works for files in index.
git apply --ignore-whitespace patches/image-js+0.33.1.patch      

```



docker run -it --rm --entrypoint /bin/sh node:14.15.4-alpine
docker run -it --rm --entrypoint /bin/sh node:14.18.1-bullseye


## Resources

* https://www.npmjs.com/package/image-to-ascii
* https://www.npmjs.com/package/image-js
* https://github.com/ianhan/BitmapFonts
* http://www.graphicsmagick.org/
