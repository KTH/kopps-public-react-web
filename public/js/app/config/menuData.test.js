import getMenuData from './menuData'
import mockGetMenuData from './mocks/mockMenuData'

describe('Check if getMenuData is correctly fetching menuData', () => {
  test('in English', done => {
    const lang = 'en'
    const proxyPrefixPath = { uri: 'localhost://kopps-public' }
    const menuData = getMenuData({
      language: lang,
      browserConfig: { proxyPrefixPath },
    })
    const expectedMenuData = mockGetMenuData(lang)
    expect(menuData).toEqual(expectedMenuData)

    done()
  })

  test('in Swedish', done => {
    const lang = 'sv'
    const proxyPrefixPath = { uri: 'localhost://kopps-public' }
    const menuData = getMenuData({
      language: lang,
      browserConfig: { proxyPrefixPath },
    })
    const expectedMenuData = mockGetMenuData(lang)
    expect(menuData).toEqual(expectedMenuData)

    done()
  })
})
