# README

Demonstrate websockets by setting up a redis server to store.

## Startup

```sh
# list profiles
docker compose config --profiles

docker compose --profile backend up -d 

# quick test
docker compose logs redisdb  

docker compose --profile backend down --volumes
```

```sh
brew install websocat
#websocat -s 8080  
websocat ws://0.0.0.0:8080

echo "Look at testing websockets" | websocat ws://0.0.0.0:8080
```

## Resources

* DockerHub redis image [here](https://hub.docker.com/_/redis?tab=description)

https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/

https://docs.rs/crate/websocat/1.0.0