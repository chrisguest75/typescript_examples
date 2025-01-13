import { logger } from './logger'
import { poissonArrivalGenerator } from './poisson'

const last: { last: Date } = { last: new Date() }

function callback(generator: Generator, last: { last: Date }) {
  const next = generator.next().value || new Date()
  const interval = next.getTime() - last.last.getTime()
  logger.info(`last ${last.last} next ${next} with interval ${interval}`)
  last.last = next

  setTimeout(() => {
    callback(generator, last)
  }, interval)
}

export function simulate() {
  const baseTime = new Date()
  const rate = 2
  const timePeriod = 30
  const generator = poissonArrivalGenerator(baseTime, rate, timePeriod)

  last.last = baseTime
  callback(generator, last)

  return new Promise(() => {})
}
