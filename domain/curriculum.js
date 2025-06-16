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
  let conditionallyElectiveCoursesInformation
  let freeTexts
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
    } else {
      supplementaryInformation = curriculumStudyYear.supplementaryInfo
      conditionallyElectiveCoursesInformation = curriculumStudyYear.conditionallyElectiveCoursesInfo
      freeTexts = curriculumStudyYear.freeTexts
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
            status: course.status,
          },
          applicationCode: course.tillfalleskod, // A course instance in Ladok can have only one tillfalleskod
          term,
          creditsPerPeriod,
        })
      }

      for (const valvillkor in participations) {
        participations[valvillkor].sort((a, b) => {
          if (!a.term && !b.term) return 0
          if (!a.term) return 1 // 'a' is undefined → goes after 'b'
          if (!b.term) return -1 // 'b' is undefined → goes after 'a'
          return a.term.localeCompare(b.term)
        })
      }

      hasInfo =
        Object.keys(participations).length !== 0 || conditionallyElectiveCoursesInformation || supplementaryInformation
    }
  }

  return {
    code,
    specializationName,
    isCommon,
    participations,
    supplementaryInformation,
    conditionallyElectiveCoursesInformation,
    htmlCourses,
    isFirstSpec,
    hasInfo,
    freeTexts,
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
