
import {
    ListObjectsCommand,
    ListObjectsV2Command,
    S3Client,
} from '@aws-sdk/client-s3';
import { pick } from 'lodash';
import {fromIni} from '@aws-sdk/credential-providers';

const region = process.env.REGION || 'us-east-1';
const bucketName = process.env.BUCKETNAME || 'my-bucket';
const folderPrefix = process.env.FOLDERPREFIX || 'my-folder';
const profile = process.env.AWS_PROFILE || 'default';

const credentials = fromIni({profile});

function addTrailingSlash(path) {
    if(path.endsWith('/')) {
        return path
    } else {
        return path + '/'
    }
}

async function getFiles(region: string, bucketName: string, prefix: string) {
    const s3Client = new S3Client({ region, credentials });
    const command = new ListObjectsCommand({ Bucket: bucketName, Prefix: prefix });
    const result = await s3Client.send(command);
    console.log(result)
    return result.Contents;
}

async function getFilesV2(region: string, bucketName: string, prefix: string, lastFileAdded?: string) {
    const s3Client = new S3Client({ region, credentials });
    const command = new ListObjectsV2Command({ 
        Bucket: bucketName, 
        Prefix: prefix,
        StartAfter: lastFileAdded,
        MaxKeys: 10,
    });
    const result = await s3Client.send(command);
    //console.log(result)
    return result.Contents;
}

async function iterate(region: string, bucketName: string, folderPrefix: string) {
    const files = await getFiles(region, bucketName, folderPrefix);
    console.log(files);
}

async function iterateV2(region: string, bucketName: string, folderPrefix: string) {
    let files = [{Key: '/' }]
 
    while(files && files.length > 0) {
        let after = files[files.length - 1].Key
        //if (!after?.endsWith('/') || !after?.endsWith('.gzip')) {
            files = await getFilesV2(region, bucketName, folderPrefix, after);
            if(files) {
                files = files.filter((file) => !file.Key.endsWith('.gzip'))
                console.log(files?.map((file) => pick(file, ['Key'])));
            }
        //}
    }
}

console.log(region, bucketName, folderPrefix);
iterateV2(region, bucketName, folderPrefix);