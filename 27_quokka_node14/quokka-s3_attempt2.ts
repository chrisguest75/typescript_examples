// NOTE: Sort and add the files if they exist until we have to skip a file

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

async function getFiles(region: string, bucketName: string, prefix: string) {
    const s3Client = new S3Client({ region, credentials });
    const command = new ListObjectsCommand({ Bucket: bucketName, Prefix: prefix });
    const result = await s3Client.send(command);
    return result.Contents;
}

async function findAllFiles(region: string, bucketName: string, folderPrefix: string, currentSegment: number, maxSegments: number) {
    const files = await getFiles(region, bucketName, folderPrefix);

    if (files === undefined) {
        return {
            currentSegment: currentSegment,
            files: [],
        };
    }
    //console.log(files)
    let mapped = files?.map(file => { 
        const segment = parseInt(file?.Key?.split('/')[1].split('.')[0].match(/\d/g).join(''), 10);

        return { 
            file: file.Key, 
            segment,
            size: file.Size,
        } as SegmentFile
    })

    // filter all segments below currentSegment
    const filtered = mapped?.filter(file => file.segment >= currentSegment);
    // sort mapped by segment 
    mapped = mapped?.sort((a, b) => a.segment - b.segment);

    const f: SegmentFile[] = []

    const inOrder = mapped.map(file => {
        if (f.length < maxSegments) {
            if (file.segment === currentSegment) {
                currentSegment++
                f.push(file)
            }
        }
    });

    return {
        currentSegment: currentSegment,
        files: f
    };
}

async function test(region: string, bucketName: string, folderPrefix: string) {
    let segment = 100;
    const fileQueue: SegmentFile[] = []
    const {currentSegment, files} = await findAllFiles(region, bucketName, folderPrefix, segment, 10);
    console.log(currentSegment, files)
    if (segment !== currentSegment) {
        segment = currentSegment;
        fileQueue.concat(files);
    }
    fileQueue
    currentSegment

    for(let i = 0; i < 2; i++) {
        const {currentSegment, files} = await findAllFiles(region, bucketName, folderPrefix, segment, 10);
        console.log(currentSegment, files)
        if (segment !== currentSegment) {
            segment = currentSegment;
            fileQueue.concat(files);
        }
        fileQueue
        currentSegment
    }
}

test(region, bucketName, folderPrefix)




