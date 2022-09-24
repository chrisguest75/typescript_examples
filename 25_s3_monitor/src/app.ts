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

export const app = express()
const port = process.env.PORT || 8000

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

/*
{
        log({ error, request, response}) {
            logger.error(error) // The original error object
            logger.error(request) // The request object
            logger.error(response) // The response object
        },
    }
app.use('*', function (request: Request, response: Response) {
    logger.error({ handler: 'errorHandler', reqid: request.id })
    response.status(404).json({
        contents: request,
    })
})*/

