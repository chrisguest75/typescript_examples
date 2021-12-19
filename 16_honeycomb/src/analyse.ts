import path = require('path')
import fs = require('fs')
import { logger } from './logger'
import Probe from './probe'
import { FileProcessor } from './find'
import opentelemetry from '@opentelemetry/api'

export default class Analyse implements FileProcessor {
  includeGOP = false
  outPath = './'

  constructor(outPath: string, includeGOP: boolean) {
    this.includeGOP = includeGOP
    this.outPath = outPath
  }

  async analyse(fullPath: string, parentSpan: any): Promise<string> {
    const tracerName = process.env.HONEYCOMB_TRACERNAME ?? 'default'
    const ctx = opentelemetry.trace.setSpan(opentelemetry.context.active(), parentSpan)
    const activeSpan = opentelemetry.trace.getTracer(tracerName).startSpan('analyse', undefined, ctx)
    activeSpan?.setAttribute('mediapath', fullPath)

    return new Promise((resolve, reject) => {
      logger.info(`Analyse ${fullPath}`)
      const probe = new Probe(fullPath)

      const output = probe.analyze(this.includeGOP, parentSpan).then((output) => {
        const outFile = `${probe.md5}.json`
        const fullOutPath = path.join(this.outPath, outFile)
        logger.info(`Writing ${fullOutPath}`)

        // write to outpath
        if (!fs.existsSync(this.outPath)) {
          fs.mkdirSync(this.outPath)
        }

        fs.writeFileSync(fullOutPath, output)
        logger.info(`Created ${fullOutPath}`)
        activeSpan?.end()
        resolve(fullPath)
      })
    })
  }
}
