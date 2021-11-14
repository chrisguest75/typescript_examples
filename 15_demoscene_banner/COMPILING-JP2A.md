# README

How to compile jp2a to latest version.
Using homebrew on MacOS only installs version 1.0.6.  
Version 1.1.0 supports 24 bit colour that works better in the terminal 

Open https://github.com/Talinx/jp2a

```sh
# clone the source
git clone git@github.com:Talinx/jp2a.git
```

## Linux

Building the code on linux

```sh
sudo apt install autoconf
sudo apt install libjpeg-dev libpng-dev libncurses5-dev autoconf-archive pkg-config
autoreconf -vi
./autogen.sh
./configure
make
./src/jp2a
./src/jp2a --width=80 --colors --color-depth=24 --fill ./.github/jp2a.jpg
```

## MacOS

```sh
brew install autoconf-archive
autoreconf -vi
./autogen.sh
./configure
make
./src/jp2a
```

## Repointing Brew to new build

Get the new build working with brew 

```sh
# where is current 1.0.6_1 installed
brew info jp2a
> /usr/local/Cellar/jp2a/1.0.6_1

# make a new directory
mkdir /usr/local/Cellar/jp2a/1.1.0/bin

# copy over the new build.  
cp ./src/jp2a /usr/local/Cellar/jp2a/1.1.0/bin
la /usr/local/Cellar/jp2a/1.1.0/bin

# relink brew
brew unlink jp2a
brew link jp2a
```

## Resources
https://formulae.brew.sh/formula/jp2a
https://github.com/Homebrew/homebrew-core/blob/HEAD/Formula/jp2a.rb
