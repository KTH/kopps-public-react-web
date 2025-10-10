const base = require('./jest.base')

module.exports = {
  ...base,
  displayName: 'server',
  testEnvironment: 'node',
  roots: ['<rootDir>/server'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  transform: { '^.+\\.[jt]sx?$': 'babel-jest' },
  moduleNameMapper: {
    '^kopps-public-react-web/shared/(.*)$': '<rootDir>/shared/dist/$1',
    '^kopps-public-react-web/domain/(.*)$': '<rootDir>/domain/$1',
  },
}
