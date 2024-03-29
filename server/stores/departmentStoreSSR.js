const log = require('@kth/log')

const { browser: browserConfig, server: serverConfig } = require('../configuration')
const koppsApi = require('../kopps/koppsApi')

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
 * @param {string | undefined} options.studyLevel
 * @returns {string}
 */
async function fetchAndFillDepartmentCourses({ applicationStore, lang, departmentCode }, studyLevel = 'all') {
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

  const coursesByStudyLevel = studyLevel === 'third-cycle' ? await getOnlyThirdCycleCourses(courses, lang) : courses

  applicationStore.setDepartmentCourses(coursesByStudyLevel)

  // eslint-disable-next-line consistent-return
  return departmentName
}

module.exports = {
  fillStoreWithBasicConfig,
  fetchAndFillDepartmentCourses,
  getOnlyThirdCycleCourses,
}
