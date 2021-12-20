# README

Demonstrate how to connect and use Redis from typescript

TODO:  

* Do the ACL work.
* Pub/Sub
* Streams - event queues
    * Sensor data..

Session store 
Cache.. 

## Startup

```sh
# list profiles
docker compose config --profiles               

docker compose --profile backend up -d 

# quick test
docker logs $(docker ps --filter name=17_redis-redis-1 -q)

docker compose --profile backend down

```

## Connect

```sh
docker exec -it $(docker ps --filter name=17_redis-redis-1 -q) /bin/bash

docker exec -it $(docker ps --filter name=17_redis-redis-cli-1 -q) /bin/bash

# open cli
redis-cli -h redisdb -p 6379

# clear the screen inside the cli
clear

# help?

# clear the db (danger)
flushdb 
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

## Key expiry (ttl)


```sh
set session:101 s1 EX 5
ttl session:101

# milliseconds
set session:101 s1 EX 10
pttl session:101
```


## Counters

```sh

set hits 1

incr hits
> (integer) 2

incrby hits 5
> (integer) 7

get hits
```

## Lists

```sh
# create a list
lpush news n1 n2 n3

# show the list
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

```sh
# create a set
hset user:101 name John age 30

# view keys ad values
127.0.0.1:6379> hgetall user:101
1) "name"
2) "John"
3) "age"
4) "30"

# get keyvalue
127.0.0.1:6379> hget user:101 name
"John"

# check keys exist
127.0.0.1:6379> hexists user:101 abc
(integer) 0
127.0.0.1:6379> hexists user:101 name
(integer) 1
127.0.0.1:6379> hkeys user:101
1) "name"
2) "age"
127.0.0.1:6379> hvals user:101
1) "John"
2) "30"
127.0.0.1:6379> hdel user:101 age
(integer) 1
127.0.0.1:6379> hkeys user:101
1) "name"
127.0.0.1:6379> hset user:101 class 12
(integer) 1
127.0.0.1:6379> hgetall user:101
1) "name"
2) "John"
3) "class"
4) "12"

127.0.0.1:6379> hset shirt name s1 quantity 5
(integer) 2
127.0.0.1:6379> hincrby shirt quantity 1
(integer) 6
127.0.0.1:6379> hincrby shirt quantity 1
(integer) 7
127.0.0.1:6379> hincrby shirt quantity -1
(integer) 6
```

## Transactions

Redis Transactions - they continue if it is a programmer error (updating a key that does not exist).  

multi, exec, discard, watch, unwatch

```sh
127.0.0.1:6379> hset account name s1 money 5
(integer) 2
127.0.0.1:6379> multi
OK
127.0.0.1:6379(TX)> hincrby account money 1
QUEUED
127.0.0.1:6379(TX)> hincrby account money 4
QUEUED
127.0.0.1:6379(TX)> hincrby account money -2
QUEUED
127.0.0.1:6379(TX)> hincrby account money -1
QUEUED
127.0.0.1:6379(TX)> hincrby account money 1
QUEUED
127.0.0.1:6379(TX)> exec
1) (integer) 6
2) (integer) 10
3) (integer) 8
4) (integer) 7
5) (integer) 8
127.0.0.1:6379> hgetall account
1) "name"
2) "s1"
3) "money"
4) "8"

```

## Cursors

```sh

```

## Streams

Streams are an append only log.  Event driven systems - notifications

```sh
# * to autogenerate an id - gives a timestamp and an id
xadd temp * temp_f 43.7
"1640014331452-0"

# add a 10 to the start to repeat it 10 times.
10 xadd temp * temp_f 43.7
"1640014368076-0"
"1640014368076-1"
"1640014368077-0"
"1640014368078-0"
"1640014368078-1"
"1640014368079-0"
"1640014368080-0"
"1640014368081-0"
"1640014368081-1"
"1640014368082-0"

# get all data start to end
 xrange temp - + 
 1) 1) "1640014331452-0"
    2) 1) "temp_f"
       2) "43.7"
 2) 1) "1640014368076-0"
    2) 1) "temp_f"
       2) "43.7"

# more complex structures
xadd num * n 1 n 2 sum 4
"1640014509341-0"
redisdb:6379> xrange num - + 
1) 1) "1640014487770-0"
   2) 1) "n"
      2) "1"
      3) "n"
      4) "2"
      5) "sum"
      6) "4"
2) 1) "1640014509341-0"
   2) 1) "n"
      2) "1"
      3) "n"
      4) "2"
      5) "sum"
      6) "4"

# Add to streams with user specified key
redisdb:6379> xadd num 101 n 1 
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
redisdb:6379> 10 xtrim temp MINID "1640015033726-1"
redisdb:6379> xlen temp
(integer) 17

# Return most recent message in stream.
 xrevrange temp + -
 1) 1) "1640015034584-0"
    2) 1) "temp_f"
       2) "43.7"
 2) 1) "1640015034583-1"
    2) 1) "temp_f"
       2) "43.7"

# reading slices of streams
redisdb:6379> xrevrange temp "1640015033728-1" "1640015033727-1"
1) 1) "1640015033728-1"
   2) 1) "temp_f"
      2) "43.7"
2) 1) "1640015033728-0"
   2) 1) "temp_f"
      2) "43.7"

# read and block (use $ for first grab - after that you should be putting in the id of the last returned item. )

xread count 1 block 1000 streams temp $
```

## Resources


https://github.com/chrisguest75/redis-persistence-example
https://redis.io/commands
https://hub.docker.com/_/redis
https://download.redis.io/redis-stable/redis.conf
https://www.npmjs.com/package/redis