/* eslint no-use-before-define: ["error", "nofunc"] */

const log = require('@kth/log')
const language = require('@kth/kth-node-web-common/lib/language')

const i18n = require('../../i18n')

// eslint-disable-next-line no-unused-vars
const koppsApi = require('../kopps/koppsApi')
const { searchCourses } = require('../ladok/ladokApi')
const { browser: browserConfig, server: serverConfig } = require('../configuration')

const { createBreadcrumbs, createThirdCycleBreadcrumbs } = require('../utils/breadcrumbUtil')
const { getServerSideFunctions } = require('../utils/serverSideRendering')
const { compareSchools, filterOutDeprecatedSchools } = require('../../domain/schools')
const term = require('../../domain/term')

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
    storeId: 'SearchPage',
    basenameKey: 'searchPage',
    titleKey: 'main_menu_search_all',
    breadcrumbsFn: createBreadcrumbs,
  })
}

async function searchThirdCycleCourses(req, res, next) {
  await renderSearchPage(req, res, next, {
    storeId: 'SearchPage',
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

  // const convertedPeriods = query.period?.reduce((acc, period) => {
  //   const splitedPeriod = period.split(':')
  //   const codes =
  //     splitedPeriod[1] === 'summer' ? [`VT${splitedPeriod[0]}`, `HT${splitedPeriod[0]}`] : [splitedPeriod[0]]
  //   const value = splitedPeriod[1] === 'summer' ? ['0', '5'] : splitedPeriod[1]

  //   codes.forEach(code => {
  //     const existingEntry = acc.find(entry => entry.code === code)

  //     if (existingEntry) {
  //       existingEntry.periods = Array.isArray(existingEntry.periods)
  //         ? [...existingEntry.periods, ...value]
  //         : [existingEntry.periods, ...value]
  //     } else {
  //       acc.push({
  //         code: code,
  //         periods: value,
  //       })
  //     }
  //   })
  //   return acc
  // }, []) // todo - we can use it again when we had the data for periods from ladok

  const searchParams = {
    kodEllerBenamning: query.pattern ? query.pattern : undefined,
    organisation: query.department ? query.department : undefined,
    sprak: query.showOptions?.includes('onlyEnglish') ? 'ENG' : undefined,
    avvecklad: query.showOptions?.includes('showCancelled') ? 'true' : undefined,
    startPeriod: query.semesters ?? undefined,
    utbildningsniva: query.eduLevel ?? undefined,
  }

  try {
    log.debug(` trying to perform a search of courses with ${searchParams} transformed from parameters: `, { query })

    const apiResponse = await searchCourses(searchParams, lang)
    log.debug(` performCourseSearch with ${searchParams} response: `, apiResponse)
    return res.json(apiResponse)
  } catch (error) {
    log.error(` Exception from performCourseSearch with ${searchParams}`, { error })
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
