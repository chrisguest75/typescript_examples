import path = require("path");
import fs = require("fs");
import { logger } from "./logger";
import Probe from "./probe";
import { FileProcessor } from "./find";

export default class Analyse implements FileProcessor {
    includeGOP: boolean = false
    outPath: string = "./"

    constructor(outPath: string, includeGOP: boolean) {
        this.includeGOP = includeGOP
        this.outPath = outPath
    }

    async analyse(fullPath: string): Promise<string> {
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
            resolve(fullPath);
          });
        });
      }
    
    
}

