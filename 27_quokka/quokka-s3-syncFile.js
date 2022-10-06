// TODO: Convert this to typescript.

const S3Client = require('@aws-sdk/client-s3');
const S3SyncClient = require('s3-sync-client');

const creds = require('@aws-sdk/credential-providers');

const region = process.env.REGION;
const bucketName = process.env.SYNCTOBUCKETNAME;
const folderPrefix = process.env.SYNCTOFOLDERPREFIX;
const profile = process.env.AWS_PROFILE;

const credentials = creds.fromIni({profile});

const syncHandler = async (region, bucketName, bucketPath) => {
    const client = new S3Client.S3Client({
        region,
    })
    const { sync } = new S3SyncClient({ client });

    await sync("./sync", `s3://${bucketName}/${bucketPath}`, {
        commandInput: {
            ACL: 'public-read',
            CacheControl: 'public, must-revalidate, max-age=0',
        }
      },)
    console.log(`s3://${bucketName}/${bucketPath} synced`)
}

syncHandler(region, bucketName, folderPrefix)
