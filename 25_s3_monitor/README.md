# README

Demonstrate using S3 api to monitor a bucket for new files.

TODO:

* Run a one off list of the bucket
* Add a watcher object
* Check list of objects for new files - add files to an array.
* Return a list of new files. 
* send files over websocket




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

# list buckets
curl -s http://localhost:8000/buckets | jq . 

# watch bucket
curl -s http://localhost:8000/buckets/watch/bucketname | jq .
```

## Resources

* https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javascriptv3/example_code/s3/src/s3_getobject.js

