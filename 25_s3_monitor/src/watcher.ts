import { S3Client, ListObjectsCommand } from '@aws-sdk/client-s3'
import { logger } from '../src/logger'
import sleep from '../src/sleep'

interface SegmentFile {
    file: string
    segment: number
    size: number
}
let segment = 0
const fileQueue: SegmentFile[] = []

async function getFiles(region: string, bucketName: string, prefix: string) {
    const s3Client = new S3Client({ region })
    const command = new ListObjectsCommand({ Bucket: bucketName, Prefix: prefix })
    const result = await s3Client.send(command)
    return result.Contents
}

async function findAllFiles(
    region: string,
    bucketName: string,
    folderPrefix: string,
    currentSegment: number,
    maxSegments: number,
) {
    const files = await getFiles(region, bucketName, folderPrefix)

    if (files === undefined) {
        return {
            currentSegment: currentSegment,
            files: [],
        }
    }
    //console.log(files)
    let mapped = files?.map((file) => {
        const fileName = file?.Key?.split('/')[1]
        const fileNameNoExt = fileName?.split('.')[0]
        if (fileNameNoExt !== undefined) {
            const segmentNumber = fileNameNoExt?.match(/\d/g)?.join('')
            const segment = parseInt(segmentNumber ? segmentNumber : '0', 10)

            return {
                file: file.Key,
                segment,
                size: file.Size,
            } as SegmentFile
        } else {
            return {
                file: '',
                segment: 0,
                size: 0,
            } as SegmentFile
        }
    })

    // filter all segments below currentSegment
    // const filtered = mapped?.filter((file) => file.segment >= currentSegment)
    // sort mapped by segment
    mapped = mapped?.sort((a, b) => a.segment - b.segment)

    const f: SegmentFile[] = []

    mapped.map((file) => {
        if (f.length < maxSegments) {
            if (file?.segment === currentSegment) {
                currentSegment++
                f.push(file)
            }
        }
    })

    return {
        currentSegment: currentSegment,
        files: f,
    }
}

interface Bucket {
    bucketRegion: string
    bucketName: string
    bucketPath: string
}

const watching: Bucket[] = []

export const addWatch = (watch: Bucket) => {
    watching.push(watch)
}

// NOTE: Does this mean multiple invocations of this function or a single one.
// setTimeout ensures that there's a delay of at least x milliseconds.
const timeoutFrequency = 2000
const maxSegments = 100
let watcherTimer = setTimeout(async function watcher() {
    const logchild = logger.child({ state: 'Watcher' })
    if (watching.length > 0) {
        const { bucketRegion, bucketName, bucketPath } = watching[0]
        const { currentSegment, files } = await findAllFiles(bucketRegion, bucketName, bucketPath, segment, maxSegments)
        console.log(currentSegment, files)
        if (segment !== currentSegment) {
            segment = currentSegment

            files.map((file) => {
                logger.info({ file })
            })

            fileQueue.concat(files)
        }

        //await sleep(5000)
    } else {
        logchild.info('Nothing to process')
    }

    watcherTimer = setTimeout(watcher, timeoutFrequency)
}, timeoutFrequency)
logger.info(`Start watcher ${watcherTimer}`)
