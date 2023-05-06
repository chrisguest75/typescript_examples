# README

Demonstrates a simple Cypress test in Typescript  
Node Cypress Example [here](https://github.com/chrisguest75/nodejs_examples/tree/master/12_cypress)  

TODO:  

* dockerise these tests

## How to run

```sh
npm install

# run targets
npm run test
npm run lint
```

## Testing

```sh
npm install cypress --save-dev   

$(npm bin)/cypress info

# creates js tests
$(npm bin)/cypress open
$(npm bin)/cypress run
```

Add more targets to `scripts` section in `package.json`

```js
  "scripts": {
    "cypress:run:chrome": "cypress run --headed --browser chrome",
    "cypress:run": "cypress run",
  },
```

```sh
npm run cypress:run   
```

## Resources

* Cypress TypeScript [here](https://docs.cypress.io/guides/tooling/typescript-support#Install-TypeScript)  
* Distributed system observability: Instrument Cypress tests with OpenTelemetry [here](https://automationrhapsody.com/distributed-system-observability-instrument-cypress-tests-with-opentelemetry/)
* cypress-io/cypress-and-jest-typescript-example repo [here](https://github.com/cypress-io/cypress-and-jest-typescript-example)
* Cypress TypeScript Deep Dive [here](https://basarat.gitbook.io/typescript/intro-1/cypress)  
