import { logger } from './logger.js'
import * as dotenv from 'dotenv'
import minimist from 'minimist'
import { configuration, loadConfig, writeConfig, Config } from './ssm.mjs'
/*
main
*/
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function main(args: minimist.ParsedArgs) {
  logger.info({ ...configuration, message: 'Module Await Config' })
  logger.trace('TRACE - level message')
  logger.debug('DEBUG - level message')
  logger.info('INFO - level message')
  logger.warn('WARN - level message')
  logger.error('ERROR - level message')
  logger.fatal('FATAL - level message')
  logger.info({ node_env: process.env.NODE_ENV })
  logger.info({ 'node.version': process.version })

  if (args['throwError']) {
    throw new Error("I'm an error")
  }

  const ssmName = args['ssmName']

  let loadedConfig: Config | undefined = undefined

  if (args['ssmRead']) {
    loadedConfig = await loadConfig(ssmName)
    logger.info({ ...loadedConfig, message: 'Loaded Config' })
  }

  if (args['ssmWrite']) {
    let config: Config = {
      segmentSize: 10,
      folderPath: 'test',
      url: 'https://www.google.com',
      modified: Date.now(),
    }

    if (loadedConfig) {
      config = loadedConfig
      config.segmentSize = config.segmentSize + 1
      config.modified = Date.now()
    }
    await writeConfig(ssmName, config)
    logger.info({ ...config, message: 'Written Config' })
  }

  // filter envs by SSM_ prefix and log
  const ssmEnv = Object.keys(process.env).filter((key) => key.startsWith('SSM_'))
  logger.info({ ssmEnv })

  for (const key of ssmEnv) {
    logger.info({ key, value: process.env[key] })
  }

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
const args: minimist.ParsedArgs = minimist(process.argv.slice(2), {
  string: ['ssmName'],
  boolean: ['verbose', 'ssmRead', 'ssmWrite', 'throwError'],
  default: { verbose: true, throwError: false, ssmRead: false, ssmWrite: false, ssmName: 'testssmdocument' },
})
try {
  await main(args)
  process.exit(0)
} catch (error) {
  logger.error(error)
  process.exit(1)
}
