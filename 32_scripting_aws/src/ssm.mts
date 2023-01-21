import {
  SSMClient,
  GetParameterCommand,
  PutParameterCommand,
  GetParameterCommandInput,
  PutParameterCommandInput,
} from '@aws-sdk/client-ssm'
import { z } from 'zod'
import { logger } from './logger.js'

const ConfigZod = z.object({
  segmentSize: z.number().min(1).max(100),
  folderPath: z.string().min(1).max(256),
  url: z.string().url(),
  modified: z.optional(z.number()),
})
export type Config = z.infer<typeof ConfigZod>

export async function loadConfig(name: string) {
  const region = process.env.AWS_REGION || 'us-east-1'
  const paramterName = name

  const getResponse = await GetVariable(region, paramterName)
  logger.info(getResponse)
  return getResponse
}

export async function writeConfig(name: string, config: Config) {
  const region = process.env.AWS_REGION || 'us-east-1'
  const paramterName = name

  const putResponse = await PutVariable(region, paramterName, config)
  logger.info(putResponse)
}

export async function PutVariable(region: string, name: string, value: Config) {
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
  logger.info(response)
}

export async function GetVariable(region: string, name: string): Promise<Config> {
  const client = new SSMClient({ region })
  const input: GetParameterCommandInput = {
    Name: name,
  }
  const command = new GetParameterCommand(input)
  const response = await client.send(command)
  logger.info(response)
  return new Promise((resolve, reject) => {
    const config = JSON.parse(response.Parameter?.Value ? response.Parameter?.Value : '{}')
    ConfigZod.parse(config)
    resolve(config)
  })
}
