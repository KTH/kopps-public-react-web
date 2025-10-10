/* eslint no-use-before-define: ["error", "nofunc"] */

const log = require('@kth/log')
const language = require('@kth/kth-node-web-common/lib/language')

const i18n = require('../../i18n')

const { searchCourseInstances, searchCourseVersions, getSchoolsList } = require('../ladok/ladokApi')
const { browser: browserConfig, server: serverConfig } = require('../configuration')

const { createBreadcrumbs, createThirdCycleBreadcrumbs } = require('../utils/breadcrumbUtil')
const { getServerSideFunctions } = require('../utils/serverSideRendering')
const { ResultType } = require('../../shared/dist/ResultType')

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

    await _fillApplicationStoreWithAllLadokSchools({ applicationStore, lang })

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
  // TODO Benni periods

  const searchParams = {
    kodEllerBenamning: query.pattern ? query.pattern : undefined,
    organisation: query.department ? query.department : undefined,
    sprak: query.showOptions?.includes('onlyEnglish') ? 'ENG' : undefined, // TODO Benni, make this a boolean?
    avvecklad: query.showOptions?.includes('showCancelled') ? 'true' : undefined,
    startPeriod: query.semesters ?? undefined,
    utbildningsniva: query.eduLevel ?? undefined,
    onlyMHU: query.showOptions?.includes('onlyMHU') ? 'true' : undefined,
  }

  try {
    log.debug(` trying to perform a search of courses with ${searchParams} transformed from parameters: `, { query })

    // TODO Benni we should be able to return "no query restriction was specified" error already here (or even better in the client)

    let type = ResultType.VERSION
    let apiResponse

    if (searchParams.sprak || searchParams.startPeriod) {
      apiResponse = await searchCourseInstances(searchParams, lang)
      type = ResultType.INSTANCE
    } else {
      apiResponse = await searchCourseVersions(searchParams, lang)
      type = ResultType.VERSION
    }

    log.debug(` performCourseSearch to ${type} with searchParams:`, searchParams)

    // Types for this are in the TS-client: SearchResponse
    const searchResponse = {
      searchData: {
        results: apiResponse.searchHits,
        type,
      },
      errorCode: apiResponse.errorCode,
    }

    return res.json(searchResponse)
  } catch (error) {
    log.error(` Exception from performCourseSearch with ${searchParams}`, { error })
    next(error)
  }
}

const _fillApplicationStoreWithAllLadokSchools = async ({ applicationStore, lang }) => {
  const [currentSchoolsWithDepartments, deprecatedSchoolsWithDepartments] = await Promise.all([
    getSchoolsList(lang),
    getSchoolsList(lang, true),
  ])
  applicationStore.setCurrentSchoolsWithDepartments(currentSchoolsWithDepartments)
  applicationStore.setDeprecatedSchoolsWithDepartments(deprecatedSchoolsWithDepartments)
}

module.exports = {
  searchAllCourses,
  searchThirdCycleCourses,
  performCourseSearch,
}
