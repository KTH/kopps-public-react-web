// @ts-check

const log = require('@kth/log')
const language = require('@kth/kth-node-web-common/lib/language')

const { server: serverConfig } = require('../configuration')

const { createDepartmentBreadcrumbs } = require('../utils/breadcrumbUtil')
const { getServerSideFunctions } = require('../utils/serverSideRendering')

const { departmentTabTitle } = require('../utils/titles')
const {
  fillBreadcrumbsDynamicItems,
  fillStoreWithBasicConfig,
  fetchAndFillDepartmentCourses,
} = require('../stores/departmentStoreSSR')

async function getIndex(req, res, next) {
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

    log.info(`Creating a default application store for department controller`, { departmentCode })

    const applicationStore = createStore()

    const options = { applicationStore, lang, departmentCode }
    log.debug(`Starting to fill a default application store, for department controller`, { departmentCode })
    const departmentName = await fetchAndFillDepartmentCourses(options)
    await fillStoreWithBasicConfig(options)

    const compressedStoreCode = getCompressedStoreCode(applicationStore)
    log.info(`Default store was filled in and compressed on server side`, { departmentCode })

    const { department: proxyPrefix } = serverConfig.proxyPrefixPath
    const html = renderStaticPage({ applicationStore, location: req.url, basename: proxyPrefix })
    const title = departmentTabTitle(departmentName, lang)
    const breadcrumbsList = createDepartmentBreadcrumbs(lang, departmentName, departmentCode)

    res.render('app/index', {
      instrumentationKey: serverConfig?.appInsights?.instrumentationKey,
      html,
      title,
      compressedStoreCode,
      description: '',
      lang,
      proxyPrefix,
      studentWeb: true,
      klaroAnalyticsConsentCookie,
      breadcrumbsList,
    })
  } catch (err) {
    log.error('Error', { error: err })
    next(err)
  }
}

module.exports = {
  getIndex,
}
