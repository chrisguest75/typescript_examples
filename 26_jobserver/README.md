# README

Demonstrates building a job monitor in an express server.  

Use an example RESTApi to take in a path to search and produce md5 values for each file discovered. We use an internal loop to keep processing a list of new entries. The md5s are calculated an progress can be checked.  

TODO:

* Add a more time consuming external process
* Plugins?
* OTEL?
* JSONSchema validation.
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

# submit a job "directory to processs"
curl -s -L -X POST -H "Content-Type: application/json" -d '{ "path":"./routes" }' http://localhost:8000/job/start | jq . 

# get job progress and repeatedly invoke to get status
curl -s -L -X GET  http://localhost:8000/job/progress | jq .

# get progress of individual job.
curl -s -L -X GET  http://localhost:8000/job/progress/dc59a552-66b4-459a-b48f-c7e2532da614 | jq .
```

## Resources

* PubSubJS is a topic-based publish/subscribe library written in JavaScript. [here](https://www.npmjs.com/package/pubsub-js)
* Generate a UUID in TypeScript [here](https://www.uuidgenerator.net/dev-corner/typescript)
* mroderick/PubSubJS repo [here](https://github.com/mroderick/PubSubJS)
