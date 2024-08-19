/* eslint no-use-before-define: ["error", "nofunc"] */

const log = require('@kth/log')
const language = require('@kth/kth-node-web-common/lib/language')

const i18n = require('../../i18n')

// eslint-disable-next-line no-unused-vars
const koppsApi = require('../kopps/koppsApi')
const { browser: browserConfig, server: serverConfig } = require('../configuration')

const { createBreadcrumbs } = require('../utils/breadcrumbUtil')
const { getServerSideFunctions } = require('../utils/serverSideRendering')
const { compareSchools, filterOutDeprecatedSchools } = require('../../domain/schools')
const { stringifyKoppsSearchParams } = require('../../domain/searchParams')

async function renderSearchPage(
  req,
  res,
  next,
  { storeId, basenameKey, titleKey, breadcrumbsFn, description = 'Search Page', theme = 'student-web' }
) {
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
    const { createStore, getCompressedStoreCode, renderStaticPage } = getServerSideFunctions()
    const applicationStore = createStore(storeId)

    await _fillApplicationStoreWithAllSchools({ applicationStore, lang })

    applicationStore.setLanguage(lang)
    applicationStore.setBrowserConfig(browserConfig, serverConfig.hostUrl)

    const compressedStoreCode = getCompressedStoreCode(applicationStore)

    const { [basenameKey]: basename, uri: proxyPrefix } = serverConfig.proxyPrefixPath
    const html = renderStaticPage({ applicationStore, location: req.url, basename: basename })

    const title = i18n.message(titleKey, lang)
    const breadcrumbsList = breadcrumbsFn(lang)

    res.render('app/index', {
      html,
      title,
      compressedStoreCode,
      description,
      lang,
      proxyPrefix,
      toolbarUrl: serverConfig.toolbar.url,
      studentWeb: theme === 'student-web',
      theme,
      klaroAnalyticsConsentCookie,
      breadcrumbsList,
    })
  } catch (err) {
    log.error('Error', { error: err })
    next(err)
  }
}

async function searchAllCourses(req, res, next) {
  await renderSearchPage(req, res, next, {
    storeId: 'newSearchPage',
    basenameKey: 'newSearchPage',
    titleKey: 'main_menu_search_all',
    breadcrumbsFn: createBreadcrumbs,
  })
}

async function searchThirdCycleCourses(req, res, next) {
  await renderSearchPage(req, res, next, {
    storeId: 'newSearchPage',
    basenameKey: 'thirdCycleCourseSearch',
    titleKey: 'main_menu_third_cycle_courses_search',
    breadcrumbsFn: createThirdCycleBreadcrumbs,
    description: 'Search page for third cycle courses',
    theme: 'external',
  })
}

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

module.exports = {
  searchAllCourses,
  searchThirdCycleCourses,
  performCourseSearch,
}
