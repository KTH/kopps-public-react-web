const { detailedInformation: detailedInformationResponse } = require('./responses')

module.exports = {
  host: {
    address: '0.0.0.0',
    port: 3001,
  },
  paths: [
    {
      method: 'get',
      url: '/kopps/course/*/detailedinformation',
      response: detailedInformationResponse,
    },
    {
      method: 'get',
      url: '/cm/*',
      response: '',
    },
  ],
}
