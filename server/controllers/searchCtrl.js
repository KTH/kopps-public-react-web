// @ts-check

const log = require('@kth/log')
const language = require('@kth/kth-node-web-common/lib/language')

const { browser: browserConfig, server: serverConfig } = require('../configuration')
const i18n = require('../../i18n')

const { getServerSideFunctions } = require('../utils/serverSideRendering')

const koppsApi = require('../kopps/koppsApi')
const { stringifyKoppsSearchParams } = require('../../domain/searchParams')
const { compareSchools, filterOutDeprecatedSchools } = require('../../domain/schools')

async function searchThirdCycleCourses(req, res, next) {
  try {
    const lang = language.getLanguage(res)

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

    const { pattern } = req.query
    const { createStore, getCompressedStoreCode, renderStaticPage } = getServerSideFunctions()

    const applicationStore = createStore('searchCourses')
    applicationStore.setLanguage(lang)
    applicationStore.setBrowserConfig(browserConfig, serverConfig.hostUrl)

    applicationStore.setPattern(pattern)

    const compressedStoreCode = getCompressedStoreCode(applicationStore)

    const { thirdCycleCourseSearch: proxyPrefix } = serverConfig.proxyPrefixPath
    const view = renderStaticPage({ applicationStore, location: req.url, basename: proxyPrefix })
    const title = i18n.message('main_menu_third_cycle_courses_search', lang)

    res.render('app/index', {
      instrumentationKey: serverConfig?.appInsights?.instrumentationKey,
      html: view,
      title,
      compressedStoreCode,
      description: '',
      lang,
      proxyPrefix,
      studentWeb: true,
      klaroAnalyticsConsentCookie,
    })
  } catch (err) {
    log.error('Error', { error: err })
    next(err)
  }
}

async function _fillApplicationStoreWithAllSchools({ applicationStore, lang }) {
  applicationStore.setLanguage(lang)
  applicationStore.setBrowserConfig(browserConfig, serverConfig.hostUrl)

  const listForActiveCourses = true
  const params = {
    departmentCriteria: koppsApi.DEPARTMENT_CRITERIA.HAS_COURSES,
    listForActiveCourses,
    lang,
  }
  const { schoolsWithDepartments } = await koppsApi.listSchoolsWithDepartments(params)
  const { currentSchoolsWithDepartments, deprecatedSchoolsWithDepartments } = filterOutDeprecatedSchools(
    schoolsWithDepartments,
    lang
  )
  deprecatedSchoolsWithDepartments.sort(compareSchools)
  currentSchoolsWithDepartments.sort(compareSchools)
  applicationStore.setCurrentSchoolsWithDepartments(currentSchoolsWithDepartments)
  applicationStore.setDeprecatedSchoolsWithDepartments(deprecatedSchoolsWithDepartments)
  schoolsWithDepartments.sort(compareSchools)
  applicationStore.setSchoolsWithDepartments(schoolsWithDepartments)
}

async function searchAllCourses(req, res, next) {
  try {
    const lang = language.getLanguage(res)

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

    const { department, pattern, eduLevel, showOptions, period } = req.query
    const { createStore, getCompressedStoreCode, renderStaticPage } = getServerSideFunctions()

    const applicationStore = createStore('searchCourses')
    await _fillApplicationStoreWithAllSchools({ applicationStore, lang })

    applicationStore.setPattern(pattern)
    applicationStore.setEduLevels(eduLevel)
    applicationStore.setShowOptions(showOptions)
    applicationStore.setPeriods(period)
    applicationStore.setDepartmentCodeOrPrefix(department)

    const compressedStoreCode = getCompressedStoreCode(applicationStore)

    const { courseSearch: proxyPrefix } = serverConfig.proxyPrefixPath
    const view = renderStaticPage({ applicationStore, location: req.url, basename: proxyPrefix })
    const title = i18n.message('main_menu_search_all', lang)

    res.render('app/index', {
      instrumentationKey: serverConfig?.appInsights?.instrumentationKey,
      html: view,
      title,
      compressedStoreCode,
      description: '',
      lang,
      proxyPrefix,
      studentWeb: true,
      klaroAnalyticsConsentCookie,
    })
  } catch (err) {
    log.error('Error', { error: err })
    next(err)
  }
}

// eslint-disable-next-line consistent-return
async function performCourseSearch(req, res, next) {
  const { lang } = req.params

  const { query } = req
  // Example: `text_pattern=${pattern}`
  const searchParamsStr = stringifyKoppsSearchParams(query)

  try {
    log.debug(` trying to perform a search of courses with ${searchParamsStr} transformed from parameters: `, { query })

    const apiResponse = await koppsApi.getSearchResults(searchParamsStr, lang)
    log.debug(` performCourseSearch with ${searchParamsStr} response: `, apiResponse)
    return res.json(apiResponse)
  } catch (error) {
    log.error(` Exception from performCourseSearch with ${searchParamsStr}`, { error })
    next(error)
  }
}

module.exports = {
  performCourseSearch,
  searchAllCourses,
  searchThirdCycleCourses,
}
