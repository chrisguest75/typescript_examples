import { logger } from "./logger";

function secondary(log: typeof logger) {
    log.info("Enter secondary")
    
    let array = [1,2,3,4]
    array.forEach(value => {
        log.child({"value":value}).info("Looping in secondary")
    })
    
    log.info("Exit secondary")
}

function main() {
    secondary(logger.child({"function":"secondary"}))

    logger.trace("TRACE - level message")
    logger.debug("DEBUG - level message")
    logger.info("INFO - level message")
    logger.warn("WARN - level message")
    logger.error("ERROR - level message")
    logger.fatal("FATAL - level message")

    logger.child({"extra":"this is extra"}).trace("TRACE - level message")
    logger.child({"extra":"this is extra"}).debug("DEBUG - level message")
    logger.child({"extra":"this is extra"}).info("INFO - level message")
    logger.child({"extra":"this is extra"}).warn("WARN - level message")
    logger.child({"extra":"this is extra"}).error("ERROR - level message")
    logger.child({"extra":"this is extra"}).fatal("FATAL - level message")

    secondary(logger.child({"function":"secondary"}))    
}

logger.info(`Pino:${logger.version}`);
main()
//logger.flushSync();
// NOTE: Using process.exit does not flush buffers.  I need to work this out. 
//process.exit(1);

