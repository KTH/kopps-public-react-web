// @ts-check

const log = require('@kth/log')
const language = require('@kth/kth-node-web-common/lib/language')

const { browser: browserConfig, server: serverConfig } = require('../configuration')
const i18n = require('../../i18n')

const { createBreadcrumbs } = require('../utils/breadcrumbUtil')
const { getServerSideFunctions } = require('../utils/serverSideRendering')

async function getStudyBook(req, res, next) {
  try {
    const lang = language.getLanguage(res)

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

    const applicationStore = createStore()
    applicationStore.setLanguage(lang)
    applicationStore.setBrowserConfig(browserConfig)
    const compressedStoreCode = getCompressedStoreCode(applicationStore)

    const { studyHandbook: basename, uri: proxyPrefix } = serverConfig.proxyPrefixPath
    const html = renderStaticPage({ applicationStore, location: req.url, basename: basename })
    const title = i18n.message('main_menu_shb', lang)

    const breadcrumbsList = createBreadcrumbs(lang)

    res.render('app/index', {
      instrumentationKey: serverConfig?.appInsights?.instrumentationKey,
      html,
      title,
      compressedStoreCode,
      description: '',
      lang,
      proxyPrefix,
      toolbarUrl: serverConfig.toolbar.url,
      studentWeb: true,
      theme: 'student-web',
      klaroAnalyticsConsentCookie,
      breadcrumbsList,
    })
  } catch (err) {
    log.error('Error', { error: err })
    next(err)
  }
}

module.exports = {
  getStudyBook,
}
