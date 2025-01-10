# README

Demonstrate websockets by setting up a redis server to store.

* https://github.com/chrisguest75/sysadmin_examples/blob/master/22_websockets_reverse_proxy/README.md
* https://github.com/chrisguest75/sysadmin_examples/blob/master/23_mitmproxy/README.md

TODO:

* Get it setup and scale test it.

## Startup

```sh
# start redis (terminal-1)
just compose-up

cd 22_websockets/ws_server  
just start-dev
```

## Connect

```sh
brew install websocat
#websocat -s 8080  
websocat ws://0.0.0.0:8000

echo "Look at testing websockets" | websocat ws://0.0.0.0:8000
```

## Resources

* DockerHub redis image [here](https://hub.docker.com/_/redis?tab=description)
* https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/
* https://docs.rs/crate/websocat/1.0.0

* https://www.npmjs.com/package/ws
* https://github.com/websockets/ws
* https://www.npmjs.com/package/@types/ws

* https://github.com/websockets/wscat
* https://www.npmjs.com/package/wscat

* https://github.com/vi/websocat
* Websockets https://medium.com/@edhalliwell/chat-app-driven-by-websockets-using-socket-io-and-typescript-ed49611d6077
* https://socket.io/docs/v4/tutorial/step-9