# README
A tool to post testresults to Slack.

Based on [01_basic_cmdline](../01_basic_cmdline/README.md)  

## Run it
```sh
# install
npm install
```

Local build and development
```sh
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

# Test
Test the container will work.  
```sh
# create a file container to share the file in without a volume mount.
docker create -v /results --name results alpine:3.4 /bin/true
docker cp ./kuttl-test-failing.xml results:/results
# 
docker run -it -e ENVIRONMENT=test -e XML_FILE=/results/kuttl-test-failing.xml -e SLACK_POST=${SLACK_POST} -e SLACK_CHANNEL="#channel" -e POST_TO_SLACK=true --volumes-from results --name results2slack chrisguest/results2slack:latest
```



## Notes
