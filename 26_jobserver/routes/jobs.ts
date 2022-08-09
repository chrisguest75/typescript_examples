import express, { Request, Response, NextFunction } from 'express'
import { logger } from '../src/logger'
import { v4 as uuidv4 } from 'uuid'
import PubSub from 'pubsub-js'
import Find, { FileProcessor } from '../src/find'
import path = require('path')
import md5File from 'md5-file'

// sleep for a period of time and create a child off passed in span
function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Complete')
        }, ms)
    })
}

enum ProcessingStates {
    start = 'START',
    submitted = 'SUBMITTED',
    md5 = 'MD5',
    complete = 'COMPLETE',
    removal = 'REMOVAL',
}

interface IJob {
    id: string
    name: string
    path: string
    md5: string
    state: ProcessingStates
}

interface IJobs {
    [key: string]: IJob
}

const router = express.Router()
const JOBS: IJobs = {}

const processing_tasks = true

logger.info(`Start job processor`)
setTimeout(async () => {
    while (processing_tasks) {
        let processed = false
        for (const key in JOBS) {
            if (JOBS[key].state == ProcessingStates.start) {
                logger.info(`Submit ${JOBS[key].id}`)
                JOBS[key].state = ProcessingStates.submitted
                processed = true
                // throttle processing
                await sleep(10000)
                PubSub.publish(ProcessingStates.md5, JOBS[key])
            }
        }
        if (!processed) {
            logger.info('Nothing to process')
        }
        await sleep(1000)
    }
}, 0)

PubSub.subscribe(ProcessingStates.md5, async (msg, data) => {
    logger.info(data, `${ProcessingStates.md5}`)
    data.state = ProcessingStates.md5
    const md5 = await md5File.sync(data.path)
    logger.info(`${md5} for ${data.path}`)
    data.md5 = md5
    PubSub.publish(ProcessingStates.complete, data)
})

PubSub.subscribe(ProcessingStates.complete, async (msg, data) => {
    logger.info(data, `${ProcessingStates.complete}`)
    data.state = String(ProcessingStates.complete)
    await sleep(2000)
    PubSub.publish(ProcessingStates.removal, data)
})

PubSub.subscribe(ProcessingStates.removal, async (msg, data) => {
    logger.info(data, `${ProcessingStates.removal} ${Object.keys(JOBS).length}`)
    data.state = String(ProcessingStates.removal)
    delete JOBS[data.id]
    logger.info(data, `Removed ${data.id}`)
})

class ListFiles implements FileProcessor {
    basePath: string

    constructor(basePath: string) {
        this.basePath = basePath
    }

    async process(fullPath: string): Promise<string> {
        return new Promise((resolve, reject) => {
            logger.info(`File ${fullPath}`)
            const id = uuidv4()
            const job: IJob = {
                id: id,
                name: path.basename(fullPath),
                path: fullPath,
                md5: 'UNKNOWN',
                state: ProcessingStates.start,
            }
            JOBS[id] = job
            resolve(fullPath)
        })
    }
}

// use underscores to ignore parameters ", _next: NextFunction"
const startJobsHandler = async (request: Request, response: Response) => {
    logger.info(`jobsHandler`)
    logger.info(request.body)

    const basePath = request.body.path
    const files = new ListFiles(basePath)
    const find = new Find()
    await find.findSync(basePath, '.*', true, files)

    response.redirect(`progress`)
}

const allfilesHandler = async (request: Request, response: Response) => {
    logger.info(`allfilesHandler`)

    response.status(200).json({ jobs: JOBS })
}

router.post('/start', startJobsHandler)
router.get('/progress', allfilesHandler)
router.post('/progress', allfilesHandler)

const progressHandler = async (request: Request, response: Response) => {
    logger.info(`progressHandler`)

    if (JOBS[request.params.uuid] === undefined) {
        response.status(200).json({ job: JOBS[request.params.uuid] })
    } else {
        response.status(200).json({ job: JOBS[request.params.uuid] })
        // instead of immediately deleting the result of the job (and making it impossible for the user
        // to fetch it a second time if they e.g. accidentally cancel the download), it would be better
        // to run a periodic cleanup task on `JOBS`
        //delete JOBS[request.params.uuid]
    }
}

router.get('/progress/:uuid', progressHandler)

export { router as jobsRouter }
