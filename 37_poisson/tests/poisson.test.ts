import 'jest-extended'
import { poissonArrivalGenerator } from '../src/poisson'

describe.only('Generate poisson distributed events', () => {
  test('First event should be after baseTime and second event should be after that', () => {
    // ARRANGE
    const baseTime = new Date()
    const rate = 2.0 // Average x arrivals per timeperiod
    const timePeriod = 60 * 60 * 24 // 1 arrival per day
    const generator = poissonArrivalGenerator(baseTime, rate, timePeriod)

    // ACT
    const atDate = generator.next().value || new Date()
    const nextDate = generator.next().value || new Date()

    // ASSERT
    expect(atDate).toBeDate()
    expect(atDate).toBeAfter(baseTime)
    expect(nextDate).toBeAfter(atDate)

    //console.log(`${atDate} and ${nextDate}`)
  })

  test('Arrival time detlas', () => {
    // ARRANGE
    const baseTime = new Date()
    const rate = 1.0 // Average x arrivals per timeperiod
    const timePeriod = 30 // 1 arrival per day
    const generator = poissonArrivalGenerator(baseTime, rate, timePeriod)

    // ACT
    const first = generator.next().value || new Date()
    const second = generator.next().value || new Date()
    const third = generator.next().value || new Date()
    const fourth = generator.next().value || new Date()

    const firsDelta = second.getTime() - first.getTime()
    const secondDelta = third.getTime() - second.getTime()
    const thirdDelta = fourth.getTime() - third.getTime()
    const average = (firsDelta + secondDelta + thirdDelta) / 3
    //console.log(firsDelta, secondDelta, thirdDelta, average)

    // ASSERT
    expect(first).toBeDate()
    expect(first).toBeAfter(baseTime)
    expect(second).toBeAfter(first)
    expect(third).toBeAfter(second)
    expect(fourth).toBeAfter(third)
    // Not really a good test, but it should be less than 3 times the time period
    expect(average).toBeLessThan(timePeriod * 3 * 1000)
  })

})
