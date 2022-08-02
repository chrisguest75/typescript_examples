---
to: <%= name %>/src/index.ts
---
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

function shutDown() {
  return new Promise((resolve, reject) => {
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

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

process.on('SIGTERM', shutDown)
process.on('SIGINT', shutDown)
