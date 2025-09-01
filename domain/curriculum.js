const LASPERIOD_INDEX = {
  P0: 0,
  P1: 1,
  P2: 2,
  P3: 3,
  P4: 4,
  P5: 5,
}

const getSpecializationInfo = programmeSpecialization => {
  if (!programmeSpecialization) {
    return { code: '', specializationName: null, isCommon: true }
  }
  return {
    code: programmeSpecialization.programmeSpecializationCode,
    specializationName: programmeSpecialization.title,
    isCommon: false,
  }
}

const findStudyYear = (studyYears, studyYear) => {
  return studyYears.find(s => Math.abs(s.yearNumber) === Math.abs(studyYear))
}

const baseResult = ({ code, specializationName, isCommon }) => {
  return {
    code,
    specializationName,
    isCommon,
    participations: {},
    supplementaryInformation: undefined,
    conditionallyElectiveCoursesInformation: undefined,
    htmlCourses: undefined,
    isFirstSpec: false,
    hasInfo: false,
    freeTexts: undefined,
  }
}

function sortParticipationsByTerm(participations) {
  for (const valvillkor in participations) {
    participations[valvillkor].sort((a, b) => {
      if (!a.term && !b.term) return 0
      if (!a.term) return 1
      if (!b.term) return -1
      return a.term.localeCompare(b.term)
    })
  }
}

function mapCourse(course) {
  return {
    courseCode: course.kod,
    title: course.benamning,
    credits: course.omfattning?.number,
    formattedCredits: course.omfattning?.formattedWithUnit,
    educationalLevel: course.utbildningstyp?.level?.name,
    electiveCondition: course.Valvillkor,
    status: course.status,
  }
}

  const PERIOD_COUNT = Object.keys(LASPERIOD_INDEX).length
  const creditsPerPeriod = Array(PERIOD_COUNT).fill(0)
  course.Tillfallesperioder?.forEach(period => {
    period.Lasperiodsfordelning?.forEach(lasperiod => {
      const index = LASPERIOD_INDEX[lasperiod.Lasperiodskod] || 0
      creditsPerPeriod[index] += lasperiod.Omfattningsvarde
    })
  })
  return creditsPerPeriod
}

const processCourses = (courses, studyYearData) => {
  const participations = {}

  for (const course of courses) {
    if (!participations[course.Valvillkor]) {
      participations[course.Valvillkor] = []
    }

    const creditsPerPeriod = calculateCreditsPerPeriod(course)
    participations[course.Valvillkor].push({
      course: mapCourse(course),
      applicationCode: course.tillfalleskod,
      term: course?.startperiod?.inDigits,
      creditsPerPeriod,
    })
  }

  sortParticipationsByTerm(participations)

  return {
    participations,
    supplementaryInformation: studyYearData.supplementaryInfo,
    conditionallyElectiveCoursesInformation: studyYearData.conditionallyElectiveCoursesInfo,
    freeTexts: studyYearData.freeTexts,
  }
}

/**
 * Extract curriculum information for a given programme term year.
 * @param {object} options
 * @param {object} options.programmeTermYear
 * @param {object} options.curriculum
 * @returns {object}
 */
function curriculumInfo({ programmeTermYear = {}, curriculum }) {
  const { programmeSpecialization, studyYears } = curriculum
  const { studyYear } = programmeTermYear

  const { code, specializationName, isCommon } = getSpecializationInfo(programmeSpecialization)

  const curriculumStudyYear = findStudyYear(studyYears, studyYear)
  if (!curriculumStudyYear) {
    return baseResult({ code, specializationName, isCommon })
  }

  if (typeof curriculumStudyYear.courses === 'string') {
    return {
      ...baseResult({ code, specializationName, isCommon }),
      htmlCourses: curriculumStudyYear.courses,
      hasInfo: true,
    }
  }
  const { participations, supplementaryInformation, conditionallyElectiveCoursesInformation, freeTexts } =
    processCourses(curriculumStudyYear.courses, curriculumStudyYear)

  const hasInfo =
    Object.keys(participations).length > 0 ||
    Boolean(conditionallyElectiveCoursesInformation) ||
    Boolean(supplementaryInformation)

  return {
    code,
    specializationName,
    isCommon,
    participations,
    supplementaryInformation,
    conditionallyElectiveCoursesInformation,
    htmlCourses: undefined,
    isFirstSpec: false,
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
