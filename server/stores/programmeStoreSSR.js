const log = require('kth-node-log')

const { browser: browserConfig, server: serverConfig } = require('../configuration')
const i18n = require('../../i18n')
const koppsApi = require('../kopps/koppsApi')
const { programmeLink } = require('../../domain/links')

// @ts-check

module.exports = {
  fillStoreWithQueryParams,
  fetchAndFillProgrammeDetails,
  fillBreadcrumbsDynamicItems,
  fetchAndFillCurriculumList,
  fetchAndFillSpecializations,
  fetchAndFillStudyProgrammeVersion,
}
/**
 * add props to a MobX-stores on server side
 * Appendix1, Appendix2, Curriculum, Eligibility
 * so that its data can be used with the useStore() hook on client side
 *
 */

/**
 * Appendix1, Appendix2, Curriculum, Eligibility
 * @param {object} options.applicationStore
 * @param {string} options.lang
 * @param {string} options.programmeCode
 * @param {string | undefined} options.studyYear
 * @param {string | undefined} options.term
 */

function fillStoreWithQueryParams({ applicationStore, lang, programmeCode, studyYear, term }) {
  applicationStore.setLanguage(lang)
  applicationStore.setBrowserConfig(browserConfig)
  applicationStore.setProgrammeCode(programmeCode)
  if (term) applicationStore.setTerm(term) // appendixes
  // storeId === 'curriculum'?
  if (studyYear) applicationStore.setStudyYear(studyYear) // curriculumCtrl
  return
}

/**
 * @param {object} options.applicationStore
 * @param {string} options.lang
 * @param {string} options.programmeCode
 * @param {string} storeId
 * @returns {object}
 */
async function fetchAndFillProgrammeDetails({ applicationStore, lang, programmeCode }, storeId = '') {
  log.info('Fetching programme from KOPPs API, programmeCode:', programmeCode)

  const { programme, statusCode } = await koppsApi.getProgramme(programmeCode, lang)
  applicationStore.setStatusCode(statusCode)
  if (statusCode !== 200 || !programme) {
    log.debug('Failed to fetch from KOPPs api, programmeCode:', programmeCode)
    return
  } // react NotFound

  log.info('Successfully fetched programme from KOPPs API, programmeCode:', programmeCode)

  const { title: programmeName, lengthInStudyYears, creditUnitAbbr, owningSchoolCode } = programme
  applicationStore.setProgrammeName(programmeName)
  applicationStore.setLengthInStudyYears(lengthInStudyYears)
  if (storeId === 'appendix1') applicationStore.setCreditUnitAbbr(creditUnitAbbr)
  if (storeId === 'curriculum') {
    applicationStore.setOwningSchoolCode(owningSchoolCode)
  }

  return { programmeName, ...programme }
}

/**
 * @param {object} options.applicationStore
 * @param {string} options.lang
 * @param {string} options.programmeCode
 * @param {string} programmeName
 */
function fillBreadcrumbsDynamicItems({ applicationStore, lang, programmeCode }, programmeName) {
  const departmentBreadCrumbItem = {
    url: programmeLink(programmeCode, lang),
    label: programmeName,
  }
  applicationStore.setBreadcrumbsDynamicItems([departmentBreadCrumbItem])
}

/**
 *
 * @param {object} options.applicationStore
 * @param {string} options.lang
 * @param {string} options.programmeCode
 * @param {string} options.term
 * @param {string} options.storeId
 * @returns {object}
 */
async function fetchAndFillStudyProgrammeVersion({ applicationStore, lang, programmeCode, term, storeId }) {
  const { studyProgramme, statusCode } = await koppsApi.getStudyProgrammeVersion(programmeCode, term, lang)

  applicationStore.setStatusCode(statusCode)
  if (statusCode !== 200) return { statusCode } // react NotFound

  if (
    storeId === 'appendix1' ||
    storeId === 'eligibility' ||
    storeId === 'extent' ||
    storeId === 'implementation' ||
    storeId === 'objectives'
  ) {
    applicationStore.setStudyProgramme(studyProgramme)
  }
  const { id: studyProgrammeId } = studyProgramme

  return { studyProgrammeId, statusCode }
}

/**
 * Appendix 1
 *
 * @param {object} applicationStore
 * @param {array} curriculums
 */
