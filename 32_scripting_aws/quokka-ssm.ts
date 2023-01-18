import {
  SSMClient,
  GetParameterCommand,
  PutParameterCommand,
  GetParameterCommandInput,
  PutParameterCommandInput,
} from '@aws-sdk/client-ssm'
import { z } from 'zod'
import { fromIni } from '@aws-sdk/credential-providers'
import { promisify } from 'util'

const region = process.env.REGION || 'us-east-1'
const profile = process.env.AWS_PROFILE || 'default'

const credentials = fromIni({ profile })

const ConfigZod = z.object({
  segmentSize: z.number().min(1).max(100),
  folderPath: z.string().min(1).max(256),
  url: z.string().url(),
})
type Config = z.infer<typeof ConfigZod>

async function PutVariable(region: string, name: string, value: Config) {
  const client = new SSMClient({ region })
  ConfigZod.parse(value)
  const input: PutParameterCommandInput = {
    Name: name,
    Value: JSON.stringify(value),
    Type: 'String',
    Overwrite: true,
  }
  const command = new PutParameterCommand(input)
  const response = await client.send(command)
  console.log(response)
}

async function GetVariable(region: string, name: string) {
  const client = new SSMClient({ region })
  const input: GetParameterCommandInput = {
    Name: name,
  }
  const command = new GetParameterCommand(input)
  const response = await client.send(command)
  console.log(response)
  return new Promise((resolve, reject) => {
    const config = JSON.parse(response.Parameter?.Value)
    ConfigZod.parse(config)
    resolve(config)
  })
}

async function test() {
  const putResponse = await PutVariable(region, 'christest', {
    segmentSize: 10,
    folderPath: 'test',
    url: 'https://www.google.com',
  })
  console.log(putResponse)
  const getResponse = await GetVariable(region, 'christest')
  console.log(getResponse)
}
test()
