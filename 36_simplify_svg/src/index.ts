import { logger } from './logger.js'
import * as dotenv from 'dotenv'
import minimist from 'minimist'
import fs from 'fs'
//import { simplify } from 'simplify-js'
import simplifySvgPath from '@luncheon/simplify-svg-path'
import { SVGPathData, SVGCommand } from 'svg-pathdata'

function extractPoints(path: string): { x: number; y: number }[] {
  const pathData = new SVGPathData(path).toAbs()
  const points = []
  for (const command of pathData.commands) {
    if (
      command.type === SVGPathData.MOVE_TO ||
      command.type === SVGPathData.LINE_TO ||
      command.type === SVGPathData.CURVE_TO
    ) {
      const p = { x: command.x, y: command.y }
      points.push(p)
    } else {
      console.log('command not supported', command)
    }
  }
  return points
}

/*function pathFromPoints(path: Point[]): string {
  const pathData = new SVGPathData(path).toAbs()
  const points = []
  for (const command of pathData.commands) {
    if (
      command.type === SVGPathData.MOVE_TO ||
      command.type === SVGPathData.LINE_TO ||
      command.type === SVGPathData.CURVE_TO
    ) {
      const p = { x: command.x, y: command.y }
      points.push(p)
    } else {
      console.log('command not supported', command)
    }
  }
  return points
}*/

/*
Entrypoint
*/
export async function main(args: minimist.ParsedArgs) {
  logger.trace('TRACE - level message')
  logger.debug('DEBUG - level message')
  logger.info('INFO - level message')
  logger.warn('WARN - level message')
  logger.error('ERROR - level message')
  logger.fatal('FATAL - level message')
  logger.info({ node_env: process.env.NODE_ENV })
  logger.info({ 'node.version': process.version })

  // load the file
  const inputPath = args['in']
  if (inputPath === '') {
    throw new Error('input file not provided')
  }
  const outputPath = args['out']
  if (outputPath === '') {
    throw new Error('output file not provided')
  }
  const frames = JSON.parse(fs.readFileSync(inputPath, 'utf8'))

  // parse the file
  for (const frame of frames.frames) {
    logger.info({ frame: frame.number, name: frame.name })
    const points = extractPoints(frame.path)

    const newpath = simplifySvgPath(points, { closed: true, tolerance: 1.5, precision: 0.1 })
    const newpoints = extractPoints(newpath)

    //const newpoints = simplify(points, 1.5, true)
    //frame.path = newpath

    logger.info({ old: points.length, new: newpoints.length })
  }

  // save the file pretty printed
  fs.writeFileSync(outputPath, JSON.stringify(frames, null, 2), 'utf8')
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

// load config
dotenv.config()
logger.info(`Pino:${logger.version}`)
const args: minimist.ParsedArgs = minimist(process.argv.slice(2), {
  string: ['in', 'out'],
  boolean: ['verbose'],
  default: { verbose: true, in: '', out: '' },
})

try {
  await main(args)
  process.exit(0)
} catch (error) {
  logger.error(error)
  process.exit(1)
}
