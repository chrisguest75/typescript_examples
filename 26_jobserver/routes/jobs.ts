import express, { Request, Response, NextFunction } from 'express'
import { logger } from '../src/logger'
import {v4 as uuidv4} from 'uuid'
import PubSub from 'pubsub-js'
import Find, { FileProcessor } from '../src/find'

interface IJob {
    id: string
    name: string
    path: string
    md5: string
}

interface IJobs {
    [key: string]: IJob
}

const router = express.Router()
const JOBS: IJobs = {}
const topicMd5Files = Symbol('MD5_FILES')
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
                name: fullPath,
                path: fullPath,
                md5: 'UNKNOWN',
            }
            JOBS[id] = job
            //PubSub.publish(topicMd5Files, job)
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
