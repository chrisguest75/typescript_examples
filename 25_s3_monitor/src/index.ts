// src/app.ts
import { logger } from './logger'
import { app } from './app'

const port = process.env.PORT || 8000

function shutDown() {
    return new Promise((/*resolve, reject*/) => {
        process.exit(0)
    })
}

logger.info(`Profile:'${process.env.AWS_PROFILE}' Region:'${process.env.AWS_REGION}'`)
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
