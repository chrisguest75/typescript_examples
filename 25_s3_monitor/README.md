# README

Demonstrate using S3 api to monitor a bucket for new files.  

TODO:

* Default json response instead of html - https://simonplend.com/how-to-create-an-error-handler-for-your-express-api/
https://www.npmjs.com/package/express-json-error-handler
https://simonplend.com/express-uses-finalhandler-for-the-default-error-handler/
* Rebuild with skaffold
* Add skaffold tests
* logger objects correlationids
* AWS mock https://www.npmjs.com/package/aws-sdk-mock

NOTES:

* This uses a polling approach and looks for sequential files.  
* A better approach might be to use the Events API.  

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
curl -s http://localhost:8000/buckets/watch/bucketname/path | jq .

# sync files 
curl -s http://localhost:8000/buckets/sync/bucketname/test

# find copied files
curl -s http://localhost:8000/buckets/list/bucketname/test | jq .     
```

## Build

```sh
# set profile
export AWS_PROFILE=myprofile
export AWS_REGION=us-east-1

# build the image (with hardcoded profile for skaffold)
docker buildx build --no-cache --progress=plain --build-arg AWS_PROFILE=$AWS_PROFILE --build-arg AWS_REGION=$AWS_REGION --build-context profile=/Users/${USER}/.aws -t awscli . 
```

## Skaffold

```sh
# run skaffold
npm run skaffold:start      
```

Once you have `skaffold` running you can go and make edits and see the rebuild and deploy.  

## Resources

* s3_getobject.js example [here](https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javascriptv3/example_code/s3/src/s3_getobject.js)
* [skaffold.dev](https://skaffold.dev/)  
* Working with [local-cluster](https://skaffold.dev/docs/environment/local-cluster/)  
* skaffold.yaml [here](https://skaffold.dev/docs/references/yaml/)  
* settimeout-setinterval [here](https://javascript.info/settimeout-setinterval)
* s3-sync-client repo [here](https://github.com/jeanbmar/s3-sync-client)
* s3-sync-client npm [here](https://www.npmjs.com/package/s3-sync-client)


https://zellwk.com/blog/endpoint-testing/

https://github.com/visionmedia/supertest

https://stackoverflow.com/questions/34138358/why-use-supertest-instead-of-unit-tests-for-expressjs

https://medium.com/@iamfaisalkhatri/api-testing-using-supertest-ea37522fa329


https://www.npmjs.com/package/aws-sdk-mock

https://github.com/visionmedia/supertest/issues/261
https://nodejs.org/docs/latest-v16.x/api/perf_hooks.html



https://github.com/visionmedia/supertest/issues/141