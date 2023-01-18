import {
  SSMClient,
  GetParameterCommand,
  PutParameterCommand,
  GetParameterCommandInput,
  PutParameterCommandInput,
} from '@aws-sdk/client-ssm'
import { z } from 'zod'
import { logger } from './logger'
import * as dotenv from 'dotenv'
import minimist from 'minimist'

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
  logger.info(response)
}

async function GetVariable(region: string, name: string) {
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

/*
main
*/
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function main(args: minimist.ParsedArgs) {
  logger.trace('TRACE - level message')
  logger.debug('DEBUG - level message')
  logger.info('INFO - level message')
  logger.warn('WARN - level message')
  logger.error('ERROR - level message')
  logger.fatal('FATAL - level message')
  logger.info({ node_env: process.env.NODE_ENV })
  logger.info({ 'node.version': process.version })

  const region = process.env.AWS_REGION || 'us-east-1'
  const paramterName = process.env.PARAMETERNAME || 'christest'

  const putResponse = await PutVariable(region, paramterName, {
    segmentSize: 10,
    folderPath: 'test',
    url: 'https://www.google.com',
  })
  logger.info(putResponse)
  const getResponse = await GetVariable(region, paramterName)
  logger.info(getResponse)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return new Promise((resolve, reject) => {
    logger.info('Finishing')
    resolve('Complete')
  })
}

process.on('exit', async () => {
  logger.warn('exit signal received')
  //process.exit(1)
})

process.on('uncaughtException', async (error: Error) => {
  logger.error(error)
  // for nice printing
  console.log(error)
  process.exit(1)
})

process.on('unhandledRejection', async (reason, promise) => {
  logger.error({
    promise: promise,
    reason: reason,
    msg: 'Unhandled Rejection',
  })
  console.log(reason)
  process.exit(1)
})

/*
Entrypoint
*/
// load config
dotenv.config()
logger.info(`Pino:${logger.version}`)
const args: minimist.ParsedArgs = minimist(process.argv.slice(2))
main(args)
  .then(() => {
    process.exit(0)
  })
  .catch((e) => {
    logger.error(e)
    process.exit(1)
  })
