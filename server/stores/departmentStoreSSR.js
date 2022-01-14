const log = require('kth-node-log')

const { browser: browserConfig, server: serverConfig } = require('../configuration')
const i18n = require('../../i18n')
const koppsApi = require('../kopps/koppsApi')
const { thirdCycleDepartmentLink } = require('../../domain/links')
const { departmentLink } = require('../../domain/links')

// @ts-check

module.exports = {
  fillBreadcrumbsDynamicItems,
  fillStoreWithBasicConfig,
  fetchAndFillDepartmentCourses,
}
/**
 * add props to a MobX-stores on server side
 * student/kurser/org/:departmentCode
 * utbildning/forskarutbildning/kurser/org/:departmentCode
 * so that its data can be used with the useStore() hook on client side
 *
 */
/**
 * @param {object} options.applicationStore
 * @param {string} options.lang
 * @param {string} options.departmentCode
 * @param {string} departmentName
 */
function fillBreadcrumbsDynamicItems({ applicationStore, lang, departmentCode }, departmentName) {
  const departmentBreadCrumbItem = {
    url: departmentLink(departmentCode, lang),
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
  applicationStore.setBrowserConfig(browserConfig)
}

/**
 * @param {object} options.applicationStore
 * @param {string} options.lang
 * @param {string} options.departmentCode
 * @returns {string}
 */
async function fetchAndFillDepartmentCourses({ applicationStore, lang, departmentCode }, studyType = 'all') {
  log.info('Fetching department courses from KOPPs API', { departmentCode })

  const { departmentCourses, statusCode } = await koppsApi.getCourses({ departmentCode, lang })
  applicationStore.setStatusCode(statusCode)
  if (statusCode !== 200) {
    log.debug('Failed to fetch department courses from KOPPs api', { departmentCode })
    return
  }
  log.info('Successfully fetched department courses from KOPPs API', { departmentCode })

  const { department: departmentName = '', courses } = departmentCourses
  applicationStore.setDepartmentName(departmentName)

  applicationStore.setDepartmentCourses(courses)
  return departmentName
}
