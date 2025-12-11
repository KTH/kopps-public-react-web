// jest.base.js
module.exports = {
  clearMocks: true,
  transformIgnorePatterns: ['node_modules/(?!(@kth|@babel|@jest|uuid|nanoid)/)'],
  moduleNameMapper: {
    '^shared/(.*)$': '<rootDir>/shared/$1',
    '^domain/(.*)$': '<rootDir>/domain/$1',
    '\\.(css|less|scss|sass)$': '<rootDir>/public/__mocks__/styleMock.js',
  },
  setupFilesAfterEnv: ['jest-extended/all'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}
