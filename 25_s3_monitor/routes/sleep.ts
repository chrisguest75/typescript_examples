import express, { Request, Response } from 'express'
import { logger } from '../src/logger'

const router = express.Router()

// sleep for a period of time and create a child off passed in span
function sleep(ms: number) {
    // const parentSpan = opentelemetry.trace.getSpan(opentelemetry.context.active())

    return new Promise((resolve) => {
        logger.info(`Sleep for ${ms}`)
        setTimeout(() => {
            resolve('Complete')
        }, ms)
    })
}

// use underscores to ignore parameters ", _next: NextFunction"
const sleepHandler = async (request: Request, response: Response) => {
    logger.info(`sleepHandler`)
    let wait = '500'
    if (typeof request.query.wait === 'string') {
        wait = request.query.wait
    }

    const sleeping = sleep(parseInt(wait))
    await sleeping

    response.status(200).json({ message: 'pong', random: Math.floor(Math.random() * 100) })
}

router.get('/', sleepHandler)

export { router as sleepRouter }
