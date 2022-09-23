import express, { Request, Response } from 'express'
import { logger } from '../src/logger'
import { S3Client, ListBucketsCommand, ListObjectsCommand } from '@aws-sdk/client-s3'
import { addWatch } from '../src/watcher'
import S3SyncClient from 's3-sync-client'

const router = express.Router()

const bucketsHandler = async (request: Request, response: Response) => {
    logger.info({ handler: 'bucketsHandler', reqid: request.id })

    const client = new S3Client({
        region: 'us-east-1',
    })

    const buckets = await client.send(new ListBucketsCommand({}))
    const length = buckets.Buckets?.length

    response
        .status(200)
        .json({ message: 'pong', random: Math.floor(Math.random() * 100), number: length, names: buckets.Buckets })
}

const listHandler = async (request: Request, response: Response) => {
    logger.info({ handler: 'listHandler', reqid: request.id })

    const bucketName = request.params.bucketname
    const bucketPath = request.params.bucketpath

    const client = new S3Client({
        region: 'us-east-1',
    })
    const command = new ListObjectsCommand({ Bucket: bucketName, Prefix: bucketPath })
    const result = await client.send(command)

    response.status(200).json({
        contents: result.Contents ?? [],
    })
}

const watchHandler = async (request: Request, response: Response) => {
    logger.info({ handler: 'watchHandler', reqid: request.id })

    const bucketName = request.params.bucketname
    const bucketPath = request.params.bucketpath

    addWatch({ bucketRegion: 'us-east-1', bucketName: bucketName, bucketPath: bucketPath })

    response.status(200).json({
        name: bucketName,
        path: bucketPath,
    })
}

const syncHandler = async (request: Request, response: Response) => {
    logger.info({ handler: 'syncHandler', reqid: request.id })

    const bucketName = request.params.bucketname
    const bucketPath = request.params.bucketpath

    logger.info(`syncHandler ${bucketPath} ${bucketName}`)
    const client = new S3Client({
        region: 'us-east-1',
    })
    const { sync } = new S3SyncClient({ client: client })

    await sync('./sync', `s3://${bucketName}/${bucketPath}`)

    response.status(200).json({
        name: bucketName,
        path: bucketPath,
    })
}

router.get('/', bucketsHandler)
router.get('/watch/:bucketname/:bucketpath', watchHandler)
router.get('/list/:bucketname', listHandler)
router.get('/list/:bucketname/:bucketpath', listHandler)
router.get('/sync/:bucketname/:bucketpath', syncHandler)

export { router as bucketsRouter }
