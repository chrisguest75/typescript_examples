# README

Example `hygen` templates to speed up project creation.  

TODO:

* Pass in an output path

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
# create new project
npx hygen cli new 99_test --docker

# recreate
HYGEN_OVERWRITE=1 npx hygen cli new 99_test --docker
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
