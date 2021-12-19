import path = require("path");
import fs = require("fs");
import { logger } from "./logger";
import Probe from "./probe";
import { FileProcessor } from "./find";
import opentelemetry from '@opentelemetry/api'

export default class Analyse implements FileProcessor {
    includeGOP: boolean = false
    outPath: string = "./"

    constructor(outPath: string, includeGOP: boolean) {
        this.includeGOP = includeGOP
        this.outPath = outPath
    }

    async analyse(fullPath: string, parentSpan: any): Promise<string> {
      const tracerName = process.env.HONEYCOMB_TRACERNAME ?? 'default'
      const ctx = opentelemetry.trace.setSpan(opentelemetry.context.active(), parentSpan)
      const activeSpan = opentelemetry.trace.getTracer(tracerName).startSpan('analyse', undefined, ctx)
      activeSpan?.setAttribute("mediapath", fullPath);
        return new Promise((resolve, reject) => {
          logger.info(`Analyse ${fullPath}`);
          let probe = new Probe(fullPath);
      
          let output = probe.analyze(this.includeGOP).then((output) => {
            let outFile = `${probe.md5}.json`;
            let fullOutPath = path.join(this.outPath, outFile);
            logger.info(`Writing ${fullOutPath}`);
            
            // write to outpath
            if (!fs.existsSync(this.outPath)) {
              fs.mkdirSync(this.outPath);
            }
      
            fs.writeFileSync(fullOutPath, output);
            logger.info(`Created ${fullOutPath}`);
            activeSpan?.end()
            resolve(fullPath);
          });
        });
      }
    
    
}

