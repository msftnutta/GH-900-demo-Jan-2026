module.exports = {
  testEnvironment: 'jsdom',
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'public/**/*.js',
    '!public/**/*.test.js',
    '!public/**/*.spec.js'
  ],
  testMatch: [
    '**/__tests__/**/*.js',
    '**/*.test.js',
    '**/*.spec.js'
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleFileExtensions: ['js', 'json'],
  verbose: true
};
