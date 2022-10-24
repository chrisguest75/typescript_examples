import 'aws-sdk-client-mock-jest'
import { mockClient } from 'aws-sdk-client-mock'
import {
  S3Client,
  ListObjectsCommand,
  ListObjectsCommandOutput,
  CreateMultipartUploadCommand,
  UploadPartCommand,
} from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'

// Using the following functions means we don't need a seperate if block to check undefined.  
// This occurs if we're using "strictNullChecks": true.
//expect(files).toBeDefined()
//if (files != undefined) {
//}

function expect_toBeDefined<T>(arg: T): asserts arg is NonNullable<T> {
  expect(arg).toBeDefined()
  //if (arg == null)  throw new Error("arg is null");
}

function expect_not_toBeDefined<T>(arg: unknown): asserts arg is undefined | null {
  expect(arg).not.toBeDefined()
  //if (arg == null)  throw new Error("arg is not null");
}

// is it right locally declare the type?
declare type CommandResponse<TOutput> = Partial<TOutput> | PromiseLike<Partial<TOutput>>;

describe('Test S3 client', () => {
  it('should upload to s3', async () => {
    const s3Mock = mockClient(S3Client)
    s3Mock.on(CreateMultipartUploadCommand).resolves({ UploadId: '1' })
    s3Mock.on(UploadPartCommand).resolves({ ETag: '1' })

    const s3Upload = new Upload({
      client: new S3Client({}),
      params: {
        Bucket: 'mock',
        Key: 'test',
        Body: 'x'.repeat(6 * 1024 * 1024), // 6 MB
      },
    })

    s3Upload.on('httpUploadProgress', (progress) => {
      console.log(progress)
    })

    await s3Upload.done()
  })

  it('should find files in s3', async () => {
    const s3Mock = mockClient(S3Client)
    s3Mock.on(ListObjectsCommand).resolves({
      $metadata: {
        httpStatusCode: 200,
        requestId: undefined,
        extendedRequestId: 'not_an_extended_requestId',
        cfId: undefined,
        attempts: 1,
        totalRetryDelay: 0,
      },
      Contents: [
        {
          Key: 'folder/myfile.dat',
          LastModified: new Date(),
          ETag: '"C4D7E7C8058B454198CDCF858E97A8E6"',
          ChecksumAlgorithm: undefined,
          Size: 9275,
          StorageClass: 'STANDARD',
          Owner: { DisplayName: 'test', ID: 'E7AE514302744EF58890D1F069FC4685d4705be1eb35242b4fdfb9f4f9d' },
        },
      ],
    } as CommandResponse<ListObjectsCommandOutput>)

    const s3Client = new S3Client({ region: 'us-east-1' })
    const command = new ListObjectsCommand({ Bucket: 'mybucket', Prefix: '/myprefix' })
    const result = await s3Client.send(command)
    const files = result.Contents

    // use of these functions is so we can leave "strictNullChecks": true.
    // expect_not_toBeDefined(files)
    expect_toBeDefined(files)

    const { Key, Size } = files[0]
    expect(Key).toEqual('folder/myfile.dat')
    expect(Size).toEqual(9275)
  })
})
