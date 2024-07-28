# README

Example `hygen` templates to speed up project creation.  

TODO:

* Pass in an output path
* express should use npm install express-json-error-handler

Templates:

* Basic CLI
* Dockerised App
* TSOA
* Honeycomb
* NPX package.
* Module

## Use templates

```sh
npx hygen cli help
# create new project (make sure you're in 00_project_templates)
npx hygen cli new 99_test --docker

# recreate
HYGEN_OVERWRITE=1 npx hygen cli new 99_test --docker

# express
HYGEN_OVERWRITE=1 npx hygen express new 99_express --docker

# recreate with node18
HYGEN_OVERWRITE=1 npx hygen cli18 new 99_test18 --docker

# recreate with node20
HYGEN_OVERWRITE=1 npx hygen cli20 new 99_test20 --docker

# recreate express with node20
HYGEN_OVERWRITE=1 npx hygen express20 new 99_express20 --docker

# recreate express and tsoa with node20
HYGEN_OVERWRITE=1 npx hygen express_tsoa20 new 99_expresstsoa20 --docker

# recreate node20 package supporting esm/cjs
HYGEN_OVERWRITE=1 npx hygen package20_cjs_esm new 99_package20_cjs_esm
```

## Creating templates

```sh
# initialise a hygen project folder
npx hygen init self

# initialise a hygen basic project
npx hygen generator new project
```

```sh
# help for generators 
npx hygen generator help
```

## Resources

* 20_hygen example [here](../20_hygen/README.md)  
