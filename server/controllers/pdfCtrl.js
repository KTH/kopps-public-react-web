const log = require('@kth/log')
const language = require('@kth/kth-node-web-common/lib/language')

const { server: serverConfig } = require('../configuration')

const { getServerSideFunctions } = require('../utils/serverSideRendering')
const { programmeFullName } = require('../utils/programmeFullName')

const {
  fillStoreWithQueryParams,
  fetchAndFillProgrammeDetails,
  fetchAndFillStudyProgrammeVersion,
  fillBrowserConfigWithHostUrl,
  fetchAndFillCurriculumList,
} = require('../stores/programmeStoreSSR')

const pdfApi = require('../pdf/pdfApi')

/**
 * @param {string} lang
 * @param {string} programmeCode
 * @param {string} programmeName
 * @param {string} term
 * @returns {object}
 */
function _metaTitleAndDescription(lang, programmeCode, programmeName, term) {
  const metaTitle = `${programmeFullName(lang, programmeCode, programmeName, term)}`

  return { metaTitle, metaDescription: '' }
}

async function getIndex(req, res, next) {
  try {
    const lang = language.getLanguage(res)
    const { programmeCodeAndTerm } = req.params

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

    if (!programmeCodeAndTerm) {
      const error = new Error(`Malformed programme code and term:  ${programmeCodeAndTerm}`)
      error.statusCode = 404
      throw error
    }
    const [programmeCode, term] = programmeCodeAndTerm.split('-')

    const { createStore, getCompressedStoreCode, renderStaticPage } = getServerSideFunctions()

    const storeId = 'pdfStore'
    log.info(`Creating an application store ${storeId} on server side`, { programmeCode })
    const applicationStore = createStore(storeId)
    const options = { applicationStore, lang, programmeCode, term }
    log.info(`Starting to fill in application store ${storeId} on server side `, { programmeCode })
    const { programmeName } = await fetchAndFillProgrammeDetails(options, storeId)
    await fetchAndFillStudyProgrammeVersion({ ...options, storeId })
    fillStoreWithQueryParams(options)
    fillBrowserConfigWithHostUrl(options)
    await fetchAndFillCurriculumList(options)
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
    })
  } catch (err) {
    log.error('Error', { error: err })
    next(err)
  }
}

async function performPDFRenderFunction(req, res, next) {
  const { body } = req

  try {
    log.info('trying to perform a call for pdf render azure function to render pdf for programme syllabus')

    const apiResponse = await pdfApi.getPDFContent(body)
    log.debug('PDF Render response: ', apiResponse)
    res.send(apiResponse)
  } catch (error) {
    log.error(' Exception from PDF Render function', { error })
    next(error)
  }
}

module.exports = {
  getIndex,
  performPDFRenderFunction,
}
