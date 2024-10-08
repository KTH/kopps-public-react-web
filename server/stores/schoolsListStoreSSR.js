const log = require('@kth/log')

const { browser: browserConfig, server: serverConfig } = require('../configuration')
const i18n = require('../../i18n')
const koppsApi = require('../kopps/koppsApi')
const { compareSchools, filterOutDeprecatedSchools } = require('../../domain/schools')

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
 * @param {string} params.departmentCriteria
 * @param {boolean} params.listForActiveCourses
 * @param {string} params.lang
 * @returns {object}
 */
async function fetchAndFillSchoolsList(applicationStore, params) {
  const { departmentCriteria, lang } = params
  log.info('Fetching schools with departments', { departmentCriteria: params.departmentCriteria })

  const { schoolsWithDepartments, statusCode } = await koppsApi.listSchoolsWithDepartments(params)
  applicationStore.setStatusCode(statusCode)
  if (statusCode !== 200) {
    log.info('Failed to fetch schools', { departmentCriteria })
    return
  }
  log.info('Successfully fetched schools with departments', { departmentCriteria })

  const { currentSchoolsWithDepartments, deprecatedSchoolsWithDepartments } = await filterOutDeprecatedSchools(
    schoolsWithDepartments,
    lang
  )
  await deprecatedSchoolsWithDepartments.sort(compareSchools)
  await currentSchoolsWithDepartments.sort(compareSchools)
  applicationStore.setCurrentSchoolsWithDepartments(currentSchoolsWithDepartments)
  applicationStore.setDeprecatedSchoolsWithDepartments(deprecatedSchoolsWithDepartments)

  return schoolsWithDepartments
}
