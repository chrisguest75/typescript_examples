
import {
    ListObjectsCommand,
    S3Client,
} from '@aws-sdk/client-s3';
import {fromIni} from '@aws-sdk/credential-providers';

const region = process.env.REGION;
const bucketName = process.env.BUCKETNAME;
const folderPrefix = process.env.FOLDERPREFIX;
const profile = process.env.AWS_PROFILE;

const credentials = fromIni({profile});


async function getFiles(region: string, bucketName: string, prefix: string) {
    const s3Client = new S3Client({ region, credentials });
    const command = new ListObjectsCommand({ Bucket: bucketName, Prefix: prefix });
    const result = await s3Client.send(command);
    console.log(result)
    return result.Contents;
}

async function test(region: string, bucketName: string, folderPrefix: string) {
    const files = await getFiles(region, bucketName, folderPrefix);
    console.log(files);
}

test(region, bucketName, folderPrefix)