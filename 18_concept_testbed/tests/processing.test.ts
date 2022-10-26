import Find, { FileProcessor } from '../src/find'
import { logger } from '../src/logger'
import { PubSub, PubSubType } from '../src/publisher'
import sleep from '../src/sleep'

type events = {
    NewFile: { pubsub: PubSubType<events>; path: string }
    TruncatedFile: { pubsub: PubSubType<events>; path: string }
    EncodedFile: { pubsub: PubSubType<events>; path: string }
    SentFile: { pubsub: PubSubType<events>; personId: string; reason: string }
}

class ListFiles implements FileProcessor {
    pubSub: PubSubType<events>

    constructor(notify: PubSubType<events>) {
        this.pubSub = notify
    }

    async process(fullPath: string): Promise<string> {
        return new Promise((resolve /*,reject*/) => {
            this.pubSub.publish('NewFile', { pubsub: this.pubSub, path: fullPath })
            resolve(fullPath)
        })
    }
}

class TruncateFile {
    async process(path: string): Promise<string> {
        logger.info({ path: path }, `TruncateFile.process`)
        await sleep(1000)
        logger.info({ path: path }, `TruncateFile.process waited 1000`)
        return new Promise((resolve /*,reject*/) => {
            logger.info({ path: path }, `Resolved`)
            resolve(path)
        })
    }
}

async function newFileHandler(message: { pubsub: PubSubType<events>; path: string }) {
    logger.info(`newFileHandler ${message.path}`)
    const truncate = new TruncateFile()
    await truncate.process(message.path)
    message.pubsub.publish('TruncatedFile', { pubsub: message.pubsub, path: message.path })
}

test('Find files', async () => {
    // ARRANGE
    logger.level = 'info'
    const pubSub = PubSub<events>()
    const files = new ListFiles(pubSub)

    pubSub.subscribe('NewFile', newFileHandler)
    //pubSub.subscribe('TruncatedFile', truncatedHandler)

    const find = new Find()

    // ACT
    const basePath = './src'
    await find.findSync(basePath, '.*', true, files)
    // ASSERT
    //expect(createdHandler).toHaveBeenCalledTimes(0)
})

