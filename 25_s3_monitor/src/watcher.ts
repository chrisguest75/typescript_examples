import { logger } from '../src/logger'
import sleep from '../src/sleep'
interface Bucket {
    bucketRegion: string
    bucketName: string
    bucketPath: string
}

const watching: Bucket[] = []

export const addWatch = (watch: Bucket) => {
    watching.push(watch)
}

// NOTE: Does this mean multiple invocations of this function or a single one.
// setTimeout ensures that there's a delay of at least x milliseconds.
const timeoutFrequency = 5000
let watcherTimer = setTimeout(async function watcher() {
    const logchild = logger.child({ state: 'Watcher' })

    await sleep(5000)
    logchild.info('Nothing to process')
    watcherTimer = setTimeout(watcher, timeoutFrequency)
}, timeoutFrequency)
logger.info(`Start watcher ${watcherTimer}`)
