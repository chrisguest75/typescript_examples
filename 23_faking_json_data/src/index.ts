import { logger } from './logger'
import * as dotenv from 'dotenv'
import minimist from 'minimist'
import { randNumber, randBoolean, randUuid, randFilePath, randEmail, randFullName } from '@ngneat/falso'
import * as fs from 'fs'
import * as path from 'path'
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

  // the output
  const outPath = './out'
  if (!fs.existsSync(outPath)) {
    fs.mkdirSync(outPath)
  }

  const count = Number.parseInt(args['count'])
  if (count <= 0) {
    logger.warn('File count is not set')
  } else {
    logger.info(`Writing ${count} files`)
  }
  for (let i = 0; i < count; i++) {
    const file = {
      size: randNumber({ min: 10, max: 2000 }),
      id: randUuid(),
      file: randFilePath(),
      deleted: randBoolean(),
      email: randEmail(),
      name: randFullName(),
    }

    const filejson = JSON.stringify(file) + '\n'
    if (args['append']) {
      const filepath = path.join(outPath, 'file.json')
      if (count <= 0) {
        fs.writeFileSync(filepath, filejson)
      } else {
        fs.appendFileSync(filepath, filejson)
      }
    } else {
      const filepath = path.join(outPath, `file${i}.json`)
      fs.writeFileSync(filepath, filejson)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return new Promise((resolve, reject) => {
    logger.info('Finishing')
    resolve('Complete')
  })
}

/*
Entrypoint
*/
// load config
dotenv.config()
logger.info(`Pino:${logger.version}`)
const args: minimist.ParsedArgs = minimist(process.argv.slice(2), {
  string: ['out', 'type', 'count'],
  boolean: ['verbose', 'append'],
  default: { count: '3', append: true },
})
main(args)
  .then(() => {
    process.exit(0)
  })
  .catch((e) => {
    logger.error(e)
    process.exit(1)
  })
