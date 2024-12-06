// src/app.ts
import * as dotenv from 'dotenv'

dotenv.config()

import pino from 'express-pino-logger'
import express, { Request, Response, NextFunction } from 'express'
import { logger } from './logger'
import bodyParser from 'body-parser'
import { rootRouter } from '../routes/root'
import { pingRouter } from '../routes/ping'
import { sleepRouter } from '../routes/sleep'
import { bucketsRouter } from '../routes/buckets'

export const app = express()

// Use body parser to read sent json payloads
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
)
// TODO: app.use(express.json()); https://simonplend.com/dont-install-body-parser-its-already-bundled-with-express/
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(pino())
app.use('/', rootRouter)
app.use('/ping', pingRouter)
app.use('/sleep', sleepRouter)
app.use('/buckets', bucketsRouter)
app.use('/*', function (request: Request, response: Response) {
    logger.error({ handler: 'errorHandler', reqid: request.id })
    response.status(404).setHeader('Content-Type', 'application/json')
    response.json({
        message: 'Route not found',
    })
})
