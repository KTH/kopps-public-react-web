const log = require('@kth/log')
const language = require('@kth/kth-node-web-common/lib/language')

const { server: serverConfig } = require('../configuration')
const i18n = require('../../i18n')

const { createProgrammeBreadcrumbs } = require('../utils/breadcrumbUtil')
const { getServerSideFunctions } = require('../utils/serverSideRendering')
const { programmeFullName } = require('../utils/programmeFullName')

const {
  fillStoreWithQueryParams,
  fetchAndFillProgrammeDetails,
  fetchAndFillStudyProgrammeVersion,
} = require('../stores/programmeStoreSSR')

/**
 * @param {string} lang
 * @param {string} programmeCode
 * @param {string} programmeName
 * @param {string} term
 * @returns {object}
 */
function _metaTitleAndDescription(lang, programmeCode, programmeName, term) {
  const metaTitle = `${programmeFullName(lang, programmeCode, programmeName, term)}, ${i18n.message(
    'programme_eligibility_and_selection',
    lang
  )}`

  return { metaTitle, metaDescription: '' }
}

async function getIndex(req, res, next) {
  try {
    const lang = language.getLanguage(res)
    const { programmeCode, term } = req.params

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
    const storeId = 'eligibility'
    log.info(`Creating an application store ${storeId} on server side`, { programmeCode })
    const applicationStore = createStore(storeId)
    const options = { applicationStore, lang, programmeCode, term }
    log.info(`Starting to fill in application store ${storeId} on server side `, { programmeCode })

    const { programmeName } = await fetchAndFillProgrammeDetails(options, storeId)

    fillStoreWithQueryParams(options)
    await fetchAndFillStudyProgrammeVersion({ ...options, storeId })

    const compressedStoreCode = getCompressedStoreCode(applicationStore)
    log.info(`${storeId} store was filled in and compressed on server side`, { programmeCode })

    const { programme: basename, uri: proxyPrefix } = serverConfig.proxyPrefixPath
    const view = renderStaticPage({ applicationStore, location: req.url, basename: basename })
    const { metaTitle: title, metaDescription: description } = _metaTitleAndDescription(
      lang,
      programmeCode,
      programmeName,
      term
    )
    const breadcrumbsList = createProgrammeBreadcrumbs(lang, programmeName, programmeCode)

    res.render('app/index', {
      html: view,
      title,
      compressedStoreCode,
      description,
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
  getIndex,
}
