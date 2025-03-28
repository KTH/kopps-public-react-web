const log = require('@kth/log')

const { browser: browserConfig, server: serverConfig } = require('../configuration')
const koppsApi = require('../kopps/koppsApi')
const { programmeLink } = require('../../domain/links')
const { getActiveProgramTillfalle, getProgramStructure } = require('../ladok/ladokApi')

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

  const year = term.slice(0, 4)
  const convertedTerm = `${term.endsWith('1') ? 'VT' : 'HT'}${term.slice(0, 4)}`

  if (year >= 2025) {
    // TODO - this is for test now, the exact year needs to be changed after the actual user stories are ready
    const program = await getActiveProgramTillfalle(programmeCode, convertedTerm, lang)
    programDetails = {
      title: program.benamning,
      lengthInStudyYears: program.lengthInStudyYears,
      creditUnitAbbr: program.creditUnitAbbr,
      owningSchoolCode: program.organisation.name,
      credits: program.omfattning.number,
      titleOtherLanguage: program.organisation.nameOther,
      educationalLevel: program.tilltradesniva.name,
      tillfalleUid: program.uid,
    }
  } else {
    const { programme, statusCode } = await koppsApi.getProgramme(programmeCode, lang)
    programDetails = programme
    applicationStore.setStatusCode(statusCode)
    if (statusCode !== 200 || !programme) {
      log.debug('Failed to fetch from KOPPs api, programmeCode:', programmeCode)
      return
    } // react NotFound
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
function _parseCurriculumsAndFillStore(applicationStore, curriculums) {
  curriculums.forEach(curriculum => {
    if (curriculum.programmeSpecialization) {
      // Specialization
      const { programmeSpecialization, studyYears } = curriculum
      const { programmeSpecializationCode: code, title, description } = programmeSpecialization
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
async function fetchAndFillCurriculumList(options, tillfalleUid) {
  const { applicationStore, lang } = options

  let curriculumData

  if (tillfalleUid) {
    curriculumData = await getProgramStructure(tillfalleUid, lang)
  } else {
    const { studyProgrammeId } = await fetchAndFillStudyProgrammeVersion({ ...options }) // we are not using the programmeStudy data here so I removed the option of saving it to store
    if (!studyProgrammeId) return
    const { curriculums, statusCode: secondStatusCode } = await koppsApi.listCurriculums(studyProgrammeId, lang)
    curriculumData = curriculums
    applicationStore.setStatusCode(secondStatusCode)
    if (secondStatusCode !== 200) return // react NotFound
  }

  if (tillfalleUid) _parseCurriculumsAndFillStoreFromStructure(applicationStore, curriculumData)
  else _parseCurriculumsAndFillStore(applicationStore, curriculumData)
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
async function fetchAndFillSpecializations(options, tillfalleUid) {
  const { applicationStore, lang } = options
  let curriculumData
  if (!tillfalleUid) {
    const { studyProgrammeId } = await fetchAndFillStudyProgrammeVersion({ ...options, storeId: 'appendix2' })
    if (!studyProgrammeId) return
    const { curriculums, statusCode: secondStatusCode } = await koppsApi.listCurriculums(studyProgrammeId, lang)
    curriculumData = curriculums
    applicationStore.setStatusCode(secondStatusCode)
    if (secondStatusCode !== 200) return // react NotFound
  } else {
    curriculumData = await getProgramStructure(tillfalleUid, lang)
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
