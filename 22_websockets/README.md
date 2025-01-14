# WEBSOCKETS

Demonstrate websockets by setting up a redis server to store.

* [github.com/chrisguest75/sysadmin_examples/22_websockets_reverse_proxy/README.md](https://github.com/chrisguest75/sysadmin_examples/blob/master/22_websockets_reverse_proxy/README.md)
* [github.com/chrisguest75/sysadmin_examples/23_mitmproxy/README.md](https://github.com/chrisguest75/sysadmin_examples/blob/master/23_mitmproxy/README.md)

TODO:

* Get it setup and scale test it.
* Namespaces
* Build some d3 charts based on connections.
* Metrics
* Switchable debugging
* ECS?

## Startup

```sh
# start redis (terminal-1)
just compose-up

# server
cd 22_websockets/ws_server  
just start-dev

# client
cd 22_websockets/ws_client
just start-dev

#or
just start-tmux 
```

## Connect

```sh
# connect to client cli container
just compose-shell

# open cli
redis-cli -h redisdb -p 6379

help

# clear the screen inside the cli
clear
```

## Set

Can be used for inventories.  

Docs for `hset` [here](https://redis.io/commands/hset)  

```sh
# create a set <key> <value> <key> <value>
hset user:101 name John age 30

# view keys ad values - "name" "John" "age" "30"
hgetall user:101

# get keyvalue 
hget user:101 name

# check keys exist
hexists user:101 abc

# does name key exist
hexists user:101 name

# get keys
hkeys user:101

# get values
hvals user:101

# delete a key
hdel user:101 age
hkeys user:101

# add to set
hset user:101 class 12

hgetall user:101
```

```sh
# update fields in a set
hset shirt name s1 quantity 5
hincrby shirt quantity 1
hincrby shirt quantity 1
hincrby shirt quantity -1
hgetall shirt
```

## Resources

* DockerHub redis image [here](https://hub.docker.com/_/redis?tab=description)
* Websockets https://medium.com/@edhalliwell/chat-app-driven-by-websockets-using-socket-io-and-typescript-ed49611d6077
* https://socket.io/docs/v4/tutorial/step-9
* https://dev.to/imsushant12/websockets-socketio-and-real-time-communication-with-nodejs-4ea0
* https://github.com/socketio/socket.io/blob/main/examples/cluster-nginx/README.md
* https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/