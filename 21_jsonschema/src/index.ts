import { logger } from './logger'
import * as dotenv from 'dotenv'
import minimist from 'minimist'
import * as fs from 'fs'
import * as path from 'path'
import { Validator } from 'jsonschema'
import { compile, compileFromFile } from 'json-schema-to-typescript'

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
  // const outPath = args['out']
  // if (!fs.existsSync(outPath)) {
  //   fs.mkdirSync(outPath)
  // }

  // validate the schema first
  const v = new Validator()

  // read the schema details
  const schemaFilepath = args['schema']
  logger.info({ schemaFilepath: schemaFilepath })
  const schema = JSON.parse(fs.readFileSync(schemaFilepath, 'utf-8'))

  // read the example
  const jsonFilepath = args['in']
  logger.info({ jsonFilepath: jsonFilepath })
  const json = JSON.parse(fs.readFileSync(jsonFilepath, 'utf-8'))

  v.addSchema(schema, '/schema')
  const validation = v.validate(json, schema)

  if (validation.errors.length) {
    logger.error(validation.errors)
  } else {
    // compile from file
    const ts = await compileFromFile(schemaFilepath)
    const outFilepath = args['out']

    // the output
    const outBasePath = path.dirname(outFilepath)
    if (!fs.existsSync(outBasePath)) {
      logger.info({ outBasePath: outBasePath })
      fs.mkdirSync(outBasePath, { recursive: true })
    }

    logger.info({ outFilepath: outFilepath })
    fs.writeFileSync(outFilepath, ts)
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
  string: ['in', 'out', 'schema'],
  default: { in: './json/book.json', out: './types/book/book.d.ts', schema: './schema/book.schema.json' },
})
main(args)
  .then(() => {
    process.exit(0)
  })
  .catch((e) => {
    logger.error(e)
    process.exit(1)
  })
