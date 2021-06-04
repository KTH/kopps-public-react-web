const { getNextTerm } = require('./term')

function _compareParticipations(a, b) {
  let aFirstIndex = 0
  for (let index = 0; index < a.creditsPerPeriod.length; index++) {
    const credit = a.creditsPerPeriod[index]
    if (credit > 0) {
      aFirstIndex = index
      break
    }
  }
  let bFirstIndex = 0
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

function _term(courseRoundTerms) {
  if (Array.isArray(courseRoundTerms) && courseRoundTerms.length) {
    return courseRoundTerms[0].term
  }
  return ''
}

function _creditsPerPeriod(courseRoundTerms, currentTerm) {
  // TODO: Decide on string or number, le sigh.
  const nextTerm = getNextTerm(currentTerm).toString()
  const mergedCreditsPerPeriod = []
  courseRoundTerms.forEach(courseRoundTerm => {
    const { term, creditsPerPeriod } = courseRoundTerm
    // TODO: Really is an academic year, and should probably be managed as one
    if (term === currentTerm || term === nextTerm) {
      creditsPerPeriod.forEach((credits, index) => {
        if (!mergedCreditsPerPeriod[index]) {
          mergedCreditsPerPeriod[index] = credits
        }
      })
    }
  })
  return mergedCreditsPerPeriod
}

function curriculumInfo({ programmeTermYear, curriculum }) {
  let code = ''
  let specializationName = null
  let isCommon = true

  let supplementaryInformation
  let conditionallyELectiveCoursesInformation
  const participations = {}
  const isFirstSpec = false

  const { programmeSpecialization, studyYears } = curriculum

  if (programmeSpecialization) {
    code = programmeSpecialization.programmeSpecializationCode
    specializationName = programmeSpecialization.title
    isCommon = false
  }

  const [curriculumStudyYear] = studyYears.filter(s => Math.abs(s.yearNumber) === Math.abs(programmeTermYear.studyYear))
  if (curriculumStudyYear) {
    supplementaryInformation = curriculumStudyYear.supplementaryInfo
    conditionallyELectiveCoursesInformation = curriculumStudyYear.conditionallyElectiveCoursesInfo

    for (const course of curriculumStudyYear.courses) {
      if (!participations[course.electiveCondition]) participations[course.electiveCondition] = []
      const round = curriculum.courseRounds.find(courseRound => courseRound.courseCode === course.courseCode) || {}
      const { applicationCodes = [], courseRoundTerms = [] } = round
      const term = _term(courseRoundTerms)
      participations[course.electiveCondition].push({
        course,
        applicationCodes,
        term,
        creditsPerPeriod: _creditsPerPeriod(courseRoundTerms, term, course.courseCode),
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
  ELECTIVE_CONDITIONS,
}
