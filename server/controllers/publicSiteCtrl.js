/* eslint no-use-before-define: ["error", "nofunc"] */

// @ts-check

const log = require('kth-node-log')
const language = require('kth-node-web-common/lib/language')

// eslint-disable-next-line no-unused-vars
const api = require('../api')
const serverConfig = require('../configuration').server

const { getServerSideFunctions } = require('../utils/serverSideRendering')

async function getIndex(req, res, next) {
  try {
    const lang = language.getLanguage(res)

    const { createStore, getCompressedStoreCode, renderStaticPage } = getServerSideFunctions()

    const applicationStore = createStore()
    applicationStore.setLanguage(lang)

    await _fillApplicationStoreOnServerSide({ applicationStore, query: req.query })

    const compressedStoreCode = getCompressedStoreCode(applicationStore)

    const { uri: proxyPrefix } = serverConfig.proxyPrefixPath
    const html = renderStaticPage({ applicationStore, location: req.url, basename: proxyPrefix })

    res.render('sample/index', {
      html,
      title: 'TODO',
      compressedStoreCode,
      description: 'TODO',
      breadcrumbsPath: [],
      lang,
      proxyPrefix,
    })
  } catch (err) {
    log.error('Error in getIndex', { error: err })
    next(err)
  }
}

// eslint-disable-next-line no-unused-vars
async function _fillApplicationStoreOnServerSide({ applicationStore, query }) {
  applicationStore.setMessage('Tjena!')
}

module.exports = {
  getIndex,
}
