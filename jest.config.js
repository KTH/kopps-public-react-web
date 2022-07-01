module.exports = {
  globals: {
    NODE_ENV: 'test',
  },
  clearMocks: true,
  notifyMode: 'failure-change',
  transformIgnorePatterns: ['node_modules/(?!(@kth|@babel|@jest|uuid|nanoid)/)'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['jest-extended/all'],
  testEnvironment: 'jsdom',
  verbose: true,
}
