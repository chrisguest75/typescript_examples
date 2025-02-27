# QUOKKA NODE20

Demonstrate using node v20 with Quokka in VSCode.

NOTES:

-   How do I know what version of typescript quokka is using?
    -   Quokka prints out the version of quokka being used. You can `nvm use` before loading `code`.
-   How do I print out in ts-node the version of typescript used to compile code? `ts-node -vvv`

TODO:

-   ts-node doesn't seem to respect the nvm version.

## Reason

Node20 has newer libraries and global functions over Node18.

-   Node20 Synopsis [here](https://nodejs.org/docs/latest-v20.x/api/synopsis.html)

## Starting

```sh
cd ./27_quokka_node20

nvm install

nvm use

npm install
cp ./.env.template .env

code .
```

## Transpile

You might want to transpile to check outputs.  

```sh
npm exec tsc ./quokka_generic_add.ts
```

## Run

```sh
# run with ts-node
npm run start

npm run start:verbose

npm run lint
npm exec -- eslint --print-config .eslintrc
```

## Created

```sh
npm install dotenv-quokka-plugin
npm install -D ts-node typescript @types/node

nvm use
node --version > .nvmrc

npm exec -- tsc --help
# create tsconfig.json
npx tsc --init --rootDir "." \
--esModuleInterop --resolveJsonModule --lib es6 \
--module commonjs --allowJs false --noImplicitAny true --sourceMap
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

## Resources

-   THE JAVASCRIPT PLAYGROUND IN YOUR EDITOR [here](https://quokkajs.com/)
-   jest-extended [here](https://jest-extended.jestcommunity.dev/docs/)
-   TypeScript Style Guide [here](https://mkosir.github.io/typescript-style-guide/)
-   https://www.npmjs.com/package/ts-node
-   https://typescript-eslint.io/getting-started
-   https://www.typescriptlang.org/tsconfig#strict
