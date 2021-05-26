# README
A tool to post testresults to Slack.

Processes an xunit file and send a message to Slack containing the failures. 

Based on [01_basic_cmdline](../01_basic_cmdline/README.md)  

## Run it
```sh
# install
npm install
```

Local build and development

```sh
# configure the .env file by copying the .env.template file
ENVIRONMENT=environment
XML_FILE=./kuttl-test.xml 
SLACK_POST=https://hooks.slack.com/services/TOKEN
SLACK_CHANNEL=\#channel_name
POST_TO_SLACK=false

# run it locally
npm run start
```

Docker build and development
```sh
# build container container
npm run build:image
# run it from an image
npm run start:image
```

## Test
Test the container will work.  
```sh
# create a file container to share the file in without a volume mount.
docker create -v /results --name results alpine:3.4 /bin/true
docker cp ./kuttl-test-failing.xml results:/results
# 
docker run -it -e ENVIRONMENT=test -e XML_FILE=/results/kuttl-test-failing.xml -e SLACK_POST=${SLACK_POST} -e SLACK_CHANNEL="#channel" -e POST_TO_SLACK=true --volumes-from results --name results2slack chrisguest/results2slack:latest
```

## Publish
```sh
# container is published on dockerhub
docker push chrisguest/results2slack:latest
```
## Notes
Based on turn posting to Slack [here](https://github.com/chrisguest75/turn)  
