import express, { Request, Response } from 'express'
import { logger } from '../src/logger'
import sleep from '../src/sleep'

const router = express.Router()

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
