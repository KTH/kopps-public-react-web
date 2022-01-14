// @ts-check

const log = require('kth-node-log')
const language = require('kth-node-web-common/lib/language')

const { server: serverConfig } = require('../configuration')
const i18n = require('../../i18n')
const koppsApi = require('../kopps/koppsApi')

const { getServerSideFunctions } = require('../utils/serverSideRendering')
const { compareSchools, filterOutDeprecatedSchools } = require('../../domain/schools')
const { thirdCycleDepartmentLink } = require('../../domain/links')
const { metaTitleAndDescriptionByDepartment } = require('../utils/titles')
const {
  fillBreadcrumbsDynamicItems,
  fillStoreWithBasicConfig,
  fetchAndFillDepartmentCourses,
} = require('../stores/departmentStoreSSR')

function getOnlyThirdCycleCourses(courses, lang) {
  const THIRD_CYCLE_LEVEL = {
    en: 'Third cycle',
    sv: 'Forskarnivå',
  }
  return courses.filter(course => course.level === THIRD_CYCLE_LEVEL[lang])
}

async function _fillCoursesApplicationStoreOnServerSide({ applicationStore, lang, departmentCode }) {
  fillStoreWithBasicConfig({ applicationStore, lang })

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

    const { metaTitle: title, metaDescription: description } = metaTitleAndDescriptionByDepartment(departmentName, lang)

    res.render('app/index', {
      html,
      title,
      compressedStoreCode,
      description: '',
      lang,
      proxyPrefix,
    })
  } catch (err) {
    log.error('Error in thirdCycleStudyCtrl -> getAllSchoolsAndDepartmentsInThirdCycleStudy', { error: err })
    next(err)
  }
}

module.exports = {
  getCoursesPerDepartment,
  getOnlyThirdCycleCourses,
}
