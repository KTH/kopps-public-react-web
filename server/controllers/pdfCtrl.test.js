const log = require('@kth/log')
const axios = require('axios')
const { getPDFContent } = require('../pdf/pdfApi')

jest.setTimeout(10000)
jest.mock('@kth/log')
jest.mock('axios')
log.info = jest.fn()
log.debug = jest.fn()
log.error = jest.fn()
jest.mock('../configuration', () => ({
  server: {
    programSyllabusForPDF: { uri: '' },
    programSyallbusKeyForPDF: { key: '' },
  },
}))

describe('Perform Azure function calling to convert HTML to PDF', () => {
  test('check pdf content function', async () => {
    axios.post.mockResolvedValueOnce({ data: [] })
    await getPDFContent({
      pages: [],
      baseUrl: 'http://localhost:3000',
      course: 'ARKIT-20222.pdf | KTH',
    })
    expect(axios.post).toBeCalled()
  })
})
