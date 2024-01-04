# README

A set of simple Typescript examples.

## Conventional Commits

NOTE: This repo has switched to [conventional commits](https://www.conventionalcommits.org/en/v1.0.0). It requires `pre-commit` and `commitizen` to help with controlling this.  

```sh
# install pre-commmit (prerequisite for commitizen)
brew install pre-commit
brew install commitizen
# conventional commits extension
code --install-extension vivaxy.vscode-conventional-commits
```

## Contents

- [README](#readme)
  - [Conventional Commits](#conventional-commits)
  - [Contents](#contents)
  - [Snippets](#snippets)
  - [Troubleshooting](#troubleshooting)
  - [Github Actions](#github-actions)
  - [NX](#nx)
  - [Upgrading](#upgrading)
  - [00 - Project templates using hygen](#00---project-templates-using-hygen)
  - [01 - Basic cmdline](#01---basic-cmdline)
  - [02 - Templating](#02---templating)
  - [03 - Testing](#03---testing)
  - [05 - Promises](#05---promises)
  - [06 - Dockerise Browser based Typescript](#06---dockerise-browser-based-typescript)
  - [08 - Use pino logger in typescript](#08---use-pino-logger-in-typescript)
  - [09 - Publish npm package for use as npx](#09---publish-npm-package-for-use-as-npx)
  - [11 - Simple swagger typescript](#11---simple-swagger-typescript)
  - [12 - Buildpack](#12---buildpack)
  - [13 - Echo Service using TSOA](#13---echo-service-using-tsoa)
  - [15 - Demoscene Banner](#15---demoscene-banner)
  - [16 - OpenTelemetry Honeycomb](#16---opentelemetry-honeycomb)
  - [17 - Redis](#17---redis)
  - [20 - Hygen Templates](#20---hygen-templates)
  - [21 - JSON Schema](#21---json-schema)
  - [23 - Faking json data](#23---faking-json-data)
  - [24 - Packages](#24---packages)
  - [26 - Job Server](#26---job-server)
  - [27 - quokka](#27---quokka)
  - [28 - container debugging](#28---container-debugging)
  - [29 - container debugging for express](#29---container-debugging-for-express)
  - [30 - dockerignore filter commit](#30---dockerignore-filter-commit)
  - [32 - scripting AWS](#32---scripting-aws)
  - [Resources](#resources)

## Snippets

Useful snippets to help

## Troubleshooting

If having trouble with `nvm use` with xcode crashing with exceptions.

```sh
xcodebuild -runFirstLaunch
```

## Github Actions

Actions help [.github/ACTIONS.md](.github/ACTIONS.md)  

## NX

NX help [00_nx/README.md](./00_nx/README.md)  

## Upgrading

If we're upgrading NPM packages there's some advice in [UPGRADING.md](UPGRADING.md)  

## 00 - Project templates using hygen

Example `hygen` templates to speed up project creation.  
[README.md](./00_project_templates/README.md)  

## 01 - Basic cmdline

Demonstrates a simple cmdline application (copy these steps)  
[README.md](./01_basic_cmdline/README.md)  

## 02 - Templating

Demonstrates how to use typescript to template a file  
[README.md](./02_templating/README.md)  

## 03 - Testing

Demonstrates how to test typescript code (including debugging)  
[README.md](./03_jest_testing/README.md)  

## 05 - Promises

Demonstrates how to use promises  
[README.md](./05_promises/README.md)  

## 06 - Dockerise Browser based Typescript

Demonstrate how to build a docker container containing typescript transpiled application  
[README.md](./06_dockerise_browser_typescript/README.md)  

## 08 - Use pino logger in typescript

Demonstrates how to use pino logger in typescript  
[README.md](./08_pino_logger/README.md)  

## 09 - Publish npm package for use as npx

Demonstrates how to package a typescript tool to npm to be run as npx  
[README.md](./09_shell_mandelbrot/README.md)  

## 11 - Simple swagger typescript

Demonstrates a simple swagger interface  
[README.md](./11_simple_swagger/README.md)  

## 12 - Buildpack

Demonstrates a simple cmdline application packaged in a buildpack  
[README.md](./12_buildpack/README.md)  

## 13 - Echo Service using TSOA

Demonstrates a simple echo service using TSOA  
[README.md](./13_echo_service/README.md)  

## 15 - Demoscene Banner

Demonstrate creating a ascii banner from an old demoscene font.  
[README.md](./15_demoscene_banner/README.md)  

## 16 - OpenTelemetry Honeycomb

Demonstrate using opentelemetry with a simple cli tool  
[README.md](./16_honeycomb/README.md)  

## 17 - Redis

Demonstrate how to connect and use `Redis` from typescript  
[README.md](./17_redis/README.md)  

## 20 - Hygen Templates

Demonstrate how to use `hygen` as a template.  
[README.md](./20_hygen/README.md)  

## 21 - JSON Schema

Demonstrate how to work `JSONSchema` to validate and generate types.  
[README.md](./21_jsonschema/README.md)  

## 23 - Faking json data

Demonstrates generating fake json data.  
[README.md](./23_faking_json_data/README.md)  

## 24 - Packages

Demonstrate some examples of how to develop and use custom packages.  
[README.md](./24_packages/README.md)  

## 26 - Job Server

Demonstrates building a job monitor in an express server.  
[README.md](./26_jobserver/README.md)  

## 27 - quokka

Demonstrate some `quokka` examples  
[README.md](./27_quokka/README.md)  

## 28 - container debugging

Demonstrate how to debug typescript applications in the container.  
[README.md](./28_debugging/README.md)  

## 29 - container debugging for express

Demonstrate how to debug typescript `express` applications in the container.  
[README.md](./29_express_debugging/README.md)  

## 30 - dockerignore filter commit

Demonstrate checking if a commit should trigger docker build  
[README.md](./30_commit_trigger_checker/README.md)  

## 32 - scripting AWS

Demonstrate examples of using TS as a language for scripting against AWS.  
[README.md](./32_scripting_aws/README.md)  

## Resources

* [typescript book](https://basarat.gitbook.io/typescript/)  
