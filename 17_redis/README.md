# README

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
127.0.0.1:6379> set hits 1
OK
127.0.0.1:6379> incr hits
(integer) 2
127.0.0.1:6379> incrby hits 5
(integer) 7
127.0.0.1:6379> get hits
```

## Lists

```sh
lpush news n1 n2 n3
lrange news 0 4
lrange news 0 1
```

## Resources


https://github.com/chrisguest75/redis-persistence-example
https://redis.io/commands
https://hub.docker.com/_/redis
https://download.redis.io/redis-stable/redis.conf
