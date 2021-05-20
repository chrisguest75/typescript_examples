import * as pino from "pino";
import { APP_ID, LOG_LEVEL } from "./Config";

export const logger = pino({
  name: 'app-name',
  level: 'debug'
});

