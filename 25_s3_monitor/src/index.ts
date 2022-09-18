// src/app.ts
import * as dotenv from 'dotenv'

dotenv.config()

import express from 'express'
import pino from 'express-pino-logger'
import { logger } from './logger'
import bodyParser from 'body-parser'
import { rootRouter } from '../routes/root'
import { pingRouter } from '../routes/ping'
import { sleepRouter } from '../routes/sleep'
import { bucketsRouter } from '../routes/buckets'

function shutDown() {
    return new Promise((/*resolve, reject*/) => {
        process.exit(0)
    })
}

export const app = express()
const port = process.env.PORT || 8000

// Use body parser to read sent json payloads
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
)
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(pino())
app.use('/', rootRouter)
app.use('/ping', pingRouter)
app.use('/sleep', sleepRouter)
app.use('/buckets', bucketsRouter)

logger.info(`Profile:${process.env.AWS_PROFILE} Region:${process.env.AWS_REGION}`)
app.listen(port, () => logger.info(`25_s3_monitor app listening at http://localhost:${port}`))

process.on('SIGTERM', shutDown)
process.on('SIGINT', shutDown)

process.on('exit', async () => {
    logger.warn('exit signal received')
    process.exit(1)
})

process.on('uncaughtException', async (error: Error) => {
    logger.error(error)
    // for nice printing
    console.log(error)
    process.exit(1)
})

process.on('unhandledRejection', async (reason, promise) => {
    logger.error({
        promise: promise,
        reason: reason,
        msg: 'Unhandled Rejection',
    })
    console.log(reason)
    process.exit(1)
})
