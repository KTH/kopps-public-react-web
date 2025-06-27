const log = require('@kth/log')

const { browser: browserConfig, server: serverConfig } = require('../configuration')
const koppsApi = require('../kopps/koppsApi')
const { getDepartmentWithCourseList } = require('../ladok/ladokApi')

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
 * @param {boolean} [onlyThirdCycle=false]
 * @returns {string}
 */
async function fetchAndFillDepartmentCoursesFromLadok(
  { applicationStore, lang, departmentCode },
  onlyThirdCycle = false
) {
  log.info('Fetching department courses from Ladok API', { departmentCode })

  const { departmentWithCourseList } = await getDepartmentWithCourseList(departmentCode, lang, onlyThirdCycle)
  const statusCode = 200

  applicationStore.setStatusCode(statusCode)
  if (statusCode !== 200) {
    log.info('Failed to fetch department courses from Ladok api', { departmentCode })
    return
  }
  log.info('Successfully fetched department courses from Ladok API', { departmentCode })

  const { department: departmentName = '', courses } = departmentWithCourseList
  applicationStore.setDepartmentName(departmentName)

  applicationStore.setDepartmentCourses(courses)

  // eslint-disable-next-line consistent-return
  return departmentName
}

module.exports = {
  fillStoreWithBasicConfig,
  getOnlyThirdCycleCourses,
  fetchAndFillDepartmentCoursesFromLadok,
}
