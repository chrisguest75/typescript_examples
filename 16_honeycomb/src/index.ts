import minimist from "minimist";
import path = require("path");
import fs = require("fs");
import { logger } from "./logger";
import Find from "./find";
import Analyse from "./analyse";

// Main
async function main(args: minimist.ParsedArgs): Promise<string> {
  logger.debug("enter main:" + args._);

  return new Promise((resolve, reject) => {
    let basePath = "";
    if (args["path"] == null) {
      reject("Path parameter is missing");
      throw new Error("Path parameter is missing")
    }
    if (args["out"] == null) {
      reject("Out parameter is missing");
      throw new Error("Out parameter is missing")
    }
  
    basePath = args["path"];
    let analyse = new Analyse(args["out"], args["includegop"])
    
    logger.info(`Find files in ${basePath}`);

    let find = new Find();
    find.findSync(basePath, ".*", true, analyse);
  
    logger.debug("exit main");
    //resolve("Complete");
  });
}

let args: minimist.ParsedArgs = minimist(process.argv.slice(2), {
  string: ["path", "out"],
  boolean: ["verbose", "includegop"],
  //alias: { v: 'version' }
});
if (args["verbose"]) {
  logger.level = "debug";
} else {
  logger.level = "info";
}
logger.info(args);
main(args)
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    logger.error(e);
    process.exit(1);
  });
