# README

Demonstrate how to work `JSONSchema` to validate and generate types.  

TODO:

* Generate schema from a json document
* Tools to generate schema.
* json-schema-faker

## How to run

```sh
nvm use
npm install

# run targets
npm run start:dev
npm run test
npm run lint
```

## Tooling

Use `json-schema-generator` to generate a template schema.  
NOTE: The schema generated is basic and can only work off data given.  

```sh
# install it
npm install json-schema-generator 

# show help
./node_modules/.bin/json-schema-generator 

# geenrate a template schema
./node_modules/.bin/json-schema-generator ./json/pokemon.json -o ./schema/pokemon.sc
hema.json

# generate (if you change the json document it will fail validation)
npm run start:dev
```

## Created

```sh
npm install json-schema-to-typescript jsonschema --save 
```

## Convert to Typescript

```sh
cat ./json/transcript.schema.json | ./node_modules/.bin/json2ts > ./transcript.d.ts
```

## Resources

* Specification [here](https://json-schema.org/specification.html)
* JSON Schemas as a First class Type in Typescript [here](https://medium.com/@realnoam/json-schemas-as-a-first-class-type-in-typescript-a2ff31ae9bc)
* Align TypeScript Standards With JSON Schema [here](https://blog.dennisokeeffe.com/blog/2020-09-20-json-schema-to-ts)
* Generate jsonschema from js [here](https://app.quicktype.io/)
* json-schema-generator repo [here](https://github.com/krg7880/json-schema-generator)
