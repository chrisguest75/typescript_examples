module.exports = {
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    testEnvironment: 'node',
    testRegex: 'tests/.*\\.(test|spec)?\\.(ts|tsx|js)$',
    //testRegex: 'tests/find.test.ts$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}
