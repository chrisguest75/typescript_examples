module.exports = {
  transform: {
    '^.+\\.(ts|cts)?$': 'ts-jest',
  },
  testEnvironment: 'node',
  testRegex: 'tests/.*\\.(test|spec)?\\.(ts|tsx|cts)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}
