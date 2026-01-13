module.exports = {
  notify: true,
  notifyMode: 'failure-change',
  projects: [
    '<rootDir>/jest.client.config.js',
    '<rootDir>/jest.shared.config.js',
    '<rootDir>/jest.domain.config.js',
    '<rootDir>/jest.server.config.js',
  ],
  reporters: [
    'default',
    ['summary', { summaryThreshold: 0 }], // Enable failed test summary at the end of test run
  ],
}
