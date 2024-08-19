module.exports = {
  globals: {
    NODE_ENV: 'test',
  },
  clearMocks: true,
  notifyMode: 'failure-change',
  transformIgnorePatterns: ['node_modules/(?!(@kth|@babel|@jest|uuid|nanoid)/)'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
  },
  setupFilesAfterEnv: ['jest-extended/all'],
  testEnvironment: 'jsdom',
  verbose: true,
}
