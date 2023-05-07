# README

Explain how NX works in this repo.  

TODO:

* Can I support different versions of node?
* I need to get the base and  head commits working.
* Find the affected projects and build them individually.
* Fix the audits for each project.  
* Fix the docker file issues.  
* Is there a way to template the project.json?
* Targetted builds.
* What is new in version 16? https://github.com/nrwl/nx/discussions/12836

## NX

An Nx workspace is a tool for developing and managing large-scale Angular applications and enterprise-level projects. Nx is an open-source toolkit developed by Nrwl, which provides a set of tools and guidelines for building, testing, and deploying complex Angular applications.

An Nx workspace provides a structured and standardized approach to development that helps developers build scalable and maintainable applications. It offers a set of features and tools such as code generators, test runners, and build tools that help developers to focus on the actual business logic of the application and not worry about the underlying infrastructure.

The Nx workspace uses a monorepo approach, which means that all the code, tests, and configuration for the project are stored in a single repository. This approach makes it easier to manage the project, keep track of changes, and share code between different applications.

In summary, an Nx workspace is a powerful tool that provides a structured and scalable approach to building Angular applications and enterprise-level projects.

## NOTES

* It is very sensitive to misconfiguration in `project.json` files.  If misconfigured `run-many` will hang.  
* Nx version 15.x.x requires version 16.16.x of node [here](https://nx.dev/packages/workspace/documents/nx-nodejs-typescript-version-matrix)  

### Installing node_modules for a project

To install node_modules you'll need to add a prebuild step that performs the install.  

```json
    "prebuild": "npm install",
```


```json
  "scripts": {
    "nx": "node ./node_modules/@nrwl/cli/bin/nx.js",
    "start": "npm run nx serve",
    "build": "npm run nx build",
    "test": "npm run nx test",
    "lint": "npm run nx lint"
  },
```

## Prepare

```sh
# select in this directory
npx nx@latest init

node --version

nvm use
npm install 
```

## Use

```sh
./nx --help
npx nx@latest --help

npx nx@latest show projects

# build all https://nx.dev/packages/nx/documents/run-many
# this is based on the prebuild step
./nx run-many -t build --all              

./nx run 01_basic_cmdline:clean
./nx run 01_basic_cmdline:test
./nx run 01_basic_cmdline:build

# environment reports
npx nx@latest report

npx nx@latest list  

# show webpage
npx nx@latest graph

./nx run 01_basic_cmdline      
./nx run 01_basic_cmdline:clean
```

## Terraform example

```sh
./nx run terraform_example:plan 
./nx run terraform_example:apply
./nx run terraform_example:destroy
```



```sh
./nx affected --target=plan --with-deps --filter=category:terraform
./nx affected --target=plan --with-deps --filter=category:node14
```





```sh
npm run nx reset

npm run nx build 01_basic_cmdline   
npm run nx build 01_basic_cmdline --verbose




npm run start myapp --configuration=production 

npm run nx generate ./apps/01_basic_cmdline 
```


## Resources

* Adding Nx to NPM/Yarn/PNPM Workspace [here](https://nx.dev/recipes/adopting-nx/adding-to-monorepo)  
* Getting Started with Package-Based Repos [here](https://nx.dev/tutorials/package-based-repo-tutorial)  
* Set up a New Nx Workspace [here](https://nx.dev/recipes/getting-started/set-up-a-new-workspace)
* Going TypeStack with NX Monorepo and Docker (Part 1) [here](https://blog.devgenius.io/going-typestack-with-nx-monorepo-and-docker-part-1-d5ff257981f2)
* Nx and Node Microservices [here](https://blog.nrwl.io/nx-and-node-microservices-b6df3cd1bad6)
* Configuring CI Using GitHub Actions and Nx [here](https://nx.dev/recipes/ci/monorepo-ci-github-actions)
* Nx Core Tutorial [here](https://nx.dev/core-tutorial)  
* The fastest growing monorepo solution in the JS ecosystem [here](https://dev.to/nx/nx-the-fastest-growing-monorepo-solution-in-the-js-ecosystem-5en9)  
* Setting Up A DevOps Pipeline With Nx [here](https://christianlydemann.com/setting-up-a-devops-pipeline-with-nx/)  

https://github.com/nrwl/nx-set-shas

https://nx.dev/community#plugin-directory

https://stackoverflow.com/questions/57493902/does-nx-need-to-be-installed-globally-by-people-who-only-want-to-run-the-app-e

Nx affected…  https://github.com/gperdomor/nx-tools/tree/main/packages/nx-docker

https://nx.dev/getting-started/nx-and-typescript

Nx - https://nx.dev/getting-started/intro

https://docs.volta.sh/guide/getting-started
