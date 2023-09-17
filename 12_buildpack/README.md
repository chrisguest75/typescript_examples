# README

Demonstrates a simple cmdline application packaged in a buildpack.  

Based on [43_python_buildpacks](https://github.com/chrisguest75/docker_build_examples/tree/master/43_python_buildpacks) and [buildpack-samples](https://github.com/GoogleCloudPlatform/buildpack-samples)  

## Reason

Buildpacks are a concept primarily associated with Platform as a Service (PaaS) solutions like Heroku and Cloud Foundry. They are designed to transform application source code into a runnable image, often for a containerized environment.  

Here's a breakdown of what buildpacks do and their main components:

* Automate the Build Process: When you deploy code to platforms like Heroku, you don't specify how the environment should be set up or how the code should be compiled. Instead, the platform detects what kind of application you're deploying (e.g., a Ruby, Node.js, or Python app) and uses the appropriate buildpack to compile it and create a runnable instance.  

* Language and Framework Detection: Each buildpack is tailored for a specific language or framework. When you push code to the platform, it detects which buildpack is suitable for your codebase. For example, if you push a project with a Gemfile, the Ruby buildpack might be chosen.  

* Lifecyle Phases: The buildpack generally operates in two phases:
  * Detect: Determines if a particular buildpack should be applied to the given source code.
  * Compile (or Build): If the buildpack is appropriate for the source code, this phase installs dependencies, compiles any necessary assets, and prepares the application for execution.  

* Vendoring Dependencies: Instead of relying on global installations, buildpacks often "vendor" or bundle the specific versions of dependencies required for an application. This ensures that the application has everything it needs to run, without external dependencies.  

* Container Compatibility: With the rise of containerization and platforms like Kubernetes, the Cloud Native Buildpacks initiative has evolved to ensure buildpacks produce OCI (Open Container Initiative) compliant container images, which can be run on any platform that supports containers.  

* Modularity and Customization: While there are many official and community-supported buildpacks available, organizations can also create custom buildpacks tailored to their specific needs.

Benefits:

* Consistency: Applications are built consistently regardless of where a developer's local environment might differ from others or from the production environment.
* Separation of Concerns: Developers can focus on writing code, while operators can maintain buildpacks that handle environment concerns, security patches, and other operational details.
* Security: Regularly updated buildpacks can ensure that applications are compiled and run with the latest patched dependencies, reducing the risk of vulnerabilities.

In summary, buildpacks provide a consistent and automated way to go from source code to a runnable application instance, abstracting away many of the environment and dependency management tasks that developers otherwise would need to handle manually.

## 📋 Prerequisites

Installing pack cli tool [instructions](https://buildpacks.io/docs/tools/pack/)

```sh
#macosx or linux 
brew install buildpacks/tap/pack
```

## How to run

```sh
npm install
npm run start:dev
```

## How to create buildpack

Uses postinstall to compile typescript.  

```json
  // specifies buildpack version of node to use inside package.json  
  "engines": {
    "node": "18.13.0"
  } 
```

Build the image

```sh
# build the image
pack build tsbuildpackexample --builder gcr.io/buildpacks/builder --env GOOGLE_ENTRYPOINT="node ./build/index.js"  
# or 
./nx run 12_buildpack:pack

# run 
docker run tsbuildpackexample
# or
./nx run 12_buildpack:start:pack
```

## How to recreate

Create folder  

```sh
mkdir xx_project_name
```

Setup typescript for a basic nodejs project

```sh
npm init -y   
npm install typescript @types/node ts-node nodemon rimraf --save-dev  

# get typescript version
./node_modules/typescript/bin/tsc --version 

# create tsconfig.json
npx tsc --init --rootDir src --outDir build \
--esModuleInterop --resolveJsonModule --lib es6 \
--module commonjs --allowJs true --noImplicitAny true
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
    "postinstall": "tsc --build",
    "build": "rimraf ./build && tsc",
    "lint": "eslint . --ext .ts",
    "start:dev": "nodemon",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

```sh
#add the nodemon.json and run
npm run start:dev
```

## Resources

* [google samples](https://github.com/GoogleCloudPlatform/buildpack-samples)  
* [heroku typescript](https://github.com/heroku/buildpacks-nodejs/blob/main/buildpacks/typescript/README.md)  
