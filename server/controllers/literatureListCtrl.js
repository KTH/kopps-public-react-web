// @ts-check

const log = require('@kth/log')
const language = require('@kth/kth-node-web-common/lib/language')

const { server: serverConfig } = require('../configuration')
const i18n = require('../../i18n')

const koppsApi = require('../kopps/koppsApi')

const { getServerSideFunctions } = require('../utils/serverSideRendering')
const { compareSchools } = require('../../domain/schools')
const { fillStoreWithBasicConfig } = require('../stores/schoolsListStoreSSR')
const { formatLongTerm } = require('../../domain/term')

/**
 * @param {object} options.applicationStore
 * @param {string} options.lang
 * @param {string} options.term
 * @param {string} options.school
 */
async function _fillApplicationStoreOnServerSide({ applicationStore, lang, term, school }) {
  fillStoreWithBasicConfig({ applicationStore, lang })

  applicationStore.setSelectedSchoolCode(school)
  applicationStore.setSelectedTerm(term)

  const schools = await koppsApi.listSchools({ lang })
  schools.sort(compareSchools)
  applicationStore.setSchools(schools)

  const literature = await koppsApi.literatureForCourse({ school, term, lang })
  literature.sort((a, b) => {
    if (a.courseCode < b.courseCode) {
      return -1
    }

    if (a.courseCode > b.courseCode) {
      return 1
    }

    return 0
  })
  applicationStore.setLiterature(literature)
}

async function getLiteratureList(req, res, next) {
  try {
    const lang = language.getLanguage(res)

    const { createStore, getCompressedStoreCode, renderStaticPage } = getServerSideFunctions()
    const { term, school } = req.params

    let klaroConsentCookie = false
    if (req.cookies.klaro) {
      const consentCookiesArray = req.cookies.klaro.slice(1, -1).split(',')
      // eslint-disable-next-line prefer-destructuring
      const analyticsConsentCookieString = consentCookiesArray
        .find(cookie => cookie.includes('analytics-consent'))
        .split(':')[1]
      // eslint-disable-next-line no-const-assign
      klaroConsentCookie = Boolean(analyticsConsentCookieString)
    }

    const storeId = 'literatureList'

    log.info(` Creating an application store ${storeId} on server side `, { term, school })

    const applicationStore = createStore(storeId)
    log.info(` Starting to fill in application store ${storeId} on server side `, { term, school })

    await _fillApplicationStoreOnServerSide({ applicationStore, lang, term, school })
    const compressedStoreCode = getCompressedStoreCode(applicationStore)

    log.info(` ${storeId} store was filled in and compressed on server side `, { term, school })

    const { literatureList: proxyPrefix } = serverConfig.proxyPrefixPath

    const view = renderStaticPage({ applicationStore, location: req.url, basename: proxyPrefix })

    const langIndex = lang === 'en' ? 0 : 1
    const { heading } = i18n.messages[langIndex].literatureList

    const title = `${heading} ${formatLongTerm(term, lang)} ${school}`

    res.render('app/index', {
      instrumentationKey: serverConfig?.appInsights?.instrumentationKey,
      html: view,
      title,
      compressedStoreCode,
      description: title,
      lang,
      proxyPrefix,
      studentWeb: true,
      cookies: klaroConsentCookie,
    })
  } catch (err) {
    log.error('Error', { error: err })
    next(err)
  }
}

module.exports = {
  getLiteratureList,
}
