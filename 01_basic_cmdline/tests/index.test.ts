import { main } from '../src/index'

describe.only('test cli', () => {
  afterEach(() => {
    jest.clearAllMocks()
    jest.resetAllMocks()
    const testName = expect.getState().currentTestName
    console.log(`afterEach ${testName}`)
  })

  test('verify main exits and logs correctly', () => {
    // ARRANGE
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const log = jest.spyOn(console, 'log').mockImplementation(() => {})
    // ACT

    // ASSERT
    expect(main()).toBe(0)
    expect(log).toBeCalledWith('Hello world!!!!')
  })
})