function _parseCurriculums(applicationStore, curriculums) {
  curriculums.forEach(curriculum => {
    if (curriculum.programmeSpecialization) {
      // Specialization
      const { programmeSpecialization, studyYears } = curriculum
      const { programmeSpecializationCode: code, title } = programmeSpecialization
      applicationStore.addSpecialization({
        code,
        title,
        studyYears: studyYears.reduce((years, studyYear) => {
          if (studyYear.courses.length) {
            years.push(studyYear.yearNumber)
          }
          if (studyYear.supplementaryInfo) {
            applicationStore.addSupplementaryInfo(studyYear.supplementaryInfo, studyYear.yearNumber, code)
          }
          if (studyYear.conditionallyElectiveCoursesInfo) {
            applicationStore.addConditionallyElectiveCoursesInfo(
              studyYear.conditionallyElectiveCoursesInfo,
              studyYear.yearNumber,
              code
            )
          }
          studyYear.courses.forEach(course => {
            const {
              courseCode,
              title: name,
              comment,
              credits,
              creditUnitAbbr: creditAbbr,
              educationalLevel: level,
              electiveCondition,
            } = course
            applicationStore.addElectiveConditionCourse(
              {
                code: courseCode,
                name,
                comment,
                credits,
                creditAbbr,
                level,
              },
              electiveCondition,
              studyYear.yearNumber,
              code
            )
          })
          return years
        }, []),
      })
    } else {
      // Common
      const { studyYears } = curriculum
      studyYears.forEach(studyYear => {
        if (studyYear.courses.length) {
          applicationStore.addStudyYear(studyYear.yearNumber)
        }
        if (studyYear.supplementaryInfo) {
          applicationStore.addSupplementaryInfo(studyYear.supplementaryInfo, studyYear.yearNumber, 'Common')
        }
        if (studyYear.conditionallyElectiveCoursesInfo) {
          applicationStore.addConditionallyElectiveCoursesInfo(
            studyYear.conditionallyElectiveCoursesInfo,
            studyYear.yearNumber,
            'Common'
          )
        }
        studyYear.courses.forEach(course => {
          const {
            courseCode: code,
            title: name,
            comment,
            credits,
            creditUnitAbbr: creditAbbr,
            educationalLevel: level,
            electiveCondition,
          } = course
          applicationStore.addElectiveConditionCourse(
            {
              code,
              name,
              comment,
              credits,
              creditAbbr,
              level,
            },
            electiveCondition,
            studyYear.yearNumber,
            'Common'
          )
        })
      })
    }
  })
}

/**
 * Appendix 2
 *
 * @param {array} curriculums
 * @returns {array}
 */
function _parseSpecializations(curriculums) {
  return curriculums
    .filter(curriculum => curriculum.programmeSpecialization)
    .map(curriculum => {
      const { programmeSpecialization } = curriculum
      const { programmeSpecializationCode: code, title } = programmeSpecialization
      const description = programmeSpecialization.description || null
      const specialization = {
        code,
        title,
        description,
      }
      return specialization
    })
}
/**
 * Appendix 1
 *
 * @param {object} options.applicationStore
 * @param {string} options.lang
 * @param {string} options.programmeCode
 * @param {string} options.term
 */
async function fetchAndFillCurriculumList(options) {
  const { applicationStore, lang } = options
  const { studyProgrammeId } = await fetchAndFillStudyProgrammeVersion({ ...options, storeId: 'appendix1' })
  if (!studyProgrammeId) return
  const { curriculums, statusCode: secondStatusCode } = await koppsApi.listCurriculums(studyProgrammeId, lang)
  applicationStore.setStatusCode(secondStatusCode)
  if (secondStatusCode !== 200) return // react NotFound
  _parseCurriculums(applicationStore, curriculums)
  return
}

/**
 * Appendix 2
 *
 * @param {object} options.applicationStore
 * @param {string} options.lang
 * @param {string} options.programmeCode
 * @param {string} options.term
 */
async function fetchAndFillSpecializations(options) {
  const { applicationStore, lang } = options
  const { studyProgrammeId } = await fetchAndFillStudyProgrammeVersion({ ...options, storeId: 'appendix2' })
  if (!studyProgrammeId) return
  const { curriculums, statusCode: secondStatusCode } = await koppsApi.listCurriculums(studyProgrammeId, lang)
  applicationStore.setStatusCode(secondStatusCode)
  if (secondStatusCode !== 200) return // react NotFound

  const specializations = _parseSpecializations(curriculums)
  applicationStore.setSpecializations(specializations)
  return
}
