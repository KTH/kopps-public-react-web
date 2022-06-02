// @ts-check

const log = require('@kth/log')
const language = require('@kth/kth-node-web-common/lib/language')

const { server: serverConfig } = require('../configuration')
const i18n = require('../../i18n')

const { getServerSideFunctions } = require('../utils/serverSideRendering')
const { programmeFullName } = require('../utils/programmeFullName')
const {
  fillStoreWithQueryParams,
  fetchAndFillProgrammeDetails,
  fetchAndFillCurriculumList,
  fetchAndFillSpecializations,
  fetchAndFillStudyProgrammeVersion,
  fillBrowserConfigWithHostUrlAndPDFUrl,
} = require('../stores/programmeStoreSSR')

function _metaTitleAndDescription(lang, programmeCode, programmeName, term) {
  const metaTitle = `${programmeFullName(lang, programmeCode, programmeName, term)}, ${i18n.message(
    'programme_appendix1',
    lang
  )}`

  return { metaTitle, metaDescription: '' }
}

async function getPDFExport(req, res, next) {
  try {
    const lang = language.getLanguage(res)
    const { programmeCode, term } = req.params

    const { createStore, getCompressedStoreCode } = getServerSideFunctions()
    const storeId = 'pdfStore'
    log.info(`Creating an application store ${storeId} on server side`, {
      programmeCode,
    })
    const applicationStore = createStore(storeId)
    const options = { applicationStore, lang, programmeCode, term }
    log.info(`Starting to fill in application store ${options} on server side `, { programmeCode })

    const { programme } = await fetchAndFillProgrammeDetails(options, storeId)

    fillStoreWithQueryParams(options)
    fillBrowserConfigWithHostUrlAndPDFUrl(options)
    await fetchAndFillCurriculumList(options)
    await fetchAndFillSpecializations(options)
    await fetchAndFillStudyProgrammeVersion({ ...options, storeId })
    const compressedStoreCode = getCompressedStoreCode(applicationStore)
    log.info(`${applicationStore} store was filled in and compressed on server side`, { programmeCode })

    const { programme: proxyPrefix } = serverConfig.proxyPrefixPath
    const { metaTitle: title, metaDescription: description } = _metaTitleAndDescription(
      lang,
      programmeCode,
      programme,
      term
    )

    res.render('app/index', {
      instrumentationKey: serverConfig?.appInsights?.instrumentationKey,
      html: '',
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

module.exports = {
  getPDFExport,
}
