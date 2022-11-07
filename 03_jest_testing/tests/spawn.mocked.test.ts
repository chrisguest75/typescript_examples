import { spawnSync } from 'child_process'

jest.mock('child_process', () => ({
  spawnSync: jest.fn(() => {
    return { status: 0 }
  }),
}))

describe('spawn', () => {
  it('spawns a process', async () => {
    // ARRANGE
    const inFile = './input/in.txt'
    const outFile = './output/out.txt'

    const options = [inFile, outFile]

    // ACT
    const spawnResult = spawnSync('mybinary', options, {
      cwd: process.cwd(),
      env: process.env,
      stdio: 'pipe',
      encoding: 'utf-8',
    })
    console.log(spawnResult)

    // ASSERT
    expect(spawnResult.status).toBe(0)
    expect(spawnSync).toBeCalledWith('mybinary', [inFile, outFile], expect.anything())
    // checks how many asserttions were called
    expect.assertions(2)
  })
})
