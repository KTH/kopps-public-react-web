const log = require('@kth/log')

const { browser: browserConfig, server: serverConfig } = require('../configuration')
const i18n = require('../../i18n')
const koppsApi = require('../kopps/koppsApi')
const { departmentLink, thirdCycleDepartmentLink } = require('../../domain/links')

// @ts-check

module.exports = {
  fillBreadcrumbsDynamicItems,
  fillStoreWithBasicConfig,
  fetchAndFillDepartmentCourses,
  getOnlyThirdCycleCourses,
}
/**
 * add props to a MobX-stores on server side
 * studyType === all -> student/kurser/org/:departmentCode
 * studyType === third-cycle -> utbildning/forskarutbildning/kurser/org/:departmentCode
 * so that its data can be used with the useStore() hook on client side
 *
 */
/**
 * @param {object} options.applicationStore
 * @param {string} options.lang
 * @param {string} options.departmentCode
 * @param {string} departmentName
 * @param {string | undefined} studyType
 */
function fillBreadcrumbsDynamicItems({ applicationStore, lang, departmentCode }, departmentName, studyType = 'all') {
  const departmentBreadCrumbItem = {
    url:
      studyType === 'third-cycle'
        ? thirdCycleDepartmentLink(departmentCode, lang)
        : departmentLink(departmentCode, lang),
    label: departmentName,
  }
  applicationStore.setBreadcrumbsDynamicItems([departmentBreadCrumbItem])
}

/**
 * @param {object} options.applicationStore
 * @param {string} options.lang
 */
function fillStoreWithBasicConfig({ applicationStore, lang }) {
  applicationStore.setLanguage(lang)
  applicationStore.setBrowserConfig(browserConfig, serverConfig.hostUrl)
}

function getOnlyThirdCycleCourses(courses, lang) {
  const THIRD_CYCLE_LEVEL = {
    en: 'Third cycle',
    sv: 'Forskarnivå',
  }
  return courses.filter(course => course.level === THIRD_CYCLE_LEVEL[lang])
}

/**
 * @param {object} options.applicationStore
 * @param {string} options.lang
 * @param {string} options.departmentCode
 * @param {string | undefined} options.studyType
 * @returns {string}
 */
async function fetchAndFillDepartmentCourses({ applicationStore, lang, departmentCode }, studyType = 'all') {
  log.info('Fetching department courses from KOPPs API', { departmentCode })

  const { departmentCourses, statusCode } = await koppsApi.getCourses({ departmentCode, lang })
  applicationStore.setStatusCode(statusCode)
  if (statusCode !== 200) {
    log.info('Failed to fetch department courses from KOPPs api', { departmentCode })
    return
  }
  log.info('Successfully fetched department courses from KOPPs API', { departmentCode })

  const { department: departmentName = '', courses } = departmentCourses
  applicationStore.setDepartmentName(departmentName)

  const coursesByStudyType = studyType === 'third-cycle' ? await getOnlyThirdCycleCourses(courses, lang) : courses

  applicationStore.setDepartmentCourses(coursesByStudyType)

  return departmentName
}
