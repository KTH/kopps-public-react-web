const { browser: browserConfig, server: serverConfig } = require('../configuration')
const i18n = require('../../i18n')
const koppsApi = require('../kopps/koppsApi')
const { programmeLink } = require('../../domain/links')

// @ts-check

module.exports = {
  fillBasicPageConfig,
  fetchAndFillProgrammeProps,
  fillBreadcrumbsDynamicItems,
  fetchAndFillCurriculumList,
  fetchAndFillCurriculumSpecializations,
}
/**
 * add props to a MobX-stores on server side
 * Appendix1, Appendix2
 * so that its data can be used with the useStore() hook on client side
 *
 * @param {object} options.applicationStore
 * @param {string} options.lang
 * @param {string} options.programmeCode
 * @param {string} options.term
 */

function fillBasicPageConfig({ applicationStore, lang, programmeCode, term }) {
  applicationStore.setLanguage(lang)
  applicationStore.setBrowserConfig(browserConfig)
  applicationStore.setProgrammeCode(programmeCode)
  if (term) applicationStore.setTerm(term)
  return
}

/**
 * @param {object} options.applicationStore
 * @param {string} options.lang
 * @param {string} options.programmeCode
 * @param {string} options.term
 * @param {string} storeId
 * @returns {string}
 */
async function fetchAndFillProgrammeProps({ applicationStore, lang, programmeCode, term }, storeId = '') {
  const { programme, statusCode } = await koppsApi.getProgramme(programmeCode, lang)
  applicationStore.setStatusCode(statusCode)
  if (statusCode !== 200) return // react NotFound

  const { title: programmeName, lengthInStudyYears, creditUnitAbbr, owningSchoolCode } = programme
  applicationStore.setProgrammeName(programmeName)
  applicationStore.setLengthInStudyYears(lengthInStudyYears)
  if (storeId === 'appendix1') applicationStore.setCreditUnitAbbr(creditUnitAbbr)
  if (storeId === 'curriculum') {
    applicationStore.setCreditUnitAbbr(creditUnitAbbr)
    applicationStore.setOwningSchoolCode(owningSchoolCode)
  }

  return programmeName
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
 * @returns {string}
 */
async function _fetchAndFillStudyProgrammeVersion({ applicationStore, lang, programmeCode, term, storeId }) {
  const { studyProgramme, statusCode } = await koppsApi.getStudyProgrammeVersion(programmeCode, term, lang)

  applicationStore.setStatusCode(statusCode)
  if (statusCode !== 200) return // react NotFound

  if (storeId === 'appendix1') applicationStore.setStudyProgramme(studyProgramme) // only works for store appendix 1

  const { id: studyProgrammeId } = studyProgramme

  return studyProgrammeId
}

/**
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
  const studyProgrammeId = await _fetchAndFillStudyProgrammeVersion({ ...options, storeId: 'appendix1' })
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
async function fetchAndFillCurriculumSpecializations(options) {
  const { applicationStore, lang } = options
  const studyProgrammeId = await _fetchAndFillStudyProgrammeVersion({ ...options, storeId: 'appendix2' })
  if (!studyProgrammeId) return
  const { curriculums, statusCode: secondStatusCode } = await koppsApi.listCurriculums(studyProgrammeId, lang)
  applicationStore.setStatusCode(secondStatusCode)
  if (secondStatusCode !== 200) return // react NotFound

  const specializations = _parseSpecializations(curriculums)
  applicationStore.setSpecializations(specializations)
  return
}
