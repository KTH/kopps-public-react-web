// @ts-check

const log = require('kth-node-log')
const language = require('kth-node-web-common/lib/language')

const { browser: browserConfig, server: serverConfig } = require('../configuration')
const i18n = require('../../i18n')
const koppsApi = require('../kopps/koppsApi')

const { getServerSideFunctions } = require('../utils/serverSideRendering')
const { compareSchools, filterOutDeprecatedSchools } = require('../../domain/schools')
const { thirdCycleDepartmentLink } = require('../../domain/links')

async function _fillApplicationStoreWithAllCourses({ applicationStore, lang }) {
  applicationStore.setLanguage(lang)
  applicationStore.setBrowserConfig(browserConfig)
  const listForActiveCourses = true
  const params = {
    departmentCriteria: koppsApi.DEPARTMENT_CRITERIA.HAS_THIRD_CYCLE_COURSES,
    listForActiveCourses,
    lang,
  }
  const schoolsWithDepartments = await koppsApi.listSchoolsWithDepartments(params)

  const { currentSchoolsWithDepartments, deprecatedSchoolsWithDepartments } = filterOutDeprecatedSchools(
    schoolsWithDepartments,
    lang
  )

  schoolsWithDepartments.sort(compareSchools)
  deprecatedSchoolsWithDepartments.sort(compareSchools)
  currentSchoolsWithDepartments.sort(compareSchools)
  applicationStore.setCurrentSchoolsWithDepartments(currentSchoolsWithDepartments)
  applicationStore.setDeprecatedSchoolsWithDepartments(deprecatedSchoolsWithDepartments)
}

async function getAllSchoolsAndDepartments(req, res, next) {
  try {
    const lang = language.getLanguage(res)

    const { createStore, getCompressedStoreCode, renderStaticPage } = getServerSideFunctions()

    const applicationStore = createStore()
    await _fillApplicationStoreWithAllCourses({ applicationStore, lang })

    const compressedStoreCode = getCompressedStoreCode(applicationStore)

    const proxyPrefix = serverConfig.proxyPrefixPath.thirdCycleSchoolsAndDepartments
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
    log.error('Error in thirdCycleStudyCtrl -> getAllSchoolsAndDepartments', { error: err })
    next(err)
  }
}

function getOnlyThirdCycleCourses(courses, lang) {
  const THIRD_CYCLE_LEVEL = {
    en: 'Third cycle',
    sv: 'Forskarnivå',
  }
  return courses.filter(course => course.level === THIRD_CYCLE_LEVEL[lang])
}

async function _fillCoursesApplicationStoreOnServerSide({ applicationStore, lang, departmentCode }) {
  applicationStore.setLanguage(lang)
  applicationStore.setBrowserConfig(browserConfig)

  const { departmentCourses, statusCode } = await koppsApi.getCourses({ departmentCode, lang })
  applicationStore.setStatusCode(statusCode)
  if (statusCode !== 200) return

  const { department: departmentName = '', courses } = departmentCourses
  applicationStore.setDepartmentName(departmentName)
  applicationStore.setDepartmentCourses(getOnlyThirdCycleCourses(courses, lang))

  const departmentBreadCrumbItem = {
    url: thirdCycleDepartmentLink(departmentCode, lang),
    label: departmentName,
  }
  applicationStore.setBreadcrumbsDynamicItems([departmentBreadCrumbItem])
}

async function getCoursesPerDepartment(req, res, next) {
  try {
    const lang = language.getLanguage(res)
    const { departmentCode } = req.params

    const { createStore, getCompressedStoreCode, renderStaticPage } = getServerSideFunctions()

    const applicationStore = createStore()
    await _fillCoursesApplicationStoreOnServerSide({ applicationStore, lang, departmentCode })

    const compressedStoreCode = getCompressedStoreCode(applicationStore)

    const { thirdCycleCoursesPerDepartment: proxyPrefix } = serverConfig.proxyPrefixPath
    const html = renderStaticPage({ applicationStore, location: req.url, basename: proxyPrefix })
    const title = i18n.message('third_cycle_courses_by_school', lang)

    res.render('app/index', {
      html,
      title,
      compressedStoreCode,
      description: '',
      lang,
      proxyPrefix,
    })
  } catch (err) {
    log.error('Error in thirdCycleStudyCtrl -> getAllSchoolsAndDepartments', { error: err })
    next(err)
  }
}

module.exports = {
  getAllSchoolsAndDepartments,
  getCoursesPerDepartment,
  getOnlyThirdCycleCourses,
}
