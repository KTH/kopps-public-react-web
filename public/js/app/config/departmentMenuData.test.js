import getDepartmentMenuData from './departmentMenuData'

describe('Throw an error if getMenuData is missing data', () => {
  test('missing browserConfig', done => {
    const lang = 'en'
    const menuData = () =>
      getDepartmentMenuData({
        language: lang,
      })
    expect(menuData).toThrow(TypeError)
    expect(menuData).toThrow(
      'Error while generating meny or breadcrumbs: browserConfig is not defined, check if store was passed in or it was filled in on server-side'
    )
    done()
  })
  test('missing browserConfig', done => {
    const lang = 'en'
    const menuData = () =>
      getDepartmentMenuData({
        language: lang,
        browserConfig: {},
      })
    expect(menuData).toThrow(TypeError)
    expect(menuData).toThrow(
      'Error while generating meny or breadcrumbs: proxyPrefixPath is not defined in browserConfig'
    )
    done()
  })
})
