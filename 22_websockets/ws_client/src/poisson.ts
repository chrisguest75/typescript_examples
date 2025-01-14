/**
 * Generates a sequence of Poisson arrivals.
 *
 * @param baseTime The base time of the first arrival.
 * @param rate The average arrival rate per time period.
 * @param timePeriod The time period in seconds.
 * @returns A generator that yields the arrival times.
 */
export function* poissonArrivalGenerator(
  baseTime: Date,
  rate: number,
  timePeriod: number,
): Generator<Date, void, unknown> {
  if (rate <= 0) {
    throw new Error('Rate must be a positive number.')
  }

  let currentTime = baseTime.getTime() // Get the base time in milliseconds

  while (true) {
    // Generate a random exponential inter-arrival time
    const interArrivalTime = -Math.log(1.0 - Math.random()) / rate
    currentTime += interArrivalTime * 1000 * timePeriod // Convert to milliseconds
    yield new Date(currentTime) // Yield the next arrival time as a Date
  }
}
