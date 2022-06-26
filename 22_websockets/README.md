# README

Demonstrate websockets by setting up a redis server to store.

## Startup

```sh
# list profiles
docker compose config --profiles

docker compose --profile backend up -d 

# quick test
docker compose logs redisdb  

docker compose --profile backend down
```

## Resources

* DockerHub redis image [here](https://hub.docker.com/_/redis?tab=description)

