import express, { Request, Response, NextFunction } from 'express'
import { logger } from '../src/logger'
import { S3Client, ListBucketsCommand, GetObjectCommand } from '@aws-sdk/client-s3'

const router = express.Router()

/*
function = async () => {
    logger.info(`listHandler`);
  
    const client = new S3Client({
      region: 'us-east-1',
    });
  
    const bucketName = _request.params.bucket;
    const { prefix } = _request.params;
  
    const bucketParams = {
      Bucket: bucketName,
      Prefix: prefix,
    };
  
    const files = await client.send(new ListObjectsCommand(bucketParams));
  
    response.status(200).json({ names: files });
  };
*/


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

    response.status(200).json({
        name: bucketname,
        path: bucketpath,
    })
}




router.get('/', bucketsHandler)
router.get('/watch/:bucketname/:bucketpath', watchHandler)

export { router as bucketsRouter }
