import express, { Request, Response } from 'express'
import { logger } from '../src/logger'
import { S3Client, ListBucketsCommand } from '@aws-sdk/client-s3'
import { addWatch } from '../src/watcher'

const router = express.Router()

// use underscores to ignore parameters ", _next: NextFunction"
const bucketsHandler = async (_request: Request, response: Response) => {
    logger.info(`bucketsHandler`)

    const client = new S3Client({
        region: 'us-east-1',
    })

    const buckets = await client.send(new ListBucketsCommand({}))
    const length = buckets.Buckets?.length

    response
        .status(200)
        .json({ message: 'pong', random: Math.floor(Math.random() * 100), number: length, names: buckets.Buckets })
}

const watchHandler = async (request: Request, response: Response) => {
    const bucketname = request.params.bucketname
    const bucketpath = request.params.bucketpath

    logger.info(`watchHandler ${bucketpath} ${bucketname}`)

    addWatch({ bucketRegion: 'us-east-1', bucketName: bucketname, bucketPath: bucketpath })

    response.status(200).json({
        name: bucketname,
        path: bucketpath,
    })
}

router.get('/', bucketsHandler)
router.get('/watch/:bucketname/:bucketpath', watchHandler)

export { router as bucketsRouter }
