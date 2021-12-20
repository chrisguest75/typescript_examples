# README

## Startup

```sh
# list profiles
docker compose config --profiles               

# start mongo (profiles not working at the mo')
# It is working in compose: Docker Compose (Docker Inc., v2.0.0-beta.6) - Docker Desktop 3.5.2
docker compose --profile backend up -d 

# quick test
docker logs $(docker ps --filter name=17-redis-redis-1 -q)
```


## Resources


https://github.com/chrisguest75/redis-persistence-example
https://redis.io/commands
https://hub.docker.com/_/redis
