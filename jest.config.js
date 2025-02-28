module.exports = {
  preset: 'jest-expo',
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  },
  testPathIgnorePatterns: [
    'mobile-app/cypress/.*'
  ],
  collectCoverageFrom: [
    '**/*.{js,jsx,ts,tsx}',
    '!**/*.test.{js,jsx,ts,tsx}',
    '!**/.github/**',
    '!**/.husky/**',
    '!**/.idea/**',
    '!**/coverage/**',
    '!**/cypress/**',
    '!**/node_modules/**',
    '!**/web-build/**',
    '!**/*.config.js',
    '!**/.versionrc.js',
    '!**/_shim.js',
    '!**/screens/PlaygroundNavigator/**',
    '!**/cypress-coverage/**',
    '!**/jest-coverage/**',
    '!**/website/**'
  ],
  coverageDirectory: 'jest-coverage',
  setupFiles: ['./jest.setup.js'],
}
