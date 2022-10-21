
TODO:

* debug locally 
* debug in docker 
* ensure source is same locally as in container.





npm run docker:run:debug 
docker run -it --rm -p 9229:9229 --name 28_debugging 28_debugging --inspect-brk=0.0.0.0:9229 /work/src/index.js

docker exec -it 28_debugging /busybox/sh


https://stackoverflow.com/questions/36463501/how-to-remotely-debug-node-js-app-with-source-maps-using-webstorm



            "localRoot": "${workspaceFolder}",
            "remoteRoot": "/work",

https://itnext.io/using-sourcemaps-on-production-without-revealing-the-source-code-%EF%B8%8F-d41e78e20c89

debug console
Could not read source map for file:///work/src/index.js: ENOENT: no such file or directory, open '"git root"/28_debugging/src/index.js.map'