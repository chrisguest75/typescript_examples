# README

Demonstrate how to get a `jupyter` server running  

Copied from [chrisguest75/sysadmin_examples](https://github.com/chrisguest75/sysadmin_examples/tree/master/17_jupyter)  

TODO:  

* Install kernel
* add sdk packages with nom 
* ```jupyter nbconvert First\ Notebook.ipynb --to pdf```
* ```jupyter nbextension install EXTENSION_NAME```

## Setting up with pipenv and pyenv

```sh
export PIPENV_VENV_IN_PROJECT=1
pyenv install --list
pyenv install 3.9.2
pyenv local 3.9.2

# or use pipenv to create virtual env.  
pipenv install --python $(pyenv which python)        

#pipenv --rm
# switching into venv 
pipenv shell
# or
source ./.venv/bin/activate

# after adding packages
pipenv lock -r > requirements.txt  
```

## Install

```sh
pipenv install jupyter
```

## Run

```sh
# run the server
jupyter notebook

# open the notebook
open http://localhost:8888/notebooks/First%20Notebook.ipynb#
```

## Build

```sh
# build
docker build -f Dockerfile.typescript --progress=plain -t jupyter .

# run
docker run -d --name jupyter --rm -p 8888:8888 jupyter   

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

## Add a kernel (csharp & powershell)

```sh
# add csharp
docker build --no-cache -t jupytercsharp -f Dockerfile.csharp .
docker build --progress=plain --no-cache -t jupytercsharp -f Dockerfile.csharp .

docker run --name jupytercsharp --rm -d -p 8888:8888 jupytercsharp  
docker run -v $(pwd)/books:/workbench/books --name jupytercsharp --rm -d -p 8888:8888 jupytercsharp  

# get the token 
docker logs jupytercsharp

# stop 
docker stop jupytercsharp

docker run --rm -it --name jupytercsharp --entrypoint "/bin/bash" -p 8888:8888 jupytercsharp
```

## Resources

* The Jupyter Notebook [here](https://jupyter-notebook.readthedocs.io/en/stable/notebook.html)  
* Jupyter Notebook: An Introduction [here](https://realpython.com/jupyter-notebook-introduction/)  
* Docker PowerShell Jupyter Notebook Environments [here](https://blog.darrenjrobinson.com/docker-powershell-jupyter-notebook-environments/)
* Getting started with Local PowerShell Jupyter Notebook [here](https://blog.darrenjrobinson.com/getting-started-with-local-powershell-jupyter-notebook/)
* csharp-notebook/travis-ci/Dockerfile_build [here](https://github.com/tlinnet/csharp-notebook/blob/master/travis-ci/Dockerfile_build)
* Dotnet Interactive versions [here](https://pkgs.dev.azure.com/dnceng/9ee6d478-d288-47f7-aacc-f6e6d082ae6d/_packaging/d1622942-d16f-48e5-bc83-96f4539e7601/nuget/v3/flat2/microsoft.dotnet-interactive/index.json)
* pwsh-jupyter-notebook/Dockerfile [here](https://github.com/darrenjrobinson/pwsh-jupyter-notebook/blob/master/Dockerfile)
* Installing .NET Interactive [here](https://github.com/dotnet/interactive/blob/main/docs/install-dotnet-interactive.md)
* Can't install dotnet interactive on WSL (Ubuntu 20.04) [here](https://github.com/dotnet/interactive/issues/832)
* install --path is ignored [here](https://github.com/dotnet/interactive/issues/366)





https://github.com/n-riesco/ijavascript
https://github.com/winnekes/itypescript

https://github.com/yunabe/tslab

https://github.com/nvm-sh/nvm

