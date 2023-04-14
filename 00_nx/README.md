# README

```json
  "scripts": {
    "nx": "node ./node_modules/@nrwl/cli/bin/nx.js",
    "start": "npm run nx serve",
    "build": "npm run nx build",
    "test": "npm run nx test",
    "lint": "npm run nx lint"
  },
```

```sh
# select in this directory
npx nx@latest init

node --version     

nvm use
npm install 

./nx build 01_basic_cmdline      

npm run nx reset        
npm run nx list   
npm run nx report        

npm run nx build 01_basic_cmdline   
npm run nx build 01_basic_cmdline --verbose


npx nx@latest



npm run nx graph

npm run nx run-many -t build

npm run start myapp --configuration=production 

npm run nx generate ./apps/01_basic_cmdline 





```





## Resources

https://nx.dev/recipes/adopting-nx/adding-to-monorepo


https://nx.dev/tutorials/package-based-repo-tutorial

https://nx.dev/community#plugin-directory

https://nx.dev/recipes/getting-started/set-up-a-new-workspace



An Nx workspace is a tool for developing and managing large-scale Angular applications and enterprise-level projects. Nx is an open-source toolkit developed by Nrwl, which provides a set of tools and guidelines for building, testing, and deploying complex Angular applications.

An Nx workspace provides a structured and standardized approach to development that helps developers build scalable and maintainable applications. It offers a set of features and tools such as code generators, test runners, and build tools that help developers to focus on the actual business logic of the application and not worry about the underlying infrastructure.

The Nx workspace uses a monorepo approach, which means that all the code, tests, and configuration for the project are stored in a single repository. This approach makes it easier to manage the project, keep track of changes, and share code between different applications.

In summary, an Nx workspace is a powerful tool that provides a structured and scalable approach to building Angular applications and enterprise-level projects.

https://stackoverflow.com/questions/57493902/does-nx-need-to-be-installed-globally-by-people-who-only-want-to-run-the-app-e



https://blog.nrwl.io/nx-and-node-microservices-b6df3cd1bad6


Going TypeStack with NX Monorepo and Docker (Part 1)
https://blog.devgenius.io/going-typestack-with-nx-monorepo-and-docker-part-1-d5ff257981f2

Nx affected…  https://github.com/gperdomor/nx-tools/tree/main/packages/nx-docker


https://nx.dev/getting-started/nx-and-typescript


Nx core - https://nx.dev/core-tutorial


Nx - https://nx.dev/getting-started/intro


Nx - https://dev.to/nx/nx-the-fastest-growing-monorepo-solution-in-the-js-ecosystem-5en9



https://docs.volta.sh/guide/getting-started
