import express, { Request, Response, NextFunction } from 'express'
import { logger } from '../src/logger'
import { v4 as uuidv4 } from 'uuid'

interface IJobs {
    [key: string]: string[]
}

const router = express.Router()
const JOBS: IJobs = {}

// use underscores to ignore parameters ", _next: NextFunction"
const jobsHandler = async (_request: Request, response: Response) => {
    logger.info(`jobsHandler`)

    const times = [100, 1000, 10000, 20000]
    const promises: Promise<string>[] = []
    for (const time of times) {
        promises.push(
            new Promise((resolve, reject) => {
                setTimeout(resolve, time, `${time} is done.`)
            }),
        )
    }
    // obviously, you'd want to generate a real uuid here to avoid collisions
    const uuid = uuidv4()
    Promise.all(promises).then((values) => {
        JOBS[uuid] = values
    })
    response.redirect(`progress/${uuid}`)
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
        delete JOBS[request.params.uuid]
    }
}

router.get('/', jobsHandler)
router.get('/progress/:uuid', progressHandler)

export { router as jobsRouter }
