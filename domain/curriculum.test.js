const { curriculumInfo, setFirstSpec } = require('./curriculum')

const firstYear = 1
const secondYear = 2
const thirdYear = 3

const courseNoElectiveConditionAAA = {
  courseCode: 'AA1000',
  title: 'AAA',
  credits: 1.0,
  creditUnitLabel: 'Högskolepoäng',
  creditUnitAbbr: 'hp',
  educationalLevel: 'BASIC',
  electiveCondition: 'O',
}

const courseNoElectiveConditionBBB = {
  courseCode: 'BB1000',
  title: 'BBB',
  credits: 2.0,
  creditUnitLabel: 'Högskolepoäng',
  creditUnitAbbr: 'hp',
  educationalLevel: 'BASIC',
  electiveCondition: 'O',
}

const firstYearCourses = {
  yearNumber: firstYear,
  courses: [courseNoElectiveConditionAAA, courseNoElectiveConditionBBB],
}

const thirdYearCoursesWithSupplementaryInformation = {
  yearNumber: thirdYear,
  supplementaryInfo: 'Extra information',
  courses: [courseNoElectiveConditionAAA, courseNoElectiveConditionBBB],
}

const thirdYearCoursesWithConditionallyElectiveCoursesInformation = {
  yearNumber: thirdYear,
  conditionallyElectiveCoursesInfo: 'Elective information',
  courses: [courseNoElectiveConditionAAA, courseNoElectiveConditionBBB],
}

const curriculumWithProgrammeSpecialization = {
  programmeSpecialization: {
    programmeSpecializationCode: 'A',
    title: 'A Special Programme',
  },
  studyYears: [firstYearCourses],
  courseRounds: [],
}

const curriculumWithSupplementaryInformation = {
  studyYears: [thirdYearCoursesWithSupplementaryInformation],
  courseRounds: [],
}

const curriculumWithConditionallyElectiveCoursesInformation = {
  studyYears: [thirdYearCoursesWithConditionallyElectiveCoursesInformation],
  courseRounds: [],
}

const curriculum = { studyYears: [firstYearCourses], courseRounds: [] }

describe('Create curriculum info', () => {
  test('with non-existing study year', () => {
    const programmeTermYear = { studyYear: secondYear }
    const info = curriculumInfo({ programmeTermYear, curriculum })
    expect(info.hasInfo).toBeFalse()
  })
  test('with programme specialization', () => {
    const programmeTermYear = { studyYear: firstYear }
    const info = curriculumInfo({ programmeTermYear, curriculum: curriculumWithProgrammeSpecialization })
    expect(info.code).toBeString()
    expect(info.specializationName).toBeString()
    expect(info.isCommon).toBeFalse()
    expect(info.hasInfo).toBeTrue()
  })
  test('without programme specialization', () => {
    const programmeTermYear = { studyYear: firstYear }
    const info = curriculumInfo({ programmeTermYear, curriculum })
    expect(info.code).toBeNull()
    expect(info.specializationName).toBeNull()
    expect(info.hasInfo).toBeTrue()
  })
  test('with supplementary information', () => {
    const programmeTermYear = { studyYear: thirdYear }
    const info = curriculumInfo({ programmeTermYear, curriculum: curriculumWithSupplementaryInformation })
    expect(info.supplementaryInformation).toBeString()
    expect(info.hasInfo).toBeTrue()
  })
  test('without supplementary information', () => {
    const programmeTermYear = { studyYear: thirdYear }
    const info = curriculumInfo({ programmeTermYear, curriculum })
    expect(info.supplementaryInformation).toBeFalsy()
    expect(info.hasInfo).toBeFalse()
  })
  test('with conditionally elective courses information', () => {
    const programmeTermYear = { studyYear: thirdYear }
    const info = curriculumInfo({
      programmeTermYear,
      curriculum: curriculumWithConditionallyElectiveCoursesInformation,
    })
    expect(info.conditionallyELectiveCoursesInformation).toBeString()
    expect(info.hasInfo).toBeTrue()
  })
  test('without conditionally elective courses information', () => {
    const programmeTermYear = { studyYear: firstYear }
    const info = curriculumInfo({ programmeTermYear, curriculum })
    expect(info.conditionallyELectiveCoursesInformation).toBeFalsy()
    expect(info.hasInfo).toBeTrue()
  })
  test('set first curriculum info with programme specialization code', () => {
    const infoWithCode = { code: 'A' }
    const infoWithoutCode = { code: null }
    const infoWithFirstSpec = { code: 'A', isFirstSpec: true }
    const infosWithoutCode = [infoWithoutCode, infoWithoutCode, infoWithoutCode]
    const refInfosWithoutCode = [infoWithoutCode, infoWithoutCode, infoWithoutCode]
    const infosWithCode = [infoWithoutCode, infoWithCode, infoWithCode]
    const infosWithFirstSpec = [infoWithoutCode, infoWithFirstSpec, infoWithCode]
    setFirstSpec(infosWithoutCode)
    expect(infosWithoutCode).toEqual(refInfosWithoutCode)
    setFirstSpec(infosWithCode)
    expect(infosWithCode).toEqual(infosWithFirstSpec)
  })
})
