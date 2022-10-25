import { S3Client, ListObjectsCommand } from '@aws-sdk/client-s3'
import { logger } from '../src/logger'
import { throttle } from 'lodash'

interface SegmentFile {
  file: string
  segment: number
  size: number
}

interface Bucket {
  bucketRegion: string
  bucketName: string
  bucketPath: string
}

const timeoutFrequency = 2000
const maxSegments = 100

const watcherLogChild = logger.child({ state: 'Watcher' })
const nothingThrottled = throttle(() => watcherLogChild.info('Nothing to process'), timeoutFrequency * 5)

/*const watching: Bucket[] = []
export const addWatcher = (watch: Bucket) => {
  watching.push(watch)
}*/

export async function findAllFiles(
  region: string,
  bucketName: string,
  folderPrefix: string,
  currentSegment: number,
  maxSegments: number,
) {
  const s3Client = new S3Client({ region })
  const command = new ListObjectsCommand({ Bucket: bucketName, Prefix: folderPrefix })
  const result = await s3Client.send(command)
  const files = result.Contents

  if (files === undefined) {
    return {
      currentSegment: currentSegment,
      files: [],
    }
  }
  let mapped = files?.map((file) => {
    const folders = file?.Key?.split('/')
    let fileName = folders ? folders[0] : ''
    if (folders !== undefined) {
      fileName = folders[folders.length - 1]
    }
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

/*async function detectNewFiles(
  segment: number,
  watching: Array<Bucket>,
): { currentSegment: number; queue: Array<SegmentFile> } {
  const fileQueue: SegmentFile[] = []
  if (watching.length > 0) {
    const { bucketRegion, bucketName, bucketPath } = watching[0]
    const { currentSegment, files } = await findAllFiles(bucketRegion, bucketName, bucketPath, segment, maxSegments)
    watcherLogChild.info({ currentSegment, files })
    if (segment !== currentSegment) {
      segment = currentSegment

      files.map((file) => {
        watcherLogChild.info({ file })
      })

      fileQueue.concat(files)
    }
  } else {
    nothingThrottled()
  }

  return { currentSegment: currentSegment, fileQueue }
}

// NOTE: Does this mean multiple invocations of this function or a single one.
// setTimeout ensures that there's a delay of at least x milliseconds.
let segment = 0
const fileQueue: SegmentFile[] = []


let watcherTimer = setTimeout(async function watcher() {
  const files = await detectNewFiles(segment, watching)
  watcherTimer = setTimeout(watcher, timeoutFrequency)
}, timeoutFrequency)
logger.info(`Start watcher ${watcherTimer}`)
*/
