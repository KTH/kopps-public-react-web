const log = require('@kth/log')

const { browser: browserConfig, server: serverConfig } = require('../configuration')
const { getProgrammeCurriculum, getProgrammeVersion, getProgrammeSyllabus } = require('../ladok/ladokApi')
const { isOldProgramme } = require('../../domain/oldProgrammes')

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
  const programmeCodeUpperCase = programmeCode?.toUpperCase()

  applicationStore.setLanguage(lang)
  applicationStore.setBrowserConfig(browserConfig)
  applicationStore.setProgrammeCode(programmeCodeUpperCase)
  if (term) applicationStore.setTerm(term) // appendixes
  // storeId === 'curriculum'?
  if (studyYear) applicationStore.setStudyYear(studyYear) // curriculumCtrl
  return
}

function fillBrowserConfigWithHostUrl({ applicationStore }) {
  applicationStore.setBrowserConfig(browserConfig, serverConfig.hostUrl)
}

/**
 * @param {object} options.applicationStore
 * @param {string} options.lang
 * @param {string} options.programmeCode
 * @param {string} storeId
 * @returns {object}
 */
async function fetchAndFillProgrammeDetails({ applicationStore, term, lang, programmeCode }, storeId = '') {
  log.info('Fetching programme from KOPPs API, programmeCode:', programmeCode)

  let programDetails

  const convertedSemester = term ? `${term.endsWith('1') ? 'VT' : 'HT'}${term.slice(0, 4)}` : undefined

  if (programmeCode.length < 2) {
    return {
      programmeName: programmeCode,
      isOldProgramme: true,
      approvedStudyProgrammeTerms: [],
    }
  }

  try {
    const { programmeVersion, statusCode } = await getProgrammeVersion(programmeCode, convertedSemester, lang)

    if (!programmeVersion) {
      return {
        programmeName: programmeCode,
        approvedStudyProgrammeTerms: [],
      }
    }

    programDetails = {
      title: programmeVersion?.benamning,
      lengthInStudyYears: programmeVersion?.lengthInStudyYears,
      creditUnitAbbr: programmeVersion?.creditUnitAbbr,
      owningSchoolCode: programmeVersion?.organisation.name,
      credits: programmeVersion?.omfattning?.number,
      titleOtherLanguage: programmeVersion?.benamningOther,
      educationalLevel: programmeVersion?.tilltradesniva?.name ?? programmeVersion?.utbildningstyp?.level?.name,
      approvedStudyProgrammeTerms: programmeVersion?.approvedStudyProgrammeSemesters,
      lastAdmissionTerm: programmeVersion?.sistaAntagningstermin?.toKTHSemesterString(),
      firstAdmissionTerm: programmeVersion?.firstAdmissionSemester?.toKTHSemesterString(),
      isOldProgramme: isOldProgramme(programmeVersion?.utbildningstyp?.code),
    }
    applicationStore.setStatusCode(statusCode)
  } catch (error) {
    applicationStore.setStatusCode(503)
    log.debug('Failed to fetch from Ladok api, programmeCode:', programmeCode)
    return {
      programmeName: programmeCode,
      approvedStudyProgrammeTerms: [],
    }
  }

  log.info('Successfully fetched programme from KOPPs API, programmeCode:', programmeCode)

  const {
    title: programmeName,
    lengthInStudyYears,
    creditUnitAbbr,
    owningSchoolCode,
    credits,
    titleOtherLanguage,
    educationalLevel,
  } = programDetails
  applicationStore.setProgrammeName(programmeName)
  applicationStore.setLengthInStudyYears(lengthInStudyYears)
  if (storeId === 'appendix1' || storeId === 'pdfStore') {
    applicationStore.setCreditUnitAbbr(creditUnitAbbr)
  }
  if (storeId === 'curriculum') {
    applicationStore.setOwningSchoolCode(owningSchoolCode)
  }
  if (storeId === 'pdfStore') {
    applicationStore.setCredits(credits)
    applicationStore.setProgrammeNameInOtherLanguage(titleOtherLanguage)
    applicationStore.setEducationalLevel(educationalLevel)
  }
  // eslint-disable-next-line consistent-return
  return { programmeName, ...programDetails }
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
  let studyProgramme

  const convertedSemester = `${term.endsWith('1') ? 'VT' : 'HT'}${term.slice(0, 4)}`
  try {
    studyProgramme = await getProgrammeSyllabus(programmeCode, convertedSemester, lang)
    if (!studyProgramme) {
      applicationStore.setStatusCode(404)
      return
    }
  } catch (error) {
    applicationStore.setStatusCode(404)
    return
  }
  if (
    storeId === 'eligibility' ||
    storeId === 'extent' ||
    storeId === 'implementation' ||
    storeId === 'objectives' ||
    storeId === 'pdfStore'
  ) {
    applicationStore.setStudyProgramme(studyProgramme)
  }
  return studyProgramme
}

