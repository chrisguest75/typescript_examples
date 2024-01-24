
import {
    PutObjectCommand,
    S3Client,
} from '@aws-sdk/client-s3';
import { promises } from 'fs';
import {fromIni} from '@aws-sdk/credential-providers';

const { readFile } = promises;

const region = process.env.REGION || 'us-east-1';
const bucketName = process.env.BUCKETNAME || 'my-bucket';
const folderPrefix = process.env.FOLDERPREFIX || 'my-folder';
const profile = process.env.AWS_PROFILE || 'default';

const credentials = fromIni({profile});


async function copyFile(region: string, bucketName: string, prefix: string) {
    const s3Client = new S3Client({ 
        region, 
        credentials, 
        maxAttempts: 3, // The maximum number of times to retry a failed request
        retryMode: 'standard', // Standard retry strategy with exponential backoff      
    });

    const data = await readFile('./quokka-s3_filecopy.ts');

    const command = new PutObjectCommand({ 
        Bucket: bucketName, 
        Key: 'quokka-s3_filecopy.ts',
        Body: data,
    });
    const result = await s3Client.send(command);
    console.log(result)
    return result;
}

console.log(region, bucketName, folderPrefix);
copyFile(region, bucketName, folderPrefix);
