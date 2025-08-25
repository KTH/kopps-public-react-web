const curriculumMock = {
  programmeSpecialization: {
    programmeSpecializationCode: 'A',
    title: 'Special Title',
  },
  studyYears: [
    {
      yearNumber: 1,
      courses: [
        {
          kod: 'AA1000',
          benamning: 'Test Course',
          omfattning: {
            number: 7.5,
            formattedWithUnit: '7.5 hp',
          },
          utbildningstyp: {
            level: {
              name: 'BASIC',
            },
          },
          Valvillkor: 'O',
          tillfalleskod: 'A1',
          startperiod: {
            code: 'HT2024',
          },
          Tillfallesperioder: [
            {
              Lasperiodsfordelning: [
                {
                  Lasperiodskod: 'P1',
                  Omfattningsvarde: 3,
                },
                {
                  Lasperiodskod: 'P2',
                  Omfattningsvarde: 4.5,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

const programmeTermYearMock = {
  studyYear: 1,
}

const curriculumInfoDataMock = {
  code: 'A',
  specializationName: 'Special Title',
  isCommon: false,
  participations: {
    O: [
      {
        course: {
          courseCode: 'AA1000',
          title: 'Test Course',
          credits: 7.5,
          formattedCredits: '7.5 hp',
          educationalLevel: 'BASIC',
          electiveCondition: 'O',
          status: undefined,
        },
        applicationCode: 'A1',
        term: undefined,
        creditsPerPeriod: [0, 3, 4.5, 0, 0, 0],
      },
    ],
  },
  supplementaryInformation: undefined,
  conditionallyElectiveCoursesInformation: undefined,
  htmlCourses: undefined,
  isFirstSpec: false,
  hasInfo: true,
  freeTexts: undefined,
}

module.exports = {
  curriculumMock,
  programmeTermYearMock,
  curriculumInfoDataMock,
}
