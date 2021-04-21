/* eslint no-use-before-define: ["error", "nofunc"] */

// @ts-check

const log = require('kth-node-log')
const language = require('kth-node-web-common/lib/language')
const { getPaths } = require('kth-node-express-routing')

const { browser: browserConfig, server: serverConfig } = require('../configuration')
const i18n = require('../../i18n')

// eslint-disable-next-line no-unused-vars
const api = require('../api')

const { getServerSideFunctions } = require('../utils/serverSideRendering')

async function getIndex(req, res, next) {
  return getFovSearch(req, res, next)
}

async function getFovSearch(req, res, next) {
  try {
    const lang = language.getLanguage(res)

    const { createStore, getCompressedStoreCode, renderStaticPage } = getServerSideFunctions()

    const applicationStore = createStore()
    applicationStore.setLanguage(lang)

    await _fillApplicationStoreOnServerSide({ applicationStore, query: req.query })

    const compressedStoreCode = getCompressedStoreCode(applicationStore)

    const { uri: proxyPrefix } = serverConfig.proxyPrefixPath
    const html = renderStaticPage({ applicationStore, location: req.url, basename: proxyPrefix })
    const title = i18n.message('site_name', lang)

    res.render('sample/index', {
      html,
      title,
      compressedStoreCode,
      description: title,
      lang,
      proxyPrefix,
    })
  } catch (err) {
    log.error('Error in getIndex', { error: err })
    next(err)
  }
}

async function getReady(req, res, next) {
  try {
    const lang = language.getLanguage(res)
    const { uri: proxyPrefix } = serverConfig.proxyPrefixPath
    const title = i18n.message('site_name', lang)
    const pageHeader = i18n.message('ready_paths', lang)
    const redirectHeader = i18n.message('redirect_paths', lang)

    const { public: publicPaths, redirect: redirectPaths } = getPaths()
    const publicPathsList = `${Object.keys(publicPaths)
      .map(path => `<li><a href="${publicPaths[path].uri}">${publicPaths[path].uri}</a></li>`)
      .join('')}`
    const redirectPathsList = `${Object.keys(redirectPaths)
      .map(path => `<li><a href="${redirectPaths[path].uri}">${redirectPaths[path].uri}</a></li>`)
      .join('')}`
    const html = `<h1>${pageHeader}</h1><ul>${publicPathsList}</ul><details><summary class="white">${redirectHeader}</summary><ul>${redirectPathsList}</ul></details>`

    res.render('ready/index', {
      html,
      title,
      description: title,
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
  applicationStore.setBrowserConfig(browserConfig)
}

module.exports = {
  getIndex,
  getFovSearch,
  getReady,
}
