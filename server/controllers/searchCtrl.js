// @ts-check

const log = require('kth-node-log')
const language = require('kth-node-web-common/lib/language')

const { browser: browserConfig, server: serverConfig } = require('../configuration')
const i18n = require('../../i18n')

const { getServerSideFunctions } = require('../utils/serverSideRendering')

const { getSearchResults } = require('../kopps/koppsApi')
const { stringifyKoppsSearchParams } = require('../../domain/searchParams')

async function searchThirdCycleCourses(req, res, next) {
  try {
    const lang = language.getLanguage(res)
    const { pattern } = req.query
    const { createStore, getCompressedStoreCode, renderStaticPage } = getServerSideFunctions()

    const applicationStore = createStore('searchCourses')
    applicationStore.setLanguage(lang)
    applicationStore.setBrowserConfig(browserConfig, serverConfig.hostUrl)

    applicationStore.setPattern(pattern)

    const compressedStoreCode = getCompressedStoreCode(applicationStore)

    const { uri: proxyPrefix } = serverConfig.proxyPrefixPath
    const html = renderStaticPage({ applicationStore, location: req.url, basename: proxyPrefix })
    const title = i18n.message('site_name', lang)

    res.render('app/index', {
      html,
      title,
      compressedStoreCode,
      description: title,
      lang,
      proxyPrefix,
    })
  } catch (err) {
    log.error('Error in searchThirdCycleCourses', { error: err })
    next(err)
  }
}

async function searchAllCourses(req, res, next) {
  try {
    const lang = language.getLanguage(res)

    const { pattern, eduLevel, showOptions, period } = req.query
    const { createStore, getCompressedStoreCode, renderStaticPage } = getServerSideFunctions()

    const applicationStore = createStore('searchCourses')
    applicationStore.setLanguage(lang)
    applicationStore.setBrowserConfig(browserConfig, serverConfig.hostUrl)

    applicationStore.setPattern(pattern)
    applicationStore.setEduLevels(eduLevel)
    applicationStore.setShowOptions(showOptions)
    applicationStore.setPeriods(period)

    const compressedStoreCode = getCompressedStoreCode(applicationStore)

    const { uri: proxyPrefix } = serverConfig.proxyPrefixPath
    const html = renderStaticPage({ applicationStore, location: req.url, basename: proxyPrefix })
    const title = i18n.message('site_name', lang)

    res.render('app/index', {
      html,
      title,
      compressedStoreCode,
      description: title,
      lang,
      proxyPrefix,
    })
  } catch (err) {
    log.error('Error in searchThirdCycleCourses', { error: err })
    next(err)
  }
}

// eslint-disable-next-line consistent-return
async function performCourseSearch(req, res, next) {
  const { lang } = req.params

  const { query } = req
  //Example: `text_pattern=${pattern}`
  const searchParamsStr = stringifyKoppsSearchParams(query)

  try {
    log.debug('trying to perform search courses with parameters: ')

    const apiResponse = await getSearchResults(searchParamsStr, lang)
    log.debug('performCourseSearch response: ', apiResponse)
    return res.json(apiResponse)
  } catch (error) {
    log.error('Exception from performCourseSearch ', { error })
    next(error)
  }
}

module.exports = {
  performCourseSearch,
  searchAllCourses,
  searchThirdCycleCourses,
}
