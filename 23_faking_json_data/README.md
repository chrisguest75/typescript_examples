# README

Demonstrates generating fake json data.  

TODO:

* add some basic tests
* control random generator types using falso
* It seems that date types are not being honoured correctly

## How to run

```sh
nvm use
npm install

# run targets
npm run start:dev
npm run test
npm run lint

# docker build
npm run docker:build

# runs the container and will drop a file in a local out folder.
npm run docker:run
# skips the build if you are only changing options in scripts
npm run docker:runonly

# run with command
npm run docker:runwith -- --type=files --append --count=1000 --out=/work/local/out --mongo
npm run docker:runwith -- --type=fromschema --in=/work/local/schema/transcript.schema.json  --out=/work/local/out --mongo --count=2
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

## Resources

* My basic typecript cmdline [01_basic_cmdline](https://github.com/chrisguest75/typescript_examples/tree/master/01_basic_cmdline)
* falso [here](https://netbasal.com/generate-fake-data-in-the-browser-and-node-js-using-falso-3998d2bcbaaf)
* falso getting started [here](https://ngneat.github.io/falso/docs/getting-started/)
* falso examples [here](https://ngneat.github.io/falso/docs/general/#randboolean)
* faker-js repo [here](https://github.com/faker-js/faker)
* json-schema-faker repo [here](https://github.com/json-schema-faker/json-schema-faker)
