const { curriculumInfo, filterCourseRoundsForNthYear, setFirstSpec } = require('./curriculum')

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
    expect(info.code).toBeFalsy()
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

describe('Get relevant course rounds for exact study year of a program', () => {
  test('study year 2, program starts spring 2022', () => {
    const programFirstTerm = '20221'
    const expectedRound = [
      {
        term: '20231',
        creditsPerPeriod: [0, 0, 0, 4.5, 0, 0],
        creditUnitLabel: 'Högskolepoäng',
        creditUnitAbbr: 'hp',
      },
    ]
    const courseRoundTerms = [
      {
        term: '20222',
        creditsPerPeriod: [0, 7, 0.5, 0, 0, 0],
        creditUnitLabel: 'Högskolepoäng',
        creditUnitAbbr: 'hp',
      },
      ...expectedRound,
    ]
    const studyYear = 2
    const rounds = filterCourseRoundsForNthYear(courseRoundTerms, programFirstTerm, studyYear)
    expect(rounds.length).toBe(1)
    expect(rounds).toMatchObject(expectedRound)
  })

  test('study year 3, program starts spring 2021', () => {
    const programFirstTerm = '20211'
    const expectedRound = [
      {
        term: '20231',
        creditsPerPeriod: [0, 0, 0, 4.5, 0, 0],
        creditUnitLabel: 'Högskolepoäng',
        creditUnitAbbr: 'hp',
      },
      {
        term: '20232',
        creditsPerPeriod: [0, 7, 0.5, 0, 0, 0],
        creditUnitLabel: 'Högskolepoäng',
        creditUnitAbbr: 'hp',
      },
    ]
    const courseRoundTerms = [...expectedRound]

    const studyYear = 3
    const rounds = filterCourseRoundsForNthYear(courseRoundTerms, programFirstTerm, studyYear)
    expect(rounds.length).toBe(2)
    expect(rounds).toMatchObject(expectedRound)
  })

  test('study year 1, program starts autumn 2021', () => {
    const programFirstTerm = '20212'
    const expectedRound = [
      {
        term: '20212',
        creditsPerPeriod: [0, 7, 0.5, 0, 0, 0],
        creditUnitLabel: 'Högskolepoäng',
        creditUnitAbbr: 'hp',
      },
    ]
    const courseRoundTerms = [
      {
        term: '20211',
        creditsPerPeriod: [0, 0, 0, 4.5, 0, 0],
        creditUnitLabel: 'Högskolepoäng',
        creditUnitAbbr: 'hp',
      },
      ...expectedRound,
    ]
    const studyYear = 1
    const rounds = filterCourseRoundsForNthYear(courseRoundTerms, programFirstTerm, studyYear)
    expect(rounds.length).toBe(1)
    expect(rounds).toMatchObject(expectedRound)
  })

  test('study year 4, program starts autumn 2021', () => {
    const programFirstTerm = '20212'
    const expectedRound = [
      {
        term: '20242',
        creditsPerPeriod: [0, 7, 0.5, 0, 0, 0],
        creditUnitLabel: 'Högskolepoäng',
        creditUnitAbbr: 'hp',
      },
      {
        term: '20251',
        creditsPerPeriod: [0, 0, 0, 4.5, 0, 0],
        creditUnitLabel: 'Högskolepoäng',
        creditUnitAbbr: 'hp',
      },
    ]
    const courseRoundTerms = [...expectedRound]
    const studyYear = 4
    const rounds = filterCourseRoundsForNthYear(courseRoundTerms, programFirstTerm, studyYear)
    expect(rounds.length).toBe(2)
    expect(rounds).toMatchObject(expectedRound)
  })

  test('study year 4, program starts autumn 2021, has no actual course rounds', () => {
    const programFirstTerm = '20212'
    const courseRoundTerms = [
      {
        term: '20242',
        creditsPerPeriod: [0, 7, 0.5, 0, 0, 0],
        creditUnitLabel: 'Högskolepoäng',
        creditUnitAbbr: 'hp',
      },
      {
        term: '20251',
        creditsPerPeriod: [0, 0, 0, 4.5, 0, 0],
        creditUnitLabel: 'Högskolepoäng',
        creditUnitAbbr: 'hp',
      },
    ]
    const studyYear = 3
    const rounds = filterCourseRoundsForNthYear(courseRoundTerms, programFirstTerm, studyYear)
    expect(rounds.length).toBe(0)
    expect(rounds).toMatchObject([])
  })
})
