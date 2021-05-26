function curriculumInfo({ programmeTermYear, curriculum }) {
  let code = null
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
      participations[course.electiveCondition].push({
        course,
        round: curriculum.courseRounds.find(courseRound => courseRound.courseCode === course.courseCode),
      })
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
