//const chainedString = '{ "chain": [ {"url":"http://nginx:80/b/ping"}, {"url":"http://nginx:80/a/fetch", "payload":{"url":"http://nginx:80/b/ping", "payload":{} } }, {"url":"http://nginx:80/a/ping"} ] }' 
//const chainedString = '{ "chain": [ {"url":"http://nginx:80/a/fetch", "payload":"{\\"url\\":\\"http://nginx:80/b/ping\\", \\"}" }, {"url":"http://nginx:80/b/ping"} ] }' 
const chainedString = '{ "chain": [ {"url":"http://nginx:80/b/ping"}, {"url":"http://nginx:80/a/fetch", "payload":{ "chain": [ {"url":"http://nginx:80/b/ping" } ] }}, {"url":"http://nginx:80/a/ping"} ] }'

const chained = JSON.parse(chainedString)
console.log(chained)

chained.chain.map((item) => {
    console.log(item)
    if (item.payload) {
        console.log(JSON.stringify(item.payload))
    }
})


const first = chained.chain.shift()
console.log(first)
console.log(chained.chain)
console.log(chained)

// with first url removed
console.log(JSON.stringify(chained))

