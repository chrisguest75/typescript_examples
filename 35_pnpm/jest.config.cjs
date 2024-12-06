module.exports = {
  preset: 'ts-jest/presets/default-esm', // or other ESM presets
  transform: {
    '^.+\\.(mts|cts)?$': ['ts-jest', { useESM: true }],
  },
  testEnvironment: 'node',
  testRegex: 'tests/.*\\.(test|spec)?\\.(mts|ts|tsx|cts)$',
  moduleFileExtensions: ['mts', 'ts', 'cts', 'tsx', 'js', 'jsx', 'json', 'node'],
}
