import { S3Client, ListObjectsCommand } from '@aws-sdk/client-s3'

interface SegmentFile {
  file: string
  segment: number
  size: number
}

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
