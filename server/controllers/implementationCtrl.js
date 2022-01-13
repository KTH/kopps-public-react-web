// @ts-check

const log = require('kth-node-log')
const language = require('kth-node-web-common/lib/language')

const { server: serverConfig } = require('../configuration')
const i18n = require('../../i18n')

const koppsApi = require('../kopps/koppsApi')
const { getServerSideFunctions } = require('../utils/serverSideRendering')
const { programmeFullName } = require('../utils/programmeFullName')

const {
  fillStoreWithQueryParams,
  fetchAndFillProgrammeDetails,
  fillBreadcrumbsDynamicItems,
  fetchAndFillStudyProgrammeVersion,
} = require('./programmeStoreSSR')

/**
 * @param {string} lang
 * @param {string} programmeCode
 * @param {string} programmeName
 * @param {string} term
 * @returns {object}
 */
function _metaTitleAndDescription(lang, programmeCode, programmeName, term) {
  const metaTitle = `${programmeFullName(lang, programmeCode, programmeName, term)}, ${i18n.message(
    'programme_implementation',
    lang
  )}`

  return { metaTitle, metaDescription: '' }
}

async function getIndex(req, res, next) {
  try {
    const lang = language.getLanguage(res)
    const { programmeCode, term } = req.params

    const { createStore, getCompressedStoreCode, renderStaticPage } = getServerSideFunctions()

    const storeId = 'implementation'
    log.info(`Creating an application store ${storeId} on server side`, { programmeCode })
    const applicationStore = createStore(storeId)
    const options = { applicationStore, lang, programmeCode, term }
    log.info(`Starting to fill in application store ${storeId} on server side `, { programmeCode })

    const programmeName = await fetchAndFillProgrammeDetails(options, storeId)

    fillStoreWithQueryParams(options)
    fillBreadcrumbsDynamicItems(options, programmeName)
    await fetchAndFillStudyProgrammeVersion({ ...options, storeId })

    const compressedStoreCode = getCompressedStoreCode(applicationStore)
    log.info(`${storeId} store was filled in and compressed on server side`, { programmeCode })

    const { programme: proxyPrefix } = serverConfig.proxyPrefixPath
    const html = renderStaticPage({ applicationStore, location: req.url, basename: proxyPrefix })
    const { metaTitle: title, metaDescription: description } = _metaTitleAndDescription(
      lang,
      programmeCode,
      programmeName,
      term
    )

    res.render('app/index', {
      html,
      title,
      compressedStoreCode,
      description,
      lang,
      proxyPrefix,
    })
  } catch (err) {
    log.error('Error in getIndex', { error: err })
    next(err)
  }
}

module.exports = {
  getIndex,
}
