import originalFetch from 'node-fetch'
import fetchRetry from 'fetch-retry-ts'
import * as fs from 'fs'

/* 
mkdir -p ./data
dd if=/dev/urandom of=./data/random.bin bs=1024 count=1024
*/
const PRESIGNED_VIDEO_URL = process.env.PUT_URL || 'http://localhost:3000'
console.log(PRESIGNED_VIDEO_URL)

const fetch = fetchRetry(originalFetch, {
    retries: 3,
    retryDelay: 150,
})

async function nodefetchRetryPut(file: string, presigned: string): Promise<Response> {
    const stats = await fs.promises.stat(file)
    const fileStream = fs.createReadStream(file)

    const response = fetch(`${presigned}`, {
        method: 'PUT',
        body: fileStream,
        headers: {
            'Content-Type': 'application/octet-stream',
            'Content-Length': `${stats.size}`,
        },
    })

    return response
}

async function tests(): Promise<Array<Response | unknown>> {
    let audio
    const video = nodefetchRetryPut('./data/random.bin', PRESIGNED_VIDEO_URL)

    const outcome = await Promise.all([audio, video])
    console.log(outcome)
    return outcome
}

const result = await tests()
console.log(result)
