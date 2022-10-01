const { isSpringTerm, splitTerm, termConstants } = require('./term')
const { academicYearStartAndEnd } = require('./academicYear')

function _compareParticipations(a, b) {
  let aFirstIndex = Number.MAX_SAFE_INTEGER
  for (let index = 0; index < a.creditsPerPeriod.length; index++) {
    const credit = a.creditsPerPeriod[index]
    if (credit > 0) {
      aFirstIndex = index
      break
    }
  }
  let bFirstIndex = Number.MAX_SAFE_INTEGER
  for (let index = 0; index < b.creditsPerPeriod.length; index++) {
    const credit = b.creditsPerPeriod[index]
    if (credit > 0) {
      bFirstIndex = index
      break
    }
  }
  if (aFirstIndex < bFirstIndex) return -1
  if (aFirstIndex > bFirstIndex) return 1

  const aLastIndex = a.creditsPerPeriod.reduce((lastIndex, credit, index) => (credit > 0 ? index : lastIndex), 0)
  const bLastIndex = b.creditsPerPeriod.reduce((lastIndex, credit, index) => (credit > 0 ? index : lastIndex), 0)
  if (aLastIndex < bLastIndex) return -1
  if (aLastIndex > bLastIndex) return 1
  return 0
}

function _term(yearTerms) {
  if (Array.isArray(yearTerms) && yearTerms.length) {
    return yearTerms[0].term
  }
  return ''
}
/**
 * @param {array} yearTerms
 * @returns {array}
 */
function _creditsPerPeriod(yearTerms) {
  const mergedCreditsPerPeriod = []
  yearTerms.forEach(yearTerm => {
    const { creditsPerPeriod } = yearTerm

    creditsPerPeriod.forEach((credits, index) => {
      if (!mergedCreditsPerPeriod[index]) {
        mergedCreditsPerPeriod[index] = credits
      }
    })
  })
  return mergedCreditsPerPeriod
}

const calculateProgramYear = (programFirstYear, programNthYear) =>
  Math.abs(programNthYear) - 1 + Math.abs(programFirstYear)

/**
 * @param {string} programStartTerm
 * @param {array} courseRoundTerms
 * @param {string} programNthYear // 1,2,3,4,5
 * @returns {array}
 */

function filterCourseRoundsForNthYear(courseRoundTerms, programStartTerm, programNthYear) {
  if (!programStartTerm || !programNthYear || !courseRoundTerms) return []
  const [programFirstYear, programStartSeason] = splitTerm(programStartTerm)

  const programYear = calculateProgramYear(programFirstYear, programNthYear)
  const { startYear: startAcademicYear, endYear: endAcademicYear } = academicYearStartAndEnd(
    `${programYear}${programStartSeason}`
  )

  let expectedStudyTerms
  if (isSpringTerm(programStartTerm))
    expectedStudyTerms = [
      Math.abs(`${startAcademicYear}${termConstants.SPRING_TERM_NUMBER}`),
      Math.abs(`${startAcademicYear}${termConstants.AUTUMN_TERM_NUMBER}`),
    ]
  else
    expectedStudyTerms = [
      Math.abs(`${startAcademicYear}${termConstants.AUTUMN_TERM_NUMBER}`),
      Math.abs(`${endAcademicYear}${termConstants.SPRING_TERM_NUMBER}`),
    ]

  const yearCourseRoundTerms = courseRoundTerms.filter(({ term }) => expectedStudyTerms.includes(Math.abs(term)))
  return yearCourseRoundTerms
}

/**
 * @param {object} options.programmeTermYear
 * @param {object} options.curriculum
 * @returns {object}
 */
function curriculumInfo({ programmeTermYear = {}, curriculum }) {
  let code = ''
  let specializationName = null
  let isCommon = true

  let supplementaryInformation
  let conditionallyELectiveCoursesInformation
  const participations = {}
  const isFirstSpec = false

  const { programmeSpecialization, studyYears } = curriculum
  const { programStartTerm, studyYear } = programmeTermYear

  if (programmeSpecialization) {
    code = programmeSpecialization.programmeSpecializationCode
    specializationName = programmeSpecialization.title
    isCommon = false
  }

  const [curriculumStudyYear] = studyYears.filter(s => Math.abs(s.yearNumber) === Math.abs(studyYear))

  if (curriculumStudyYear) {
    supplementaryInformation = curriculumStudyYear.supplementaryInfo
    conditionallyELectiveCoursesInformation = curriculumStudyYear.conditionallyElectiveCoursesInfo

    for (const course of curriculumStudyYear.courses) {
      if (!participations[course.electiveCondition]) participations[course.electiveCondition] = []
      const round = curriculum.courseRounds.find(courseRound => courseRound.courseCode === course.courseCode) || {}

      const { applicationCodes = [], courseRoundTerms = [] } = round

      const courseRoundsForNthYear = filterCourseRoundsForNthYear(courseRoundTerms, programStartTerm, studyYear)

      const term = _term(courseRoundsForNthYear) // ???
      participations[course.electiveCondition].push({
        course,
        applicationCodes,
        term,
        creditsPerPeriod: _creditsPerPeriod(courseRoundsForNthYear),
      })
      participations[course.electiveCondition].sort(_compareParticipations)
    }
  }

  const hasInfo = Object.keys(participations).length !== 0 || !!supplementaryInformation

  return {
    code,
    specializationName,
    isCommon,
    supplementaryInformation,
    conditionallyELectiveCoursesInformation,
    participations,
    isFirstSpec,
    hasInfo,
  }
}

function setFirstSpec(cis) {
  for (let i = 0; i < cis.length; i++) {
    const ci = cis[i]
    if (ci.code) {
      ci.isFirstSpec = true
      break
    }
  }
}

const ELECTIVE_CONDITIONS = ['ALL', 'O', 'VV', 'R', 'V']

module.exports = {
  curriculumInfo,
  setFirstSpec,
  filterCourseRoundsForNthYear,
  ELECTIVE_CONDITIONS,
}
