import express, { Request, Response, NextFunction } from 'express'
import { logger } from '../src/logger'
import PubSub from 'pubsub-js'
import Find, { FileProcessor } from '../src/find'

interface IJobs {
    [key: string]: string
}

const router = express.Router()
const JOBS: IJobs = {}

class ListFiles implements FileProcessor {
    basePath: string

    constructor(basePath: string) {
        this.basePath = basePath
    }

    async process(fullPath: string): Promise<string> {
        return new Promise((resolve, reject) => {
            logger.info(`File ${fullPath}`)
            JOBS[fullPath] = fullPath
            resolve(fullPath)
        })
    }
}

// use underscores to ignore parameters ", _next: NextFunction"
const jobsHandler = async (request: Request, response: Response) => {
    logger.info(`jobsHandler`)
    logger.info(request.body)

    const basePath = request.body.path
    const files = new ListFiles(basePath)
    const find = new Find()
    await find.findSync(basePath, '.*', true, files)

    response.redirect(`progress`)
}

const progressHandler = async (request: Request, response: Response) => {
    logger.info(`progressHandler`)

    if (JOBS[request.params.uuid] === undefined) {
        response.status(200).json({ status: 'processing', job: JOBS[request.params.uuid] })
    } else {
        response.status(200).json({ status: 'complete', job: JOBS[request.params.uuid] })
        // instead of immediately deleting the result of the job (and making it impossible for the user
        // to fetch it a second time if they e.g. accidentally cancel the download), it would be better
        // to run a periodic cleanup task on `JOBS`
        //delete JOBS[request.params.uuid]
    }
}

const allfilesHandler = async (request: Request, response: Response) => {
    logger.info(`allfilesHandler`)

    response.status(200).json({ jobs: JOBS })
}

router.post('/start', jobsHandler)
router.get('/progress', allfilesHandler)
router.post('/progress', allfilesHandler)
router.get('/progress/:uuid', progressHandler)

export { router as jobsRouter }
