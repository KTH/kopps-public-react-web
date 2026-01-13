/* eslint-disable no-use-before-define */
const log = require('@kth/log')
const language = require('@kth/kth-node-web-common/lib/language')

const i18n = require('../../i18n')

const { searchCourseInstances, searchCourseVersions, getSchoolsList } = require('../ladok/ladokApi')
const { browser: browserConfig, server: serverConfig } = require('../configuration')

const { createBreadcrumbs, createThirdCycleBreadcrumbs } = require('../utils/breadcrumbUtil')
const { getServerSideFunctions } = require('../utils/serverSideRendering')
const { performCourseSearchTS } = require('kopps-public-react-web/shared/searchPageCtrlUtils')

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
    const view = renderStaticPage({ applicationStore, location: req.url, basename })

    const title = i18n.message(titleKey, lang)
    const breadcrumbsList = breadcrumbsFn(lang)

    res.render('app/index', {
      html: view,
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
  return performCourseSearchTS(req, res, next, searchCourseInstances, searchCourseVersions)
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
