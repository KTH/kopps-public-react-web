const log = require('@kth/log')
const language = require('@kth/kth-node-web-common/lib/language')

const { server: serverConfig } = require('../configuration')

const { createThirdCycleBreadcrumbs } = require('../utils/breadcrumbUtil')
const { getServerSideFunctions } = require('../utils/serverSideRendering')
const { departmentTabTitle } = require('../utils/titles')
const { fillStoreWithBasicConfig, fetchAndFillDepartmentCoursesFromLadok } = require('../stores/departmentStoreSSR')

async function getCoursesPerDepartment(req, res, next) {
  try {
    const lang = language.getLanguage(res)
    const { departmentCode } = req.params

    let klaroAnalyticsConsentCookie = false
    if (req.cookies.klaro) {
      const consentCookiesArray = req.cookies.klaro.slice(1, -1).split(',')
      // eslint-disable-next-line prefer-destructuring
      const analyticsConsentCookieString = consentCookiesArray
        .find(cookie => cookie.includes('analytics-consent'))
        .split(':')[1]
      // eslint-disable-next-line no-const-assign
      klaroAnalyticsConsentCookie = analyticsConsentCookieString === 'true'
    }

    const { createStore, getCompressedStoreCode, renderStaticPage } = getServerSideFunctions()
    log.info(`Creating a default application store for a third-cycle department controller`, { departmentCode })

    const applicationStore = createStore()
    const options = { applicationStore, lang, departmentCode }
    log.debug(`Starting to fill a default application store, for a third-cycle department controller`, {
      departmentCode,
    })
    const departmentName = await fetchAndFillDepartmentCoursesFromLadok(options, true)
    await fillStoreWithBasicConfig(options)
    const compressedStoreCode = getCompressedStoreCode(applicationStore)
    log.info(`Default store was filled in and compressed on server side`, { departmentCode })

    const { thirdCycleCoursesPerDepartment: basename, uri: proxyPrefix } = serverConfig.proxyPrefixPath
    const view = renderStaticPage({ applicationStore, location: req.url, basename: basename })
    const title = departmentTabTitle(departmentName, lang)
    const breadcrumbsList = createThirdCycleBreadcrumbs(lang, departmentName, departmentCode)

    res.render('app/index', {
      html: view,
      title,
      compressedStoreCode,
      description: '',
      lang,
      proxyPrefix,
      toolbarUrl: serverConfig.toolbar.url,
      theme: 'external',
      klaroAnalyticsConsentCookie,
      breadcrumbsList,
    })
  } catch (err) {
    log.error('Error', { error: err })
    next(err)
  }
}

module.exports = {
  getCoursesPerDepartment,
}
