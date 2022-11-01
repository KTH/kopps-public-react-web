// @ts-check

const log = require('@kth/log')
const language = require('@kth/kth-node-web-common/lib/language')

const { browser: browserConfig, server: serverConfig } = require('../configuration')
const i18n = require('../../i18n')

const koppsApi = require('../kopps/koppsApi')

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

    let klaroConsentCookie = false
    if (req.cookies.klaro) {
      const consentCookiesArray = req.cookies.klaro.slice(1, -1).split(',')
      // eslint-disable-next-line prefer-destructuring
      const analyticsConsentCookieString = consentCookiesArray
        .find(cookie => cookie.includes('analytics-consent'))
        .split(':')[1]
      // eslint-disable-next-line no-const-assign
      klaroConsentCookie = Boolean(analyticsConsentCookieString)
    }

    const { createStore, getCompressedStoreCode, renderStaticPage } = getServerSideFunctions()

    log.info(`Creating a default application store for department controller`, { departmentCode })

    const applicationStore = createStore()

    const options = { applicationStore, lang, departmentCode }
    log.debug(`Starting to fill a default application store, for department controller`, { departmentCode })
    const departmentName = await fetchAndFillDepartmentCourses(options)
    await fillStoreWithBasicConfig(options)
    await fillBreadcrumbsDynamicItems(options, departmentName)

    const compressedStoreCode = getCompressedStoreCode(applicationStore)
    log.info(`Default store was filled in and compressed on server side`, { departmentCode })

    const { department: proxyPrefix } = serverConfig.proxyPrefixPath
    const html = renderStaticPage({ applicationStore, location: req.url, basename: proxyPrefix })

    const title = departmentTabTitle(departmentName, lang)

    res.render('app/index', {
      instrumentationKey: serverConfig?.appInsights?.instrumentationKey,
      html,
      title,
      compressedStoreCode,
      description: '',
      lang,
      proxyPrefix,
      studentWeb: true,
      cookies: klaroConsentCookie,
    })
  } catch (err) {
    log.error('Error', { error: err })
    next(err)
  }
}

module.exports = {
  getIndex,
}
