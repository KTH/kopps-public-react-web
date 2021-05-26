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
