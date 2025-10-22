const base = require('./jest.base')

module.exports = {
  ...base,
  displayName: 'domain',
  testEnvironment: 'node',
  roots: ['<rootDir>/domain'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  transform: { '^.+\\.[jt]sx?$': 'babel-jest' },
}
