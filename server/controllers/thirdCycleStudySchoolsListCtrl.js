// @ts-check

const log = require('@kth/log')
const language = require('kth-node-web-common/lib/language')

const { server: serverConfig } = require('../configuration')
const i18n = require('../../i18n')
const koppsApi = require('../kopps/koppsApi')

const { getServerSideFunctions } = require('../utils/serverSideRendering')
const { compareSchools, filterOutDeprecatedSchools } = require('../../domain/schools')
const { thirdCycleDepartmentLink } = require('../../domain/links')
const { metaTitleAndDescriptionByDepartment } = require('../utils/titles')
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

    const { thirdCycleSchoolsAndDepartments: proxyPrefix } = serverConfig.proxyPrefixPath
    const html = renderStaticPage({ applicationStore, location: req.url, basename: proxyPrefix })
    const title = i18n.message('third_cycle_courses_by_school', lang)

    res.render('app/index', {
      html,
      title,
      compressedStoreCode,
      description: '',
      lang,
      proxyPrefix,
      studentWeb: true,
    })
  } catch (err) {
    log.error('Error in thirdCycleStudyCtrl -> getAllSchoolsAndDepartmentsInThirdCycleStudy', { error: err })
    next(err)
  }
}

module.exports = {
  getAllSchoolsAndDepartmentsInThirdCycleStudy,
}
