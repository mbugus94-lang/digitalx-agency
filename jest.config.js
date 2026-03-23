module.exports = {
  testEnvironment: 'node',
  collectCoverageFrom: [
    '**/*.js',
    '!node_modules/**',
    '!jest.config.js',
  ],
  testMatch: [
    '**/__tests__/**/*.test.js',
  ],
};
