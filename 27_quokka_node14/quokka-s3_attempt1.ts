// NOTE: The problem with this version is that it makes too many requests to S3 api

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

class SegmentFile { 
    file: string;
    segment: number;
    size: number;
}

function createPrefix(folder: string, segment: number) {
    return `${folder}/file${(segment).toString().padStart(4, '0')}.wav.m4a`
}

async function getFiles(region: string, bucketName: string, prefix: string) {
    const s3Client = new S3Client({ region, credentials });
    const command = new ListObjectsCommand({ Bucket: bucketName, Prefix: prefix });
    const result = await s3Client.send(command);
    return result.Contents;
}

async function findFile(region: string, bucketName: string, folderPrefix: string, currentSegment: number) {
    const prefix = createPrefix(folderPrefix, currentSegment)
    console.log(prefix)
    const files = await getFiles(region, bucketName, prefix);

    if (files === undefined) {
        return { currentSegment, file: { file: '', segment: 0, size: 0}};
    }
    console.log(files)
    let mapped = files?.map(file => { 
        const segment = parseInt(file?.Key?.split('/')[1].split('.')[0].match(/\d/g).join(''), 10);

        return { 
            file: file.Key, 
            segment,
            size: file.Size,
        } as SegmentFile
    })
   
    console.log(mapped)
    if (mapped?.length == 0) {
        console.log('no files found')
        return { currentSegment, file: { file: '', segment: 0, size: 0}};
    } else {
        if (mapped?.length > 1) {
            console.log('more than one file found')
            mapped = mapped?.slice(0, 1);
        } 
        if (mapped[0].segment === currentSegment) {
            currentSegment++
        }
        return { currentSegment, file: mapped[0]};
    }
}   

async function test(region: string, bucketName: string, folderPrefix: string) {
    let segment = 10;
    const fileQueue: SegmentFile[] = []

    for(let i = 0; i < 10; i++) {
        const {currentSegment, file} = await findFile(region, bucketName, folderPrefix, segment);
        console.log(currentSegment, file)
        if (segment !== currentSegment) {
            segment = currentSegment;
            fileQueue.push(file);
        }
        fileQueue
        currentSegment
    }
}

test(region, bucketName, folderPrefix)