/**
 * Appendix 1
 *
 * @param {object} applicationStore
 * @param {array} curriculums
 */

function _parseCurriculumsAndFillStore(applicationStore, curriculums) {
  curriculums.forEach(curriculum => {
    if (
      curriculum.programmeSpecialisation &&
      Array.isArray(curriculum.studyYears) &&
      curriculum.studyYears.some(studyYear => studyYear.courses?.length > 0)
    ) {
      // Specialization
      const { programmeSpecialisation, studyYears } = curriculum
      const { programmeSpecialisationCode: code, title, description } = programmeSpecialisation
      applicationStore.addSpecialization({
        code,
        title,
        description,
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

          applicationStore.addFreeTexts(studyYear.freeTexts, code, studyYear.yearNumber)

          studyYear.courses.forEach(course => {
            const {
              kod: courseCode,
              benamning: name,
              omfattning: { number: credits, formattedWithUnit: formattedCredits },
              utbildningstyp: {
                level: { name: level },
              },
              Valvillkor: electiveCondition,
            } = course

            applicationStore.addElectiveConditionCourse(
              {
                code: courseCode,
                name,
                credits,
                formattedCredits,
                formattedLevel: level,
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
        if (typeof studyYear.courses === 'string') {
          applicationStore.addHtmlStudyYear(studyYear.courses, studyYear.yearNumber)
          return
        }

        if (studyYear.courses.length || studyYear.supplementaryInfo || studyYear.conditionallyElectiveCoursesInfo) {
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

        applicationStore.addFreeTexts(studyYear.freeTexts, 'Common', studyYear.yearNumber)

        studyYear.courses.forEach(course => {
          const {
            kod: courseCode,
            benamning: name,
            omfattning: { number: credits, formattedWithUnit: formattedCredits },
            utbildningstyp: {
              level: { name: level },
            },
            Valvillkor: electiveCondition,
          } = course

          applicationStore.addElectiveConditionCourse(
            {
              code: courseCode,
              name,
              credits,
              formattedCredits,
              formattedLevel: level,
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
    .filter(curriculum => curriculum.programmeSpecialisation)
    .map(curriculum => {
      const { programmeSpecialisation } = curriculum
      const { programmeSpecialisationCode: code, title } = programmeSpecialisation
      const description = programmeSpecialisation.description || null
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
  const { applicationStore, programmeCode, term, lang } = options

  let curriculumData

  const convertedSemester = `${term.endsWith('1') ? 'VT' : 'HT'}${term.slice(0, 4)}`

  try {
    curriculumData = await getProgrammeCurriculum(programmeCode, convertedSemester, lang)
  } catch (error) {
    applicationStore.setStatusCode(503)
    return
  }
  _parseCurriculumsAndFillStore(applicationStore, curriculumData)
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
  const { applicationStore, programmeCode, term, lang } = options
  let curriculumData

  const convertedSemester = `${term.endsWith('1') ? 'VT' : 'HT'}${term.slice(0, 4)}`

  try {
    curriculumData = await getProgrammeCurriculum(programmeCode, convertedSemester, lang)
  } catch (error) {
    applicationStore.setStatusCode(503)
    return
  }

  const specializations = _parseSpecializations(curriculumData)
  applicationStore.setSpecializations(specializations)
  return
}

module.exports = {
  fillStoreWithQueryParams,
  fetchAndFillProgrammeDetails,
  fetchAndFillCurriculumList,
  fetchAndFillSpecializations,
  fetchAndFillStudyProgrammeVersion,
  fillBrowserConfigWithHostUrl,
}
