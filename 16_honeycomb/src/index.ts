import minimist from "minimist";
import path = require("path");
import fs = require("fs");
import { logger } from "./logger";
import Find from "./find";
import Analyse from "./analyse";
import * as dotenv from 'dotenv';

import process from 'process';
import { Metadata, credentials } from "@grpc/grpc-js";
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc";
import opentelemetry from "@opentelemetry/api";

// Main
async function main(args: minimist.ParsedArgs): Promise<string> {
  logger.debug("enter main:" + args._);

  //opentelemetry.diag.setLogger(new opentelemetry.DiagConsoleLogger(), opentelemetry.DiagLogLevel.WARN);

  const metadata = new Metadata()
  let apikey = process.env.HONEYCOMB_APIKEY ?? '';
  let dataset = process.env.HONEYCOMB_DATASET ?? '';
  let servicename = process.env.HONEYCOMB_SERVICENAME ?? '';
  logger.info(`${apikey} for ${dataset}`);
  metadata.set('x-honeycomb-team', apikey);
  metadata.set('x-honeycomb-dataset', dataset);
  const traceExporter = new OTLPTraceExporter({
    url: 'grpc://api.honeycomb.io:443/',
    credentials: credentials.createSsl(),
    metadata
  });
  
  const sdk = new NodeSDK({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: servicename,
    }),
    traceExporter,
    instrumentations: [getNodeAutoInstrumentations()]
  });
  
  await sdk.start()
    .then(() => logger.info('Tracing initialized'))
    .catch((error) => logger.error('Error initializing tracing', error));
  
  process.on('SIGTERM', () => {
    sdk.shutdown()
      .then(() => logger.info('Tracing terminated'))
      .catch((error) => logger.error('Error terminating tracing', error))
      .finally(() => process.exit(0));
  });

  
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
    let activeSpan = opentelemetry.trace.getSpan(opentelemetry.context.active());
    activeSpan?.setAttribute("path", basePath);
    let analyse = new Analyse(args["out"], args["includegop"])
    
    logger.info(`Find files in ${basePath}`);

    let find = new Find();
    find.findSync(basePath, ".*", true, analyse);
  
    activeSpan?.end();
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
dotenv.config();

logger.info(args);
main(args)
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    logger.error(e);
    process.exit(1);
  });

