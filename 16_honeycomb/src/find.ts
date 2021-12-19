import path = require('path')
import fs = require('fs')
import { FileInfoResult } from 'prettier'
import { logger } from './logger'
import opentelemetry from '@opentelemetry/api'

export interface FileProcessor {
  analyse(fullPath: string, parentSpan: any): Promise<string>
}
export default class Find {
  // constructor() {}

  async findSync(folder: string, pattern: string, recurse: boolean, processor: FileProcessor, parentSpan: any) {
    const tracerName = process.env.HONEYCOMB_TRACERNAME ?? 'default'
    const ctx = opentelemetry.trace.setSpan(opentelemetry.context.active(), parentSpan)
    const activeSpan = opentelemetry.trace.getTracer(tracerName).startSpan('findSync', undefined, ctx)

    try {
      if (!fs.statSync(folder).isDirectory()) {
        // single file????
        if (path.basename(folder).match(pattern)) {
          logger.info(`Process single file ${folder}`)
          await processor.analyse(folder, activeSpan)
        } else {
          logger.info(`No pattern match on single file ${folder}`)
        }
      } else {
        const files = fs.readdirSync(folder)

        for (let i = 0; i < files.length; i++) {
          const file = files[i]
          const relative = path.join(folder, file)
          const fullpath = path.resolve(relative)
          const stat = fs.statSync(fullpath)
          const directory = stat.isDirectory()
          if (directory) {
            if (recurse) {
              this.findSync(relative, pattern, recurse, processor, parentSpan)
            } else {
              logger.child({ directory: directory }).info(fullpath)
            }
          } else {
            if (path.basename(fullpath).match(pattern)) {
              logger.info(`Process ${fullpath}`)
              await processor.analyse(fullpath, activeSpan)
            } else {
              logger.info(`No pattern match ${fullpath}`)
            }
          }
        }
      }
    } catch (error) {
      logger.error(`Failed to list directory '${folder}'`, error)
      throw error
    } finally {
      activeSpan?.end()
    }
  }
}
