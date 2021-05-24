function curriculumInfo({ programmeTermYear, curriculum, courseRounds }) {
  let code = null
  let specializationName = null
  let isCommon = true

  let supplementaryInformation
  let conditionallyELectiveCoursesInformation
  const participations = []
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
      participations.push({
        course,
        round: courseRounds.find(courseRound => courseRound.courseCoode === course.courseCode),
      })
    }
  }

  const hasInfo = participations.length !== 0 || !!supplementaryInformation

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

module.exports = {
  curriculumInfo,
  setFirstSpec,
}
