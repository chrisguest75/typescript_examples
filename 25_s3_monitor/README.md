# README

Demonstrate using S3 api to monitor a bucket for new files.  

TODO:

* Mocking the pino logger.  
* Default json response instead of html - https://simonplend.com/how-to-create-an-error-handler-for-your-express-api/
https://www.npmjs.com/package/express-json-error-handler
https://simonplend.com/express-uses-finalhandler-for-the-default-error-handler/
https://expressjs.com/en/guide/error-handling.html

* Rebuild with skaffold
* Add skaffold tests
* logger objects correlationids
* AWS mock https://www.npmjs.com/package/aws-sdk-mock
    https://sinonjs.org/
https://aws.amazon.com/blogs/developer/mocking-modular-aws-sdk-for-javascript-v3-in-unit-tests/

NOTES:

* This uses a polling approach and looks for sequential files.  
* A better approach might be to use the Events API.  

## How to run

```sh
npm install

# run targets
npm run start:dev

curl http://localhost:8000/

# tests are not mocked :-(
. ./.env
export AWS_PROFILE=myprofile
export BUCKETNAME=mybucket
export BUCKETPATH=a_path_on_bucket
npm run test
npm run lint
```

```sh
curl http://localhost:8000/
curl http://localhost:8000/ping
curl http://localhost:8000/sleep?wait=1000

# list buckets
curl -s http://localhost:8000/buckets/list | jq . 
curl -s http://localhost:8000/buckets/list | jq --arg name "${BUCKETNAME}" '.names[] | select(.Name == $name)'

# watch bucket
curl -s "http://localhost:8000/buckets/watch/${BUCKETNAME}/${BUCKETPATH}" | jq .

# sync files 
curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" http://localhost:8000/buckets/sync -d "{ \"sourcePath\": \"./sync\", \"bucketName\": \"${BUCKETNAME}\", \"bucketPath\": \"${BUCKETPATH}\"}"

# create files
file="file"
extension="txt"
outpath="./sync/"
mkdir -p ${outpath}
for index in $(seq 0 10); 
do
    filepath=`printf %s%s%04d.%s ${outpath} ${file} ${index} ${extension}`
    echo "Creating ${filepath}"
    touch $filepath
    curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" http://localhost:8000/buckets/sync -d "{ \"sourcePath\": \"./sync\", \"bucketName\": \"${BUCKETNAME}\", \"bucketPath\": \"${BUCKETPATH}\"}"  
    sleep 1
done

# find copied files
curl -s "http://localhost:8000/buckets/list/${BUCKETNAME}/${BUCKETPATH}" | jq .     
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

## Jest Tricks

```bash
# little trick for dotenv files to be exported.
set -a
. ./.env
set +a

# run a command in the npm environment
npm run env -- jest

# filter tests
npm run env -- jest 'tests/integration'         
```

## Resources

* s3_getobject.js example [here](https://github.com/awsdocs/aws-doc-sdk-examples/blob/main/javascriptv3/example_code/s3/src/s3_getobject.js)
* [skaffold.dev](https://skaffold.dev/)  
* Working with [local-cluster](https://skaffold.dev/docs/environment/local-cluster/)  
* skaffold.yaml [here](https://skaffold.dev/docs/references/yaml/)  
* settimeout-setinterval [here](https://javascript.info/settimeout-setinterval)
* s3-sync-client repo [here](https://github.com/jeanbmar/s3-sync-client)
* s3-sync-client npm [here](https://www.npmjs.com/package/s3-sync-client)

* Endpoint testing with Jest and Supertest [here](https://zellwk.com/blog/endpoint-testing/)
* visionmedia/supertest repo [here](https://github.com/visionmedia/supertest)
* Why use supertest instead of unit tests for expressJS? [here](https://stackoverflow.com/questions/34138358/why-use-supertest-instead-of-unit-tests-for-expressjs)
* API Testing using SuperTest! [here](https://medium.com/@iamfaisalkhatri/api-testing-using-supertest-ea37522fa329)
* Performance measurement APIs [here](https://nodejs.org/docs/latest-v16.x/api/perf_hooks.html)
* aws-sdk-mock npm [here](https://www.npmjs.com/package/aws-sdk-mock)

* How do I get response time for each request? [here](https://github.com/visionmedia/supertest/issues/261)
* double callback! warning [here](https://github.com/visionmedia/supertest/issues/141)
* Set environment variables from file of key/value pairs [here](https://stackoverflow.com/questions/19331497/set-environment-variables-from-file-of-key-value-pairs/30969768#30969768)
