/* eslint no-use-before-define: ["error", "nofunc"] */

// @ts-check

const log = require('@kth/log')
const language = require('@kth/kth-node-web-common/lib/language')
const { getPaths } = require('kth-node-express-routing')

const { browser: browserConfig, server: serverConfig } = require('../configuration')
const i18n = require('../../i18n')

// eslint-disable-next-line no-unused-vars
const api = require('../api')

const formatPaths = pathsObject => {
  const pathNames = Object.keys(pathsObject)

  const pathsArray = pathNames.map(pathName => {
    return [pathName, pathsObject[pathName].uri]
  })

  return pathsArray
}

const printPaths = (pathType, pathsObject) => {
  let output = ''

  const pathsArray = formatPaths(pathsObject)

  pathsArray.forEach(pathConfig => {
    output += `|${pathConfig.join('|')}|\n`
  })

  console.log(`${pathType} paths (${pathsArray.length})`)
  console.log('|PathName|URI|')
  console.log('|--|--|')
  console.log(output)
}

async function getReady(req, res, next) {
  try {
    const lang = language.getLanguage(res)
    const { uri: proxyPrefix } = serverConfig.proxyPrefixPath
    const title = i18n.message('site_name', lang)
    const pageHeader = i18n.message('ready_paths', lang)
    const redirectHeader = i18n.message('redirect_paths', lang)

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

    const { public: publicPaths, redirect: redirectPaths, api, system } = getPaths()
    const publicPathsList = `${Object.keys(publicPaths)
      .map(path => `<li><a href="${publicPaths[path].uri}">${publicPaths[path].uri}</a></li>`)
      .join('')}`
    const redirectPathsList = `${Object.keys(redirectPaths)
      .map(path => `<li><a href="${redirectPaths[path].uri}">${redirectPaths[path].uri}</a></li>`)
      .join('')}`
    const html = `<h1>${pageHeader}</h1><ul>${publicPathsList}</ul><details><summary class="white">${redirectHeader}</summary><ul>${redirectPathsList}</ul></details>`

    printPaths('system', system)
    printPaths('api', api)
    printPaths('public', publicPaths)
    printPaths('redirect', redirectPaths)

    res.render('ready/index', {
      html,
      title,
      description: title,
      lang,
      proxyPrefix,
      klaroAnalyticsConsentCookie,
    })
  } catch (err) {
    log.error('Error', { error: err })
    next(err)
  }
}

// eslint-disable-next-line no-unused-vars
async function _fillApplicationStoreOnServerSide({ applicationStore, query }) {
  applicationStore.setMessage('Tjena!')
  applicationStore.setBrowserConfig(browserConfig)
}

module.exports = {
  getReady,
}
