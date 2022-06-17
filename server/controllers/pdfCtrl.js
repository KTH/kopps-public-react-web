// @ts-check

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
  fetchAndFillSpecializations,
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
    const { programmeCode, term } = req.params

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
    await fetchAndFillSpecializations(options)
    const compressedStoreCode = getCompressedStoreCode(applicationStore)
    log.info(`${storeId} store was filled in and compressed on server side`, { programmeCode })

    const { programme: proxyPrefix } = serverConfig.proxyPrefixPath
    const view = renderStaticPage({ applicationStore, location: req.url, basename: proxyPrefix })
    const { metaTitle: title, metaDescription: description } = _metaTitleAndDescription(
      lang,
      programmeCode,
      programmeName,
      term
    )

    res.render('app/index', {
      instrumentationKey: serverConfig?.appInsights?.instrumentationKey,
      html: view,
      title,
      compressedStoreCode,
      description,
      lang,
      proxyPrefix,
      studentWeb: true,
    })
  } catch (err) {
    log.error('Error', { error: err })
    next(err)
  }
}

async function performPDFRenderFunction(req, res, next) {
  const { body } = req

  try {
    log.debug('trying to perform a call for pdf render azure function to render pdf for programme syllabus')

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
