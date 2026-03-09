const base = require('./jest.base')

module.exports = {
  ...base,
  displayName: 'client',
  testEnvironment: 'jsdom',

  // ✅ anchor project to the folder
  roots: ['<rootDir>/public'],

  // ✅ relative patterns now that roots is set
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],

  // keep ignores relative to roots
  testPathIgnorePatterns: ['<rootDir>/public/dist/', '<rootDir>/node_modules/'],

  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: '<rootDir>/public/tsconfig.json' }],
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/public/__mocks__/styleMock.js',
    '^@kth/kopps-public-react-web/shared/(.*)$': '<rootDir>/shared/dist/$1',
    '^@kth/kopps-public-react-web/domain/(.*)$': '<rootDir>/domain/$1',
  },
}
