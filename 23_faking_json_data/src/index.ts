import { logger } from './logger'
import * as dotenv from 'dotenv'
import minimist from 'minimist'
import { randEmail, randFullName } from '@ngneat/falso'
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

  const user = { email: randEmail(), name: randFullName() }
  const emails = randEmail({ length: 10 })
  logger.info({ user, emails })

  const jsonuser = JSON.stringify(user)
  const jsonemails = JSON.stringify(emails)
  const fileuser = path.join(outPath, 'user.json')
  const fileemails = path.join(outPath, 'emails.json')
  fs.writeFileSync(fileuser, jsonuser)
  fs.writeFileSync(fileemails, jsonemails)

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
const args: minimist.ParsedArgs = minimist(process.argv.slice(2))
main(args)
  .then(() => {
    process.exit(0)
  })
  .catch((e) => {
    logger.error(e)
    process.exit(1)
  })
