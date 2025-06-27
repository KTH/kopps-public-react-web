const log = require('@kth/log')

const { browser: browserConfig, server: serverConfig } = require('../configuration')
const i18n = require('../../i18n')
const koppsApi = require('../kopps/koppsApi')
const { getSchoolsListForCoursesPerSchool } = require('../ladok/ladokApi')

module.exports = {
  fillStoreWithBasicConfig,
  fetchAndFillSchoolsList,
}
/**
 * add props to a MobX-stores on server side
 * list of shools with departments
 * schools with any type of courses -> student/kurser/org/
 * schools which has third-cycle courses -> utbildning/forskarutbildning/kurser/avdelning
 * so that its data can be used with the useStore() hook on client side
 *
 */

/**
 * @param {object} options.applicationStore
 * @param {string} options.lang
 */
function fillStoreWithBasicConfig({ applicationStore, lang }) {
  applicationStore.setLanguage(lang)
  applicationStore.setBrowserConfig(browserConfig, serverConfig.hostUrl)
}

/**
 * @param {object} applicationStore
 * @param {string} params.lang
 * @returns {object}
 */
async function fetchAndFillSchoolsList(applicationStore, params) {
  log.info('Fetching schools with departments', params)

  let schoolsWithDepartments
  try {
    schoolsWithDepartments = await getSchoolsListForCoursesPerSchool(params)
    applicationStore.setStatusCode(200)
    log.info('Successfully fetched schools with departments', params)
  } catch (error) {
    log.info('Failed to fetch schools', params)
    return
  }

  const { current: currentSchools, deprecated: deprecatedSchools } = schoolsWithDepartments

  applicationStore.setCurrentSchoolsWithDepartments(currentSchools)
  applicationStore.setDeprecatedSchoolsWithDepartments(deprecatedSchools)

  return [...currentSchools, ...deprecatedSchools]
}
