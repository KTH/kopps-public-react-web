// @ts-check

const log = require('kth-node-log')
const language = require('kth-node-web-common/lib/language')

const { server: serverConfig } = require('../configuration')
const i18n = require('../../i18n')

const { getServerSideFunctions } = require('../utils/serverSideRendering')
const { programmeFullName } = require('../utils/programmeFullName')

const {
  fillBasicPageConfig,
  fetchAndFillProgrammeProps,
  fillBreadcrumbsDynamicItems,
  fetchAndFillStudyProgrammeVersion,
  fetchAndFillCurriculumSpecializations,
} = require('./programmeStoreSSR')

function metaTitleAndDescription(lang, programmeCode, programmeName, term) {
  const metaTitle = `${programmeFullName(lang, programmeCode, programmeName, term)}, ${i18n.message(
    'programme_appendix2',
    lang
  )}`

  return { metaTitle, metaDescription: '' }
}

async function getIndex(req, res, next) {
  try {
    const lang = language.getLanguage(res)
    const { programmeCode, term } = req.params

    const { createStore, getCompressedStoreCode, renderStaticPage } = getServerSideFunctions()
    const storeId = 'appendix2'
    log.info(`Creating an application store ${storeId}`)

    const applicationStore = createStore(storeId)
    const options = { applicationStore, lang, programmeCode, term }

    log.info(`Starting to fill application store, for ${storeId}`)
    const programmeName = await fetchAndFillProgrammeProps(options, storeId)
    fillBasicPageConfig(options)
    fillBreadcrumbsDynamicItems(options, programmeName)
    await fetchAndFillCurriculumSpecializations(options)
    const compressedStoreCode = getCompressedStoreCode(applicationStore)
    log.info(`${storeId} store was filled in and compressed`)

    const proxyPrefix = serverConfig.proxyPrefixPath.programme
    const html = renderStaticPage({ applicationStore, location: req.url, basename: proxyPrefix })
    const { metaTitle: title, metaDescription: description } = metaTitleAndDescription(
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
