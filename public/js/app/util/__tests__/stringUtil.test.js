import { getCurrentHost } from '../stringUtil'

window = Object.create(window)
const defaultOrigin = 'https://www.kth.se'
Object.defineProperty(window, 'origin', {
  value: defaultOrigin,
  writable: true,
})

describe('getCurrentHost', () => {
  beforeEach(() => {
    window.origin = defaultOrigin
  })

  test('getCurrentHost takes "thisHostBaseUrl" and "keepAppOrigin"', () => {
    getCurrentHost('someBaseUrl', false)
  })

  test.each(['someBaseUrl', 'someOtherBaseUrl'])(
    'returns baseUrl unchanged if it does not contain "app" and no trailing slash: %s',
    baseUrl => {
      expect(getCurrentHost(baseUrl)).toStrictEqual(baseUrl)
    }
  )

  describe('no trailing slash', () => {
    describe('keepAppOrigin is undefined, i.e. default behaviour should be to replace www with app', () => {
      test('if baseUrl contains "www", and origin contains "www", should return baseUrl unchanged', () => {
        expect(getCurrentHost('www')).toStrictEqual('www')
      })

      test('if baseUrl contains "www-", but origin contains "app-", should return baseUrl with app instead for www', () => {
        window.origin = 'https://app-r.referens.sys.kth.se'
        expect(getCurrentHost('www-://foo')).toStrictEqual('app-://foo')
        expect(getCurrentHost('www-://bar')).toStrictEqual('app-://bar')
      })

      test('if baseUrl contains "www.", but origin contains "app.", should return baseUrl with app instead for www', () => {
        window.origin = 'https://app.kth.se'
        expect(getCurrentHost('www.kth.se://foo')).toStrictEqual('app.kth.se://foo')
        expect(getCurrentHost('www.kth.se://bar')).toStrictEqual('app.kth.se://bar')
      })
    })

    describe('keepAppOrigin is true, www should be replaced with app', () => {
      test('if baseUrl contains "www", and origin contains "www", should return baseUrl unchanged', () => {
        expect(getCurrentHost('www', true)).toStrictEqual('www')
      })

      test('if baseUrl contains "www-", but origin contains "app-", should return baseUrl with app instead for www', () => {
        window.origin = 'https://app-r.referens.sys.kth.se'
        expect(getCurrentHost('www-://foo', true)).toStrictEqual('app-://foo')
        expect(getCurrentHost('www-://bar', true)).toStrictEqual('app-://bar')
      })

      test('if baseUrl contains "www.", but origin contains "app.", should return baseUrl with app instead for www', () => {
        window.origin = 'https://app.kth.se'
        expect(getCurrentHost('www.kth.se://foo', true)).toStrictEqual('app.kth.se://foo')
        expect(getCurrentHost('www.kth.se://bar', true)).toStrictEqual('app.kth.se://bar')
      })
    })

    describe('keepAppOrigin is false, www should NOT be replaced with app', () => {
      test('if baseUrl contains "www", and origin contains "www", should return baseUrl unchanged', () => {
        expect(getCurrentHost('www', false)).toStrictEqual('www')
      })

      test('if baseUrl contains "www-", but origin contains "app-", should NOT return baseUrl with app instead for www', () => {
        window.origin = 'https://app-r.referens.sys.kth.se'
        expect(getCurrentHost('www-://foo', false)).toStrictEqual('www-://foo')
        expect(getCurrentHost('www-://bar', false)).toStrictEqual('www-://bar')
      })

      test('if baseUrl contains "www.", but origin contains "app.", should NOT return baseUrl with app instead for www', () => {
        window.origin = 'https://app.kth.se'
        expect(getCurrentHost('www.kth.se://foo', false)).toStrictEqual('www.kth.se://foo')
        expect(getCurrentHost('www.kth.se://bar', false)).toStrictEqual('www.kth.se://bar')
      })
    })
  })

  describe('trailing slash', () => {
    describe('keepAppOrigin is undefined, i.e. default behaviour should be to replace www with app', () => {
      test('if baseUrl contains "www", and origin contains "www", should return baseUrl unchanged', () => {
        expect(getCurrentHost('www/')).toStrictEqual('www')
      })

      test('if baseUrl contains "www-", but origin contains "app-", should return baseUrl with app instead for www', () => {
        window.origin = 'https://app-r.referens.sys.kth.se'
        expect(getCurrentHost('www-://foo/')).toStrictEqual('app-://foo')
        expect(getCurrentHost('www-://bar/')).toStrictEqual('app-://bar')
      })

      test('if baseUrl contains "www.", but origin contains "app.", should return baseUrl with app instead for www', () => {
        window.origin = 'https://app.kth.se'
        expect(getCurrentHost('www.kth.se://foo/')).toStrictEqual('app.kth.se://foo')
        expect(getCurrentHost('www.kth.se://bar/')).toStrictEqual('app.kth.se://bar')
      })
    })

    describe('keepAppOrigin is true, www should be replaced with app', () => {
      test('if baseUrl contains "www", and origin contains "www", should return baseUrl unchanged', () => {
        expect(getCurrentHost('www/', true)).toStrictEqual('www')
      })

      test('if baseUrl contains "www-", but origin contains "app-", should return baseUrl with app instead for www', () => {
        window.origin = 'https://app-r.referens.sys.kth.se'
        expect(getCurrentHost('www-://foo/', true)).toStrictEqual('app-://foo')
        expect(getCurrentHost('www-://bar/', true)).toStrictEqual('app-://bar')
      })

      test('if baseUrl contains "www.", but origin contains "app.", should return baseUrl with app instead for www', () => {
        window.origin = 'https://app.kth.se'
        expect(getCurrentHost('www.kth.se://foo/', true)).toStrictEqual('app.kth.se://foo')
        expect(getCurrentHost('www.kth.se://bar/', true)).toStrictEqual('app.kth.se://bar')
      })
    })

    describe('keepAppOrigin is false, www should NOT be replaced with app', () => {
      test('if baseUrl contains "www", and origin contains "www", should return baseUrl unchanged', () => {
        expect(getCurrentHost('www/', false)).toStrictEqual('www')
      })

      test('if baseUrl contains "www-", but origin contains "app-", should NOT return baseUrl with app instead for www', () => {
        window.origin = 'https://app-r.referens.sys.kth.se'
        expect(getCurrentHost('www-://foo/', false)).toStrictEqual('www-://foo')
        expect(getCurrentHost('www-://bar/', false)).toStrictEqual('www-://bar')
      })

      test('if baseUrl contains "www.", but origin contains "app.", should NOT return baseUrl with app instead for www', () => {
        window.origin = 'https://app.kth.se'
        expect(getCurrentHost('www.kth.se://foo/', false)).toStrictEqual('www.kth.se://foo')
        expect(getCurrentHost('www.kth.se://bar/', false)).toStrictEqual('www.kth.se://bar')
      })
    })
  })
})
