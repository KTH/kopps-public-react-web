const { isSpringTerm, splitTerm, termConstants } = require('./term')
const { academicYearStartAndEnd } = require('./academicYear')

const LASPERIOD_INDEX = {
  P0: 0,
  P1: 1,
  P2: 2,
  P3: 3,
  P4: 4,
  P5: 5,
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
  const { studyYear } = programmeTermYear

  if (programmeSpecialization) {
    code = programmeSpecialization.programmeSpecializationCode
    specializationName = programmeSpecialization.title
    isCommon = false
  }

  const [curriculumStudyYear] = studyYears.filter(s => Math.abs(s.yearNumber) === Math.abs(studyYear))

  let hasInfo = false
  let htmlCourses = undefined

  if (curriculumStudyYear) {
    if (typeof curriculumStudyYear.courses === 'string') {
      htmlCourses = curriculumStudyYear.courses
      hasInfo = true
    } else if (Array.isArray(curriculumStudyYear.courses)) {
      supplementaryInformation = curriculumStudyYear.supplementaryInfo
      conditionallyELectiveCoursesInformation = curriculumStudyYear.conditionallyElectiveCoursesInfo
      for (const course of curriculumStudyYear.courses) {
        if (!participations[course.Valvillkor]) participations[course.Valvillkor] = []

        const term = course?.startperiod?.inDigits

        const creditsPerPeriod = [0, 0, 0, 0, 0, 0]
        course.Tillfallesperioder?.forEach(period => {
          period.Lasperiodsfordelning?.forEach(lasperiod => {
            const periodIndex = LASPERIOD_INDEX[lasperiod.Lasperiodskod] || 0
            creditsPerPeriod[periodIndex] += lasperiod.Omfattningsvarde
          })
        })

        participations[course.Valvillkor].push({
          course: {
            courseCode: course.kod,
            title: course.benamning,
            credits: course.omfattning?.number,
            formattedCredits: course.omfattning?.formattedWithUnit,
            educationalLevel: course.utbildningstyp?.level?.name,
            electiveCondition: course.Valvillkor,
          },
          applicationCodes: [course.tillfalleskod],
          term,
          creditsPerPeriod,
        })

        participations[course.Valvillkor].sort((a, b) => {
          if (!a.term && !b.term) return 0
          if (!a.term) return 1 // 'a' is undefined → goes after 'b'
          if (!b.term) return -1 // 'b' is undefined → goes after 'a'
          return a.term.localeCompare(b.term)
        })
      }

      hasInfo = Object.keys(participations).length !== 0
    }
  }

  return {
    code,
    specializationName,
    isCommon,
    participations,
    supplementaryInformation,
    conditionallyELectiveCoursesInformation,
    htmlCourses,
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
