# README

Demonstrate how to get a `jupyter` server running  

Copied from [chrisguest75/sysadmin_examples](https://github.com/chrisguest75/sysadmin_examples/tree/master/17_jupyter)  

TODO:  

* add sdk packages with nom 
* ```jupyter nbconvert First\ Notebook.ipynb --to pdf```
* ```jupyter nbextension install EXTENSION_NAME```

## Build

```sh
# build
docker build -f Dockerfile.typescript --progress=plain -t jupyter .

# run
docker run --volume /Users/${USER}/.aws:/root/.aws --volume $(pwd)/books:/workbench/books --env AWS_PROFILE=${AWS_PROFILE} -d --name jupyter --rm -p 8888:8888 jupyter   

# get the token 
docker logs jupyter

# open docker notebook
open http://localhost:8888/notebooks/First%20Notebook.ipynb#

# stop 
docker stop jupyter

# debug
docker run --rm -d --name jupyter --entrypoint "/bin/bash" --rm -p 8888:8888 jupyter -c 'sleep 10000'
docker exec -u root -it jupyter /bin/bash   
docker stop jupyter 

docker run -it --name jupyter -u root --entrypoint /bin/bash --rm -p 8888:8888 jupyter  
```

## Resources

* The Jupyter Notebook [here](https://jupyter-notebook.readthedocs.io/en/stable/notebook.html)  
* Jupyter Notebook: An Introduction [here](https://realpython.com/jupyter-notebook-introduction/)  
* n-riesco/ijavascript [here](https://github.com/n-riesco/ijavascript)
* winnekes/itypescript [here](https://github.com/winnekes/itypescript)  
* yunabe/tslab [here](https://github.com/yunabe/tslab)
* nvm-sh/nvm [here](https://github.com/nvm-sh/nvm)

* Warning message shown: Configuraiton not found [here](https://github.com/winnekes/itypescript/issues/33)
* Can't parse tsconfig.json but tsc can parse it [here](https://github.com/winnekes/itypescript/issues/10)


import { S3Client, ListBucketsCommand, ListObjectsCommand } from '@aws-sdk/client-s3'

