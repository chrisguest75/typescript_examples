/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest/presets/default-esm', // or other ESM presets
    transform: {
      '^.+\\.(mts|cts)?$': ['ts-jest', { useESM: true }],
    },
    testEnvironment: 'node',
    testRegex: 'src/.*\\.(test|spec)?\\.(mts|ts|tsx|cts)$',
    moduleFileExtensions: ['mts', 'ts', 'cts', 'tsx', 'js', 'jsx', 'json', 'node'],
    moduleNameMapper: {
      '(.+)\\.js': '$1'
    },
    extensionsToTreatAsEsm: ['.ts']
}
