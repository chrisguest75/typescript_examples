# README

Demonstrate how to connect and use Redis from typescript

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


## Resources


https://github.com/chrisguest75/redis-persistence-example
https://redis.io/commands
https://hub.docker.com/_/redis
https://download.redis.io/redis-stable/redis.conf
