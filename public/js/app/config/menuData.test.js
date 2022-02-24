import getMenuData from './menuData'
import mockGetMenuData from './mocks/mockMenuData'
import mockCommonSettings from './mocks/mockCommonSettings'

describe('Check if getMenuData is correctly fetching menuData', () => {
  test('in English', done => {
    const lang = 'en'
    const menuData = getMenuData({
      language: lang,
      browserConfig: mockCommonSettings,
    })
    const expectedMenuData = mockGetMenuData(lang)
    expect(menuData).toEqual(expectedMenuData)

    done()
  })

  test('in Swedish', done => {
    const lang = 'sv'
    const menuData = getMenuData({
      language: lang,
      browserConfig: mockCommonSettings,
    })
    const expectedMenuData = mockGetMenuData(lang)
    expect(menuData).toEqual(expectedMenuData)

    done()
  })
})

describe('Throw an error if getMenuData is missing data', () => {
  test('missing browserConfig', done => {
    const lang = 'en'
    const menuData = () =>
      getMenuData({
        language: lang,
      })
    expect(menuData).toThrow(TypeError)
    expect(menuData).toThrow(
      'browserConfig is not defined, check if store was passed in or it was filled in on server-side'
    )
    done()
  })
  test('missing browserConfig', done => {
    const lang = 'en'
    const menuData = () =>
      getMenuData({
        language: lang,
        browserConfig: {},
      })
    expect(menuData).toThrow(TypeError)
    expect(menuData).toThrow('proxyPrefixPath is not defined in browserConfig')
    done()
  })
})
