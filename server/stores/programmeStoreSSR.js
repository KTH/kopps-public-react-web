const log = require('@kth/log')

const { browser: browserConfig, server: serverConfig } = require('../configuration')
const koppsApi = require('../kopps/koppsApi')
const { getProgramStructure, getProgramVersion, getActiveProgramInstance } = require('../ladok/ladokApi')
const { parseTerm } = require('../../domain/term')

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

  try {
    const { programInstans, statusCode } = await getProgramVersion(programmeCode, convertedSemester, lang)

    programDetails = {
      title: programInstans?.benamning,
      lengthInStudyYears: programInstans?.lengthInStudyYears,
      creditUnitAbbr: programInstans?.creditUnitAbbr,
      owningSchoolCode: programInstans?.organisation.name,
      credits: programInstans?.omfattning?.number,
      titleOtherLanguage: programInstans?.benamningOther,
      educationalLevel: programInstans?.tilltradesniva.name,
      approvedStudyProgrammeTerms: programInstans.approvedStudyProgrammeTerms,
      lastAdmissionTerm: programInstans?.sistaAntagningstermin,
      firstAdmissionTerm: parseTerm(programInstans?.firstAdmissionTerm),
    }
    applicationStore.setStatusCode(statusCode)
  } catch (error) {
    applicationStore.setStatusCode(503)
    log.debug('Failed to fetch from Ladok api, programmeCode:', programmeCode)
    return
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
  const { studyProgramme, statusCode } = await koppsApi.getStudyProgrammeVersion(programmeCode, term, lang)

  applicationStore.setStatusCode(statusCode)
  if (statusCode !== 200) return { statusCode } // react NotFound

  if (
    storeId === 'eligibility' ||
    storeId === 'extent' ||
    storeId === 'implementation' ||
    storeId === 'objectives' ||
    storeId === 'pdfStore'
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

function _parseCurriculumsAndFillStoreFromStructure(applicationStore, curriculums) {
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
        if (studyYear.courses.length) {
          applicationStore.addStudyYear(studyYear.yearNumber)
        }

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
  const { applicationStore, programmeCode, term, lang } = options

  let curriculumData
  let tillfalleUid

  const convertedSemester = `${term.endsWith('1') ? 'VT' : 'HT'}${term.slice(0, 4)}`

  try {
    const programInstance = await getActiveProgramInstance(programmeCode, convertedSemester, lang)
    const { uid } = programInstance
    tillfalleUid = uid
  } catch (error) {
    log.error('Error in fetching getActiveProgramInstance!')
  }

  if (tillfalleUid) {
    try {
      curriculumData = await getProgramStructure(tillfalleUid, lang)
    } catch (error) {
      applicationStore.setStatusCode(503)
      return
    }
    _parseCurriculumsAndFillStoreFromStructure(applicationStore, curriculumData)
  } else return
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
  let tillfalleUid

  const convertedSemester = `${term.endsWith('1') ? 'VT' : 'HT'}${term.slice(0, 4)}`

  try {
    const programInstance = await getActiveProgramInstance(programmeCode, convertedSemester, lang)
    const { uid } = programInstance
    tillfalleUid = uid
  } catch (error) {}

  if (tillfalleUid) {
    try {
      curriculumData = await getProgramStructure(tillfalleUid, lang)
    } catch (error) {
      applicationStore.setStatusCode(503)
      return
    }
  } else return

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
