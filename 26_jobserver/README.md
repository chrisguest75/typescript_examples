# README

Demonstrates building a job monitor in an express server.  

TODO:

* Add a pub sub to queue requests and allow progress to be reported.
* Work can be counting files in a folder.
* Create a gui to submit the folders.  
* Get progress buttons.  

## How to run

```sh
npm install

# run targets
npm run start:dev

curl http://localhost:8000/

npm run test
npm run lint
```

```sh
curl http://localhost:8000/
curl http://localhost:8000/ping
curl http://localhost:8000/sleep?wait=1000

curl http://localhost:8000/jobs
curl -L http://localhost:8000/jobs
```

## Resources

https://www.npmjs.com/package/pubsub-js

https://www.uuidgenerator.net/dev-corner/typescript
