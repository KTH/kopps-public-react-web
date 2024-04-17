// @ts-check

const log = require('@kth/log')
const language = require('@kth/kth-node-web-common/lib/language')

const { server: serverConfig } = require('../configuration')
const i18n = require('../../i18n')
const koppsApi = require('../kopps/koppsApi')

const { createThirdCycleBreadcrumbs } = require('../utils/breadcrumbUtil')
const { getServerSideFunctions } = require('../utils/serverSideRendering')
const { fillStoreWithBasicConfig, fetchAndFillSchoolsList } = require('../stores/schoolsListStoreSSR')

async function _fillApplicationStoreWithAllSchoolsInThirdCycleStudy({ applicationStore, lang }) {
  fillStoreWithBasicConfig({ applicationStore, lang })

  const listForActiveCourses = true
  const params = {
    departmentCriteria: koppsApi.DEPARTMENT_CRITERIA.HAS_THIRD_CYCLE_COURSES,
    listForActiveCourses,
    lang,
  }
  await fetchAndFillSchoolsList(applicationStore, params)
}

async function getAllSchoolsAndDepartmentsInThirdCycleStudy(req, res, next) {
  try {
    const lang = language.getLanguage(res)

    const { createStore, getCompressedStoreCode, renderStaticPage } = getServerSideFunctions()
    log.info(`Creating a default application store for schools which have third-cycle courses`)

    const applicationStore = createStore()
    log.debug(`Starting to fill a default application store with schools which have third-cycle courses`)

    await _fillApplicationStoreWithAllSchoolsInThirdCycleStudy({ applicationStore, lang })

    const compressedStoreCode = getCompressedStoreCode(applicationStore)
    log.info(`Default store was filled in and compressed on server side, for schools which have third-cycle courses`)

    const { thirdCycleSchoolsAndDepartments: basename, uri: proxyPrefix } = serverConfig.proxyPrefixPath
    const view = renderStaticPage({ applicationStore, location: req.url, basename: basename })
    const title = i18n.message('third_cycle_courses_by_school', lang)
    const breadcrumbsList = createThirdCycleBreadcrumbs(lang)

    res.render('app/index', {
      instrumentationKey: serverConfig?.appInsights?.instrumentationKey,
      html: view,
      title,
      compressedStoreCode,
      description: '',
      lang,
      proxyPrefix,
      toolbarUrl: serverConfig.toolbar.url,
      studentWeb: true,
      theme: 'student-web',
      breadcrumbsList,
    })
  } catch (err) {
    log.error('Error', { error: err })
    next(err)
  }
}

module.exports = {
  getAllSchoolsAndDepartmentsInThirdCycleStudy,
}
