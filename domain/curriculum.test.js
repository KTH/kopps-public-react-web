const { curriculumInfo } = require('./curriculum')
const { curriculumMock, programmeTermYearMock, curriculumInfoDataMock } = require('./mocks/curriculumMock')

const firstYear = 1
const secondYear = 2
const thirdYear = 3

const mockCourse = (overrides = {}) => {
  const { kod, benamning, omfattning, utbildningstyp, Valvillkor, tillfalleskod, startperiod, Tillfallesperioder } = {
    kod: 'AA1000',
    benamning: 'Test Course',
    omfattning: { number: 7.5, formattedWithUnit: '7.5 hp' },
    utbildningstyp: { level: { name: 'BASIC' } },
    Valvillkor: 'O',
    tillfalleskod: 'A1',
    startperiod: { code: 'HT2024' },
    Tillfallesperioder: [
      {
        Lasperiodsfordelning: [
          { Lasperiodskod: 'P1', Omfattningsvarde: 3 },
          { Lasperiodskod: 'P2', Omfattningsvarde: 4.5 },
        ],
      },
    ],
    ...overrides,
  }

  return {
    kod,
    benamning,
    omfattning,
    utbildningstyp,
    Valvillkor,
    tillfalleskod,
    startperiod,
    Tillfallesperioder,
  }
}

const curriculumWithStructure = {
  programmeSpecialization: {
    programmeSpecializationCode: 'A',
    title: 'Special Title',
  },
  studyYears: [
    {
      yearNumber: firstYear,
      courses: [mockCourse()],
    },
  ],
}

const curriculumWithoutSpec = {
  studyYears: [
    {
      yearNumber: firstYear,
      courses: [mockCourse()],
    },
  ],
}

describe('curriculumInfo', () => {
  test('returns correct info with programme specialization', () => {
    const result = curriculumInfo({
      programmeTermYear: { studyYear: firstYear },
      curriculum: curriculumWithStructure,
    })

    expect(result.code).toBe('A')
    expect(result.specializationName).toBe('Special Title')
    expect(result.isCommon).toBe(false)
    expect(result.hasInfo).toBe(true)
    expect(Object.keys(result.participations)).toContain('O')
    expect(result.participations['O'][0].course.courseCode).toBe('AA1000')
    expect(result.participations['O'][0].creditsPerPeriod).toEqual([0, 3, 4.5, 0, 0, 0])
  })

  test('returns correct info without programme specialization', () => {
    const result = curriculumInfo({
      programmeTermYear: { studyYear: firstYear },
      curriculum: curriculumWithoutSpec,
    })

    expect(result.code).toBe('')
    expect(result.specializationName).toBeNull()
    expect(result.isCommon).toBe(true)
    expect(result.hasInfo).toBe(true)
  })

  test('returns no info when study year is missing', () => {
    const result = curriculumInfo({
      programmeTermYear: { studyYear: thirdYear },
      curriculum: curriculumWithoutSpec,
    })

    expect(result.hasInfo).toBe(false)
    expect(result.participations).toEqual({})
  })

  test('handles multiple courses and sorts by term', () => {
    const curriculum = {
      studyYears: [
        {
          yearNumber: firstYear,
          courses: [
            mockCourse({
              kod: 'BB1000',
              benamning: 'Second',
              tillfalleskod: 'B1',
              startperiod: { code: 'HT2025', inDigits: '20252' }, // Term: 20252
            }),
            mockCourse({
              kod: 'AA1000',
              benamning: 'First',
              tillfalleskod: 'A1',
              startperiod: { code: 'VT2024', inDigits: '20241' }, // Term: 20241
            }),
          ],
        },
      ],
    }

    const result = curriculumInfo({
      programmeTermYear: { studyYear: firstYear },
      curriculum,
    })

    const participations = result.participations['O']
    expect(participations.length).toBe(2)
    expect(participations[0].term).toBe('20241')
    expect(participations[1].term).toBe('20252')
  })
})

describe('curriculumInfo - edge cases', () => {
  test('handles course with empty Tillfallesperioder', () => {
    const curriculum = {
      studyYears: [
        {
          yearNumber: firstYear,
          courses: [
            mockCourse({
              kod: 'NO_PERIODS',
              Tillfallesperioder: [],
            }),
          ],
        },
      ],
    }

    const result = curriculumInfo({ programmeTermYear: { studyYear: firstYear }, curriculum })

    const participation = result.participations['O'][0]
    expect(participation.creditsPerPeriod).toEqual([0, 0, 0, 0, 0, 0])
  })

  test('handles course with unknown Lasperiodskod', () => {
    const curriculum = {
      studyYears: [
        {
          yearNumber: firstYear,
          courses: [
            mockCourse({
              kod: 'UNKNOWN_PERIOD',
              Tillfallesperioder: [
                {
                  Lasperiodsfordelning: [
                    { Lasperiodskod: 'P9', Omfattningsvarde: 5 }, // Invalid
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }

    const result = curriculumInfo({ programmeTermYear: { studyYear: firstYear }, curriculum })

    const participation = result.participations['O'][0]
    // P9 is unknown, so should fallback to index 0
    expect(participation.creditsPerPeriod[0]).toBe(5)
  })

  test('handles course with missing educational level', () => {
    const curriculum = {
      studyYears: [
        {
          yearNumber: firstYear,
          courses: [
            mockCourse({
              kod: 'NO_LEVEL',
              utbildningstyp: undefined,
            }),
          ],
        },
      ],
    }

    const result = curriculumInfo({ programmeTermYear: { studyYear: firstYear }, curriculum })

    const participation = result.participations['O'][0]
    expect(participation.course.educationalLevel).toBeUndefined()
  })

  test('handles curriculum with multiple Valvillkor groups', () => {
    const curriculum = {
      studyYears: [
        {
          yearNumber: firstYear,
          courses: [
            mockCourse({ kod: 'X1', Valvillkor: 'O' }),
            mockCourse({ kod: 'Y1', Valvillkor: 'V' }),
            mockCourse({ kod: 'Z1', Valvillkor: 'F' }),
          ],
        },
      ],
    }

    const result = curriculumInfo({ programmeTermYear: { studyYear: firstYear }, curriculum })

    expect(Object.keys(result.participations)).toEqual(expect.arrayContaining(['O', 'V', 'F']))
    expect(result.participations['O'].length).toBe(1)
    expect(result.participations['V'].length).toBe(1)
    expect(result.participations['F'].length).toBe(1)
  })
  test('test that the final output is correct', () => {
    const result = curriculumInfo({ programmeTermYear: programmeTermYearMock, curriculum: curriculumMock })
    expect(result).toStrictEqual(curriculumInfoDataMock)
  })
})
