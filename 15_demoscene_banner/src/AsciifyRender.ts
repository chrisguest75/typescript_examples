import AsciiRenderer from "./interfaces/AsciiRenderer";
import asciifyImage = require("asciify-image");
import { logger } from "./logger";

export default class AsciifyRender implements AsciiRenderer {
    constructor() {}
  
    async render(inFile: string, columns: number, rows: number): Promise<string> {
      // asciify
      logger.info("enter render");
      
      let out = await asciifyImage(inFile, { fit: "box", width: columns / 2, height: rows });
      let realOut = "";
      if (Array.isArray(out)) {
        realOut = out[0]
      } else {
        realOut = out
      }
  
      return new Promise((resolve, reject) => {
        resolve(realOut);
      });
    }
  }