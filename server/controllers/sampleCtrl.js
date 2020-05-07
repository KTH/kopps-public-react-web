/* eslint no-use-before-define: ["error", "nofunc"] */

// @ts-check

const api = require('../api')
const log = require('kth-node-log')
const serverConfig = require('../configuration').server

const { getServerSideFunctions } = require('../utils/serverSideRendering')

async function getIndex(req, res, next) {
  try {
    const { createStore, getCompressedStoreCode, renderStaticPage } = getServerSideFunctions()

    const applicationStore = createStore()

    await _fillApplicationStoreOnServerSide({ applicationStore, query: req.query })

    const compressedStoreCode = getCompressedStoreCode(applicationStore)

    const { uri: basename } = serverConfig.proxyPrefixPath
    const html = renderStaticPage({ applicationStore, location: req.url, basename })

    res.render('sample/index', {
      html,
      title: 'TODO',
      compressedStoreCode,
      // lang: lang,
      description: 'TODO', // lang === 'sv' ? "KTH  för "+courseCode.toUpperCase() : "KTH course information "+courseCode.toUpperCase()
    })
  } catch (err) {
    log.error('Error in getIndex', { error: err })
    next(err)
  }
}

async function _fillApplicationStoreOnServerSide({ applicationStore, query }) {
  applicationStore.setMessage('Tjena!')
}

module.exports = {
  getIndex,
}
