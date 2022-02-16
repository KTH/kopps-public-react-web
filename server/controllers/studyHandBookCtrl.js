// @ts-check

const log = require('kth-node-log')
const language = require('kth-node-web-common/lib/language')

const { browser: browserConfig, server: serverConfig } = require('../configuration')
const i18n = require('../../i18n')

const { getServerSideFunctions } = require('../utils/serverSideRendering')

async function getStudyBook(req, res, next) {
  try {
    const lang = language.getLanguage(res)

    const { createStore, getCompressedStoreCode, renderStaticPage } = getServerSideFunctions()

    const applicationStore = createStore()
    applicationStore.setLanguage(lang)
    applicationStore.setBrowserConfig(browserConfig)
    const compressedStoreCode = getCompressedStoreCode(applicationStore)

    const proxyPrefix = serverConfig.proxyPrefixPath.studyHandbook
    const html = renderStaticPage({ applicationStore, location: req.url, basename: proxyPrefix })
    const title = i18n.message('main_menu_shb', lang)

    res.render('app/index', {
      html,
      title,
      compressedStoreCode,
      description: '',
      lang,
      proxyPrefix,
      studentWeb: true,
    })
  } catch (err) {
    log.error('Error in getStudyBook', { error: err })
    next(err)
  }
}

module.exports = {
  getStudyBook,
}
