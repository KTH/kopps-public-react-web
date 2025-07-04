const log = require('@kth/log')
const language = require('@kth/kth-node-web-common/lib/language')

const { server: serverConfig } = require('../configuration')
const i18n = require('../../i18n')

const { createBreadcrumbs } = require('../utils/breadcrumbUtil')
const { getServerSideFunctions } = require('../utils/serverSideRendering')
const { fillStoreWithQueryParams, fetchAndFillProgrammeDetails } = require('../stores/programmeStoreSSR')

/**
 * @param {string} lang
 * @param {string} programmeCode
 * @param {string} programmeName
 * @returns {object}
 */
function _metaTitleAndDescription(lang, programmeCode, programmeName) {
  const metaTitle = `${programmeName} (${programmeCode}), ${i18n.message('programme_study_years', lang)}`

  return { metaTitle, metaDescription: '' }
}
/**
 * @param {object} options.applicationStore
 * @param {string} options.lang
 * @param {string} options.programmeCode
 * @returns {object}
 */
async function _fetchSortAndFillProgrammeTerms({ applicationStore, lang, programmeCode }) {
  const { programmeName, approvedStudyProgrammeTerms, lastAdmissionTerm, isOldProgramme } =
    await fetchAndFillProgrammeDetails({
      applicationStore,
      lang,
      programmeCode,
    })

  approvedStudyProgrammeTerms.sort().reverse()

  applicationStore.setLastAdmissionTerm(lastAdmissionTerm)
  applicationStore.setIsOldProgramme(isOldProgramme)
  applicationStore.setProgrammeTerms(approvedStudyProgrammeTerms)
  return { programmeName }
}

async function getIndex(req, res, next) {
  try {
    const lang = language.getLanguage(res)
    const { programmeCode } = req.params

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

    log.info(`Creating a default application store for programme controller`, { programmeCode })

    const applicationStore = createStore()
    const options = { applicationStore, lang, programmeCode }
    log.debug(`Starting to fill a default application store, for programme controller`, { programmeCode })
    const { programmeName } = await _fetchSortAndFillProgrammeTerms(options)

    fillStoreWithQueryParams(options)

    const compressedStoreCode = getCompressedStoreCode(applicationStore)
    log.info(
      `Default store was filled in and compressed on server side`,
      { programmeCode },
      ', for programme controller'
    )

    const { programme: basename, uri: proxyPrefix } = serverConfig.proxyPrefixPath
    const html = renderStaticPage({ applicationStore, location: req.url, basename: basename })
    const { metaTitle: title, metaDescription: description } = _metaTitleAndDescription(
      lang,
      programmeCode,
      programmeName
    )
    const breadcrumbsList = createBreadcrumbs(lang)

    res.render('app/index', {
      html,
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
