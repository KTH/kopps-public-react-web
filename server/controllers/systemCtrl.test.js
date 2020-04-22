describe('Not found', () => {
  test('Gets correct error code', done => {
    jest.mock('../configuration', () => {
      return { server: {} }
    })
    jest.mock('../api', () => {})
    jest.mock('../adldapClient', () => {})

    const systemCtrl = require('./systemCtrl')

    const req = { originalUrl: 'http://localhost' }

    const next = err => {
      expect(err).toBeDefined()
      expect(err.status).toBeDefined()
      expect(err.status).toEqual(404)
      expect(err.message).toMatch(/http:\/\/localhost/)
      done()
    }

    systemCtrl.notFound(req, {}, next)
  })
})
