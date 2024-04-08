// @ts-check

const log = require('@kth/log')
const language = require('@kth/kth-node-web-common/lib/language')

const { server: serverConfig } = require('../configuration')
const i18n = require('../../i18n')

const koppsApi = require('../kopps/koppsApi')

const { createBreadcrumbs } = require('../utils/breadcrumbUtil')
const { getServerSideFunctions } = require('../utils/serverSideRendering')
const { fillStoreWithBasicConfig, fetchAndFillSchoolsList } = require('../stores/schoolsListStoreSSR')

/**
 * @param {object} options.applicationStore
 * @param {string} options.lang
 */
async function _fillApplicationStoreOnServerSide({ applicationStore, lang }) {
  fillStoreWithBasicConfig({ applicationStore, lang })

  const listForActiveCourses = true
  const params = { departmentCriteria: koppsApi.DEPARTMENT_CRITERIA.HAS_COURSES, listForActiveCourses, lang }
  await fetchAndFillSchoolsList(applicationStore, params)
}

async function getSchoolsList(req, res, next) {
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
    log.info(`Creating a default application store for schools with all-type courses`)

    const applicationStore = createStore()
    log.debug(`Starting to fill a default application store with all schools with any type of courses`)

    await _fillApplicationStoreOnServerSide({ applicationStore, lang })

    const compressedStoreCode = getCompressedStoreCode(applicationStore)
    log.info(`Default store was filled in and compressed on server side, for schools with all-type courses`)

    const { schoolsList: proxyPrefix } = serverConfig.proxyPrefixPath
    const html = renderStaticPage({ applicationStore, location: req.url, basename: proxyPrefix })
    const title = i18n.message('courses_by_school', lang)
    const description = i18n.message('departments_list_lead', lang)
    const breadcrumbsList = createBreadcrumbs(lang)

    res.render('app/index', {
      instrumentationKey: serverConfig?.appInsights?.instrumentationKey,
      html,
      title,
      compressedStoreCode,
      description,
      lang,
      proxyPrefix,
      toolbarUrl: serverConfig.toolbar.url,
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
  getSchoolsList,
}
