import express, { Request, Response, NextFunction } from 'express'
import { logger } from '../src/logger'
import { S3Client, ListBucketsCommand, GetObjectCommand } from '@aws-sdk/client-s3'

const router = express.Router()

// export const bucketParams = {
//     Bucket: "BUCKET_NAME",
//     Key: "KEY",
//   };
  
//   export const run = async () => {
//     try {
//       // Create a helper function to convert a ReadableStream to a string.
//       const streamToString = (stream) =>
//         new Promise((resolve, reject) => {
//           const chunks = [];
//           stream.on("data", (chunk) => chunks.push(chunk));
//           stream.on("error", reject);
//           stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
//         });
  
//       // Get the object} from the Amazon S3 bucket. It is returned as a ReadableStream.
//       const data = await client.send(new GetObjectCommand(bucketParams));
//         return data; // For unit tests.
//       // Convert the ReadableStream to a string.
//       const bodyContents = await streamToString(data.Body);
//       console.log(bodyContents);
//         return bodyContents;
//     } catch (err) {
//       console.log("Error", err);
//     }
//   };
//   run();

// use underscores to ignore parameters ", _next: NextFunction"
const bucketsHandler = async (_request: Request, response: Response) => {
    logger.info(`bucketsHandler`)

    const client = new S3Client({
        region: 'us-east-1',
    });
    
    const buckets = await client.send(new ListBucketsCommand({}));
    const length = buckets.Buckets?.length

    response.status(200).json({ message: 'pong', random: Math.floor(Math.random() * 100), number: length, names: buckets.Buckets })
}

router.get('/', bucketsHandler)

export { router as bucketsRouter }
