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

async function newSearchCourses(req, res, next) {
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
    const storeId = 'newSearchPage'
    const applicationStore = createStore(storeId)
    applicationStore.setLanguage(lang)
    applicationStore.setBrowserConfig(browserConfig, serverConfig.hostUrl)

    await _fillApplicationStoreOnServerSide({ applicationStore, query: req.query })
    await _fillApplicationStoreWithAllSchools({ applicationStore, lang })

    const compressedStoreCode = getCompressedStoreCode(applicationStore)

    const { uri: basename, uri: proxyPrefix } = serverConfig.proxyPrefixPath
    const html = renderStaticPage({ applicationStore, location: req.url, basename: basename })

    const title = i18n.message('main_menu_search_all', lang)

    const breadcrumbsList = createBreadcrumbs(lang)

    res.render('app/index', {
      html,
      title,
      compressedStoreCode,
      description: 'Search ',
      lang,
      proxyPrefix,
      toolbarUrl: serverConfig.toolbar.url,
      studentWeb: true,
      theme: 'student-web',
      klaroAnalyticsConsentCookie,
      breadcrumbsList,
    })
  } catch (err) {
    log.error('Error', { error: err })
    next(err)
  }
}

// eslint-disable-next-line no-unused-vars
async function _fillApplicationStoreOnServerSide({ applicationStore, query }) {
  const { department, pattern, eduLevel, showOptions, period } = query
  applicationStore.setPattern(pattern)
  applicationStore.setEduLevels(eduLevel)
  applicationStore.setShowOptions(showOptions)
  applicationStore.setPeriods(period)
  applicationStore.setDepartmentCodeOrPrefix(department)
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
  newSearchCourses,
}
