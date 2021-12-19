import minimist from "minimist";
import path = require("path");
import fs = require("fs");
import { logger } from "./logger";
import Find from "./find";
import Analyse from "./analyse";
import { configureHoneycomb, shutdownHoneycomb } from './tracing'
import opentelemetry from '@opentelemetry/api'
import * as dotenv from 'dotenv';

// Main
async function main(args: minimist.ParsedArgs): Promise<string> {
  logger.debug("enter main:" + args._);
  const tracerName = process.env.HONEYCOMB_TRACERNAME ?? 'default'
  const apikey = process.env.HONEYCOMB_APIKEY ?? ''
  const dataset = process.env.HONEYCOMB_DATASET ?? ''
  const servicename = process.env.HONEYCOMB_SERVICENAME ?? ''
  await configureHoneycomb(apikey, dataset, servicename)
  
  let basePath = "";
  if (args["path"] == null) {
    throw new Error("Path parameter is missing")
  }
  if (args["out"] == null) {
    throw new Error("Out parameter is missing")
  }
  basePath = args["path"];
  const activeSpan = opentelemetry.trace.getTracer(tracerName).startSpan('main')
  if (activeSpan == undefined) {
    logger.error('No active span')
  }
  activeSpan?.setAttribute("basepath", basePath);
  let analyse = new Analyse(args["out"], args["includegop"])
    
  logger.info(`Find files in ${basePath}`);

  let find = new Find();
  await find.findSync(basePath, ".*", true, analyse, activeSpan);

  activeSpan?.end();
  logger.debug("exit main");

  return new Promise((resolve, reject) => {
    shutdownHoneycomb()
      .then(() => {
        resolve('Complete')
      })
      .catch((e) => {
        logger.error(e)
        reject('Error')
      })
  })
}

dotenv.config();
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

