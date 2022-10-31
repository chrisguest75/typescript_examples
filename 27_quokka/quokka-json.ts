const chainedString = '{ "chain": [ {"url":"http://nginx:80/a/fetch", "payload":{"url":"http://nginx:80/b/ping", "payload":{} } }, {"url":"http://nginx:80/b/ping"}, {"url":"http://nginx:80/a/ping"} ] }' 
//const chainedString = '{ "chain": [ {"url":"http://nginx:80/a/fetch", "payload":"{\\"url\\":\\"http://nginx:80/b/ping\\", \\"}" }, {"url":"http://nginx:80/b/ping"} ] }' 

const chained = JSON.parse(chainedString)
console.log(chained)

const first = chained.chain.shift()
console.log(first)
console.log(chained.chain)
console.log(chained)
