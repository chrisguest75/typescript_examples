import express, { Request, Response, NextFunction } from 'express'
import { logger } from '../src/logger'
import { v4 as uuidv4 } from 'uuid'
import PubSub from 'pubsub-js'
import Find, { FileProcessor } from '../src/find'
import path = require('path')
import md5File from 'md5-file'

// sleep for a period of time and create a child off passed in span
function sleep(ms: number) {
    // const parentSpan = opentelemetry.trace.getSpan(opentelemetry.context.active())

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Complete')
        }, ms)
    })
}

interface IJob {
    id: string
    name: string
    path: string
    md5: string
    state: string
}

interface IJobs {
    [key: string]: IJob
}

const router = express.Router()
const JOBS: IJobs = {}
const startState = Symbol('START')
const submittedState = Symbol('SUBMITTED')
const topicMd5Files = Symbol('MD5')
const topicCompleteFiles = Symbol('COMPLETE')
const processing_tasks = true

logger.info(`Start job processor`)
setTimeout(async () => {
    while (processing_tasks) {
        let processed = false
        for (const key in JOBS) {
            if (JOBS[key].state == String(startState)) {
                logger.info(`Submit ${JOBS[key].id}`)
                JOBS[key].state = String(submittedState)
                processed = true
                // throttle processing
                await sleep(10000)
                PubSub.publish(topicMd5Files, JOBS[key])
            }
        }
        if (!processed) {
            logger.info('Nothing to process')
        }
        await sleep(1000)
    }
}, 0)

PubSub.subscribe(topicMd5Files, async (msg, data) => {
    logger.info(data, `${String(topicMd5Files)}`)
    data.state = topicMd5Files
    const md5 = await md5File.sync(data.path)
    logger.info(`${md5} for ${data.path}`)
    data.md5 = md5
    PubSub.publish(topicCompleteFiles, data)
})

PubSub.subscribe(topicCompleteFiles, async (msg, data) => {
    logger.info(data, `${String(topicCompleteFiles)}`)

    data.state = String(topicCompleteFiles)
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
                state: String(startState),
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
