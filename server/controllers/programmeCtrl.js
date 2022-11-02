// @ts-check

const log = require('@kth/log')
const language = require('@kth/kth-node-web-common/lib/language')

const { browser: browserConfig, server: serverConfig } = require('../configuration')
const i18n = require('../../i18n')

const koppsApi = require('../kopps/koppsApi')

const { getServerSideFunctions } = require('../utils/serverSideRendering')
const { filterOutInvalidTerms } = require('../../domain/programmes')
const { fillStoreWithQueryParams, fetchAndFillProgrammeDetails } = require('../stores/programmeStoreSSR')
const { programmeFullName } = require('../utils/programmeFullName')

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
  const { approvedStudyProgrammeTerms, firstAdmissionTerm, lastAdmissionTerm, programmeName } =
    await fetchAndFillProgrammeDetails({ applicationStore, lang, programmeCode })

  const programmeTerms = filterOutInvalidTerms({ approvedStudyProgrammeTerms, firstAdmissionTerm, lastAdmissionTerm })
  programmeTerms.sort().reverse()

  applicationStore.setLastAdmissionTerm(lastAdmissionTerm)
  applicationStore.setProgrammeTerms(programmeTerms)
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

    const { programme: proxyPrefix } = serverConfig.proxyPrefixPath
    const html = renderStaticPage({ applicationStore, location: req.url, basename: proxyPrefix })
    const { metaTitle: title, metaDescription: description } = _metaTitleAndDescription(
      lang,
      programmeCode,
      programmeName
    )

    res.render('app/index', {
      instrumentationKey: serverConfig?.appInsights?.instrumentationKey,
      html,
      title,
      compressedStoreCode,
      description,
      lang,
      proxyPrefix,
      studentWeb: true,
      klaroAnalyticsConsentCookie,
    })
  } catch (err) {
    log.error('Error', { error: err })
    next(err)
  }
}

module.exports = {
  getIndex,
}
