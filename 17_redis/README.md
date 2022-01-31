# README

Demonstrate how to connect and use `Redis` from typescript

TODO:  

* Do the ACL work.
* Pub/Sub
* Streams - event queues
    * Sensor data..
* Session store
* Cache..

## Startup

```sh
# list profiles
docker compose config --profiles

docker compose --profile backend up -d 

# quick test
docker logs $(docker ps --filter name=17_redis-redis-cli-1 -q)

docker compose --profile backend down

```

## Run Typescript Client

```sh
cd ./redis-ts-client
npm install   
npm run start:dev    
```

## Connect

```sh
# connect to client cli container
docker exec -it $(docker ps --filter name=17_redis-redis-cli-1 -q) /bin/bash

# open cli
redis-cli -h redisdb -p 6379

# clear the screen inside the cli
clear

# help?

# clear the db (danger)
flushdb 
```

## Key expiry (ttl)

Set keys with a TTL and see them expire.  
Docs for `set` [here](https://redis.io/commands/set)  

```sh
# set a value
set session:101 s1 EX 5

# retrieve it (keep on trying till it times out)
get session:101

# check ttl
ttl session:101

# milliseconds
set session:101 s1 EX 10

# pttl is milliseconds
pttl session:101
```

## Counters (incr)

Docs for `incr` [here](https://redis.io/commands/INCR)  

```sh
# start a counter
set hits 1

# increment the counter
incr hits

# increment the counter by a number
incrby hits 5

# retrieve the value
get hits
```

## Lists

Docs for `lpush` [here](https://redis.io/commands/lpush)  

```sh
# create a list (will be n3, n2, n1 once pushed)
lpush news n1 n2 n3

# show the list (inclusive elements)
lrange news 0 4

# show slice of list
lrange news 0 1

# remove items
ltrim news 0 1

# show trimmed list
lrange news 0 4
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

## Transactions

Redis Transactions - they continue if it is a programmer error (updating a key that does not exist).  

multi, exec, discard, watch, unwatch  

Docs for `multi` [here](https://redis.io/commands/multi)  

```sh
# create a set
hset account name s1 money 5

# enter a transaction
multi

# perform actions
hincrby account money 1

# quit transaciton
discard

# will not have changed value
hgetall account
```

Commit the transaction  

```sh
# enter a transaction
multi

hincrby account money 4
hincrby account money -2
hincrby account money -1
hincrby account money 1

# commit
exec

# will not have changed value
hgetall account
```

## Streams

Streams are an append only log.  Event driven systems - notifications  

Docs for `xadd` [here](https://redis.io/commands/xadd)  

```sh
# * to autogenerate an id - gives a timestamp and an id
# temp stream, * to generate an id, temp_f = key and 43.7 is value
xadd temp * temp_f 43.7
"1640014331452-0"

# add a 10 to the start to repeat it 10 times.
10 xadd temp * temp_f 43.7
"1640014368076-0"
"1640014368076-1"
... 

# get all data start to end 
xrange temp - + 

# more complex structures
xadd num * n 1 n 2 sum 4
"1640014509341-0"
xrange num - + 
1) 1) "1640014487770-0"
   2) 1) "n"
      2) "1"
      3) "n"
      4) "2"
      5) "sum"
      6) "4"

# Add to streams with user specified key
xadd num 101 n 1 
"101-0"
redisdb:6379> xadd num 101 n 1 
(error) ERR The ID specified in XADD is equal or smaller than the target stream top item
redisdb:6379> xadd num 102 n 1 
"102-0"

# length of stream
xlen num
(integer) 2

# trimming the stream.
10 xadd temp * temp_f 43.7
10 xtrim temp MINID "1640015033726-1"
xlen temp
(integer) 17

# Return most recent message in stream.
xrevrange temp + -
 1) 1) "1640015034584-0"
    2) 1) "temp_f"
       2) "43.7"

# reading slices of streams
xrevrange temp "1640015033728-1" "1640015033727-1"
1) 1) "1640015033728-1"
   2) 1) "temp_f"
      2) "43.7"
2) 1) "1640015033728-0"
   2) 1) "temp_f"
      2) "43.7"

# read and block (use $ for first grab - after that you should be putting in the id of the last returned item. )

xread count 1 block 1000 streams temp $
```

## Cursors

```sh

```

## ACL

```sh
auth John hello
acl setuser John on >hello +@admin
acl list

auth hello

set session:101 s1 
get session:101

acl setuser cacheservice on >cache +set +get -session:*
auth cacheservice cache
```

## Resources

* redis-persistence-example repo [here](https://github.com/chrisguest75/redis-persistence-example)
* Redis Commands [here](https://redis.io/commands)
* Docker Image [here](https://hub.docker.com/_/redis)
* Redis conf example [here](https://download.redis.io/redis-stable/redis.conf)
* NPM Redis package [here](https://www.npmjs.com/package/redis)
