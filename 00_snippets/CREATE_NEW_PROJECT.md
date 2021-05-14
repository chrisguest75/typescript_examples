# README
 
## Create folder
```sh
mkdir xx_project_name
```

## How to build
Setup typescript for a basic nodejs project
```sh
npm init -y   
npm install typescript @types/node ts-node nodemon rimraf --save-dev  

npx tsc --init --rootDir src --outDir build \
--esModuleInterop --resolveJsonModule --lib es6 \
--module commonjs --allowJs true --noImplicitAny true
```

```sh
#copy a nodemon.json and run
npm run start:dev
```

# Add linting 
Add a basic linter

```sh
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

# add an .eslintrc
```

## Debugging 
Add a tasks file that is for npm "tsc: build - 07_results_to_slack/tsconfig.json"  

Add a prelaunch task to transpile the code.  
```json
    "preLaunchTask": "tsc: build - 04_git_analysis/tsconfig.json",
```