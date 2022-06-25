import { logger } from './logger'
import * as dotenv from 'dotenv'
import minimist from 'minimist'
import {
  randNumber,
  randBetweenDate,
  randBoolean,
  randUuid,
  randFilePath,
  randEmail,
  randFullName,
} from '@ngneat/falso'
import * as fs from 'fs'
import * as path from 'path'
import { EJSON } from 'bson'
import jsf from 'json-schema-faker'

function addDays(startDate: Date, days: number) {
  const result = new Date(startDate)
  result.setDate(result.getDate() + days)
  return result
}
/*
fromschema:  Generate json from json schema  
 */
function fromschema(args: minimist.ParsedArgs) {
  logger.info(`Creating fromschema`)

  const schemaFilepath = args['in']
  logger.info({ schemaFilepath: schemaFilepath })
  const schema = JSON.parse(fs.readFileSync(schemaFilepath, 'utf-8'))

  const outPath = args['out']
  if (!fs.existsSync(outPath)) {
    logger.info(`Creating ${outPath}`)
    fs.mkdirSync(outPath)
  }

  const count = Number.parseInt(args['count'])
  if (count <= 0) {
    logger.warn('File count is not set')
  } else {
    logger.info(`Writing ${count} files`)
  }
  for (let i = 0; i < count; i++) {
    const file = jsf.generate(schema)
    let filejson = ''
    if (args['mongo']) {
      filejson = EJSON.stringify(file, { relaxed: false }) + '\n'
    } else {
      filejson = JSON.stringify(file) + '\n'
    }

    if (args['append']) {
      const filepath = path.join(outPath, 'file.json')
      if (i <= 0) {
        logger.info(`Creating a new file ${filepath} for appending`)
        fs.writeFileSync(filepath, filejson, { encoding: 'utf8', flag: 'w' })
      } else {
        fs.appendFileSync(filepath, filejson)
      }
    } else {
      const filepath = path.join(outPath, `file${i}.json`)
      logger.info(`Creating a new file ${filepath}`)
      fs.writeFileSync(filepath, filejson, { encoding: 'utf8', flag: 'w' })
    }
  }
}

/*
filestype: Generate files json
 */
function filestype(args: minimist.ParsedArgs) {
  logger.info(`Creating filestype`)

  const outPath = args['out']
  if (!fs.existsSync(outPath)) {
    logger.info(`Creating ${outPath}`)
    fs.mkdirSync(outPath)
  }

  const count = Number.parseInt(args['count'])
  if (count <= 0) {
    logger.warn('File count is not set')
  } else {
    logger.info(`Writing ${count} files`)
  }
  for (let i = 0; i < count; i++) {
    const startDate = randBetweenDate({ from: new Date('01/01/2021'), to: addDays(new Date(), -10) })
    const updateDate = randBetweenDate({ from: startDate, to: new Date() })
    const file = {
      size: randNumber({ min: 10, max: 2000 }),
      id: randUuid(),
      file: randFilePath(),
      deleted: randBoolean(),
      email: randEmail(),
      name: randFullName(),
      created: startDate,
      updated: updateDate,
    }
    let filejson = ''
    if (args['mongo']) {
      filejson = EJSON.stringify(file, { relaxed: false }) + '\n'
    } else {
      filejson = JSON.stringify(file) + '\n'
    }

    if (args['append']) {
      const filepath = path.join(outPath, 'file.json')
      if (i <= 0) {
        logger.info(`Creating a new file ${filepath} for appending`)
        fs.writeFileSync(filepath, filejson, { encoding: 'utf8', flag: 'w' })
      } else {
        fs.appendFileSync(filepath, filejson)
      }
    } else {
      const filepath = path.join(outPath, `file${i}.json`)
      logger.info(`Creating a new file ${filepath}`)
      fs.writeFileSync(filepath, filejson, { encoding: 'utf8', flag: 'w' })
    }
  }
}

/*
main
*/
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function main(args: minimist.ParsedArgs) {
  // logger.trace('TRACE - level message')
  // logger.debug('DEBUG - level message')
  // logger.info('INFO - level message')
  // logger.warn('WARN - level message')
  // logger.error('ERROR - level message')
  // logger.fatal('FATAL - level message')

  // the output
  if (!['fromschema', 'files'].includes(args['type'])) {
    const type = args['type']
    logger.error(`${type} not recognised as type`)
  } else {
    if (args['type'] == 'fromschema') {
      fromschema(args)
    }
    if (args['type'] == 'files') {
      filestype(args)
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
  string: ['out', 'in', 'type', 'count', 'out'],
  boolean: ['verbose', 'append', 'mongo'],
  default: { count: '3', append: true, mongo: false, out: './out' },
})
main(args)
  .then(() => {
    process.exit(0)
  })
  .catch((e) => {
    logger.error(e)
    process.exit(1)
  })
