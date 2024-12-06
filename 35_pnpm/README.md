# PNPM

Demonstrates how to upgrade a project to PNPM.  

## How to run

```sh
nvm use
npm install

# use typescript compiler
npm run tsc -- --version  

# run targets
npm run start:dev
npm run test
npm run lint

# docker build
npm run docker:build
npm run docker:run
```

## Install PNPM

```sh
brew info pnpm
brew install pnpm
```

## Resources

* pnpm - Fast, disk space efficient package manager [here](https://pnpm.io)
* How to migrate from yarn / npm to pnpm [here](https://dev.to/andreychernykh/yarn-npm-to-pnpm-migration-guide-2n04)  
