
import { spawnSync } from "child_process";
import AsciiRenderer from "./interfaces/AsciiRenderer";
import { logger } from "./logger";

export default class Jp2aRender implements AsciiRenderer {
    constructor() {}
  
    async jp2aVersion() {
      const spawnResult = spawnSync("jp2a", ["--version"], {
        cwd: process.cwd(),
        env: process.env,
        stdio: "pipe",
        encoding: "utf-8",
      });
      logger.info({ stdout: spawnResult.output });
      if (spawnResult.status !== 0) {
        throw new Error(`jp2a exited with ${spawnResult.status}`);
      } else {
        return spawnResult.output;
      }
    }
  
    async jp2aImage(width: number, file: string, version: boolean) {
      let options = [`--width=${width}`, "--invert", file];
      if (version == true) {
        options = [
          `--width=${width}`,
          "--colors",
          "--color-depth=24",
          "--fill",
          file,
        ];
      }
      logger.info({ options: "jp2a " + options.join(" ") });
      const spawnResult = spawnSync("jp2a", options, {
        cwd: process.cwd(),
        env: process.env,
        stdio: "pipe",
        encoding: "utf-8",
      });
      //logger.info({"stdout":spawnResult.output});
      if (spawnResult.status !== 0) {
        throw new Error(`jp2a exited with ${spawnResult.status}`);
      } else {
        return spawnResult.output;
      }
    }
  
    async render(inFile: string, columns: number, rows: number): Promise<string> {
      // jp2a
      await this.jp2aVersion();
      // TODO: if 1.0.6 need to fix colours
      // right now always use 24 bit colour 
      let colours24bit = true;
      let out = await this.jp2aImage(columns, inFile, colours24bit);
  
      let realOut = "Error";
      if (out != null) {
         realOut = out[1] || ""
      }
  
      return new Promise((resolve, reject) => {
        resolve(realOut);
      });
    }
  }