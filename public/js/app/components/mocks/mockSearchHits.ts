// F.e., ?term_period=20212%3A1&department_prefix=AFB&flag=in_english_only
const TEST_SEARCH_HITS_MIXED_EN = {
  // UNSORTED
  searchHits: [
    {
      // BASIC
      course: {
        courseCode: 'AF2402',
        title: 'Acoustics and Fire',
        credits: 7.5,
        creditUnitLabel: 'Credits',
        creditUnitAbbr: 'hp',
        educationalLevel: 'BASIC',
      },
      searchHitInterval: {
        startTerm: '20212',
        endTerm: '20221',
        startPeriod: 1,
        endPeriod: 3,
      },
    },
    {
      // NO education level
      course: {
        courseCode: 'AH2905',
        title: 'Advanced Pavement Engineering Analysis and Design',
        credits: 7.5,
        creditUnitLabel: 'Credits',
        creditUnitAbbr: 'hp',
      },
      searchHitInterval: {
        startTerm: '20212',
        endTerm: '20212',
        startPeriod: 1,
        endPeriod: 1,
      },
    },
    {
      // RESEARCH, NO searchHitInterval
      course: {
        courseCode: 'FAF3901',
        title: 'Advanced Rheology of Bituminous Materials',
        credits: 7.5,
        creditUnitLabel: 'Credits',
        creditUnitAbbr: 'hp',
        educationalLevel: 'RESEARCH',
      },
    },
    {
      // ADVANCED
      course: {
        courseCode: 'AF233X',
        title: 'Degree Project in Building Materials, Second Cycle',
        credits: 30,
        creditUnitLabel: 'Credits',
        creditUnitAbbr: 'hp',
        educationalLevel: 'ADVANCED',
      },
      searchHitInterval: {
        startTerm: '20212',
        endTerm: '20212',
        startPeriod: 1,
        endPeriod: 2,
      },
    },
    {
      // PREPARATORY
      course: {
        courseCode: 'FAH3904',
        title: 'Introduction to Asphalt Chemistry',
        credits: 4,
        creditUnitLabel: 'Credits',
        creditUnitAbbr: 'hp',
        educationalLevel: 'PREPARATORY',
      },
      searchHitInterval: {
        startTerm: '20212',
        endTerm: '20221',
        startPeriod: 0,
        endPeriod: 5,
      },
    },
  ],
}
const TEST_SEARCH_HITS_MIXED_EN_BETA = {
  searchHits: [
    {
      kod: 'AF2402',
      benamning: 'Acoustics and Fire',
      omfattning: {
        formattedWithUnit: '7.5 hp',
      },
      organisation: {
        id: '',
        code: 'SCI',
        name: 'SCI/Engineering',
        organisationTypeName: 'Department',
      },
      studieort: {
        id: '',
        code: 'MAIN_CAMPUS',
        name: 'Main Campus',
      },
      utbildningstyp: {
        id: '',
        code: '',
        name: 'Course, Basic level',
        creditsUnit: {
          code: 'HP',
          sv: 'Högskolepoäng',
          en: 'Credits',
        },
        level: {
          code: '1',
          name: 'BASIC',
        },
      },
      undervisningssprak: {
        id: '',
        code: 'EN',
        name: 'English',
      },
      studietakt: {
        id: '',
        code: '33',
        name: 'One-third-time',
        takt: 33,
      },
      startperiod: {
        code: '20212',
        inDigits: '20212',
      },
      forstaUndervisningsdatum: {
        date: '2021-08-30',
        period: 1,
        year: 2021,
        week: 35,
      },
      sistaUndervisningsdatum: {
        date: '2022-01-17',
        period: 3,
        year: 2022,
        week: 3,
      },
      tillfallesperioderNummer: 1,
      schoolCode: 'SCI',
    },
    {
      kod: 'AH2905',
      benamning: 'Advanced Pavement Engineering Analysis and Design',
      omfattning: {
        formattedWithUnit: '7.5 hp',
      },
      organisation: {
        id: '',
        code: 'SCI',
        name: 'SCI/Engineering',
        organisationTypeName: 'Department',
      },
      studieort: {
        id: '',
        code: 'MAIN_CAMPUS',
        name: 'Main Campus',
      },
      utbildningstyp: {
        id: '',
        code: '',
        name: 'Course, First-cycle',
        creditsUnit: {
          code: 'HP',
          sv: 'Högskolepoäng',
          en: 'Credits',
        },
        level: {
          code: '1',
          name: 'First cycle',
        },
      },
      undervisningssprak: {
        id: '',
        code: 'EN',
        name: 'English',
      },
      studietakt: {
        id: '',
        code: '33',
        name: 'One-third-time',
        takt: 33,
      },
      startperiod: {
        code: '20212',
        inDigits: '20212',
      },
      forstaUndervisningsdatum: {
        date: '2021-08-30',
        period: 1,
        year: 2021,
        week: 35,
      },
      sistaUndervisningsdatum: {
        date: '2021-12-17',
        period: 1,
        year: 2021,
        week: 50,
      },
      tillfallesperioderNummer: 1,
      schoolCode: 'SCI',
    },
    {
      kod: 'FAF3901',
      benamning: 'Advanced Rheology of Bituminous Materials',
      omfattning: {
        formattedWithUnit: '7.5 hp',
      },
      organisation: {
        id: '',
        code: 'SCI',
        name: 'SCI/Materials Science',
        organisationTypeName: 'Department',
      },
      studieort: {
        id: '',
        code: 'MAIN_CAMPUS',
        name: 'Main Campus',
      },
      utbildningstyp: {
        id: '',
        code: '',
        name: 'Course, Research-level',
        creditsUnit: {
          code: 'HP',
          sv: 'Högskolepoäng',
          en: 'Credits',
        },
        level: {
          code: '2',
          name: 'RESEARCH',
        },
      },
      undervisningssprak: {
        id: '',
        code: 'EN',
        name: 'English',
      },
      studietakt: {
        id: '',
        code: '33',
        name: 'One-third-time',
        takt: 33,
      },
      startperiod: {
        code: '20212',
        inDigits: '20212',
      },
      forstaUndervisningsdatum: {
        date: '2021-09-01',
        week: 36,
      },
      sistaUndervisningsdatum: {
        date: '2021-12-15',
        week: 50,
      },
      tillfallesperioderNummer: 1,
      schoolCode: 'SCI',
    },
    {
      kod: 'AF233X',
      benamning: 'Degree Project in Building Materials, Second Cycle',
      omfattning: {
        formattedWithUnit: '30 hp',
      },
      organisation: {
        id: '',
        code: 'SCI',
        name: 'SCI/Materials Science',
        organisationTypeName: 'Department',
      },
      studieort: {
        id: '',
        code: 'MAIN_CAMPUS',
        name: 'Main Campus',
      },
      utbildningstyp: {
        id: '',
        code: '',
        name: 'Course, Advanced-level',
        creditsUnit: {
          code: 'HP',
          sv: 'Högskolepoäng',
          en: 'Credits',
        },
        level: {
          code: '2',
          name: 'ADVANCED',
        },
      },
      undervisningssprak: {
        id: '',
        code: 'EN',
        name: 'English',
      },
      studietakt: {
        id: '',
        code: '100',
        name: 'Full-time',
        takt: 100,
      },
      startperiod: {
        code: '20212',
        inDigits: '20212',
      },
      forstaUndervisningsdatum: {
        date: '2021-08-30',
        period: 1,
        year: 2021,
        week: 35,
      },
      sistaUndervisningsdatum: {
        date: '2021-12-15',
        period: 2,
        year: 2021,
        week: 50,
      },
      tillfallesperioderNummer: 2,
      schoolCode: 'SCI',
    },
    {
      kod: 'FAH3904',
      benamning: 'Introduction to Asphalt Chemistry',
      omfattning: {
        formattedWithUnit: '4 hp',
      },
      organisation: {
        id: '',
        code: 'SCI',
        name: 'SCI/Materials Science',
        organisationTypeName: 'Department',
      },
      studieort: {
        id: '',
        code: 'MAIN_CAMPUS',
        name: 'Main Campus',
      },
      utbildningstyp: {
        id: '',
        code: '',
        name: 'Course, Preparatory-level',
        creditsUnit: {
          code: 'HP',
          sv: 'Högskolepoäng',
          en: 'Credits',
        },
        level: {
          code: '0',
          name: 'PREPARATORY',
        },
      },
      undervisningssprak: {
        id: '',
        code: 'EN',
        name: 'English',
      },
      studietakt: {
        id: '',
        code: '33',
        name: 'One-third-time',
        takt: 33,
      },
      startperiod: {
        code: '20212',
        inDigits: '20212',
      },
      forstaUndervisningsdatum: {
        date: '2021-08-30',
        period: 0,
        year: 2021,
        week: 35,
      },
      sistaUndervisningsdatum: {
        date: '2022-05-15',
        period: 5,
        year: 2022,
        week: 20,
      },
      tillfallesperioderNummer: 5,
      schoolCode: 'SCI',
    },
  ],
}

const TEST_SEARCH_HITS_MIXED_SV = {
  // UNSORTED
  searchHits: [
    {
      // BASIC
      course: {
        courseCode: 'AF2402',
        title: 'Akustik och brand',
        credits: 7.5,
        creditUnitLabel: 'Högskolepoäng',
        creditUnitAbbr: 'hp',
        educationalLevel: 'BASIC',
      },
      searchHitInterval: {
        startTerm: '20212',
        endTerm: '20221',
        startPeriod: 1,
        endPeriod: 3,
      },
    },
    {
      // NO education level
      course: {
        courseCode: 'AH2905',
        title: 'Avancerad analys och design av vägbeläggningar',
        credits: 7.5,
        creditUnitLabel: 'Högskolepoäng',
        creditUnitAbbr: 'hp',
      },
      searchHitInterval: {
        startTerm: '20212',
        endTerm: '20212',
        startPeriod: 1,
        endPeriod: 1,
      },
    },
    {
      // RESEARCH, NO searchHitInterval
      course: {
        courseCode: 'FAF3901',
        title: 'Avancerad reologi för bituminösa material',
        credits: 7.5,
        creditUnitLabel: 'Högskolepoäng',
        creditUnitAbbr: 'hp',
        educationalLevel: 'RESEARCH',
      },
    },
    {
      // ADVANCED
      course: {
        courseCode: 'AF233X',
        title: 'Examensarbete inom byggnadsmateriallära, avancerad nivå',
        credits: 30,
        creditUnitLabel: 'Högskolepoäng',
        creditUnitAbbr: 'hp',
        educationalLevel: 'ADVANCED',
      },
      searchHitInterval: {
        startTerm: '20212',
        endTerm: '20212',
        startPeriod: 1,
        endPeriod: 2,
      },
    },
    {
      // PREPARATORY
      course: {
        courseCode: 'FAH3904',
        title: 'Introduktion till asfaltskemin',
        credits: 4,
        creditUnitLabel: 'Högskolepoäng',
        creditUnitAbbr: 'hp',
        educationalLevel: 'PREPARATORY',
      },
      searchHitInterval: {
        startTerm: '20212',
        endTerm: '20221',
        startPeriod: 0,
        endPeriod: 5,
      },
    },
  ],
}

const TEST_SEARCH_HITS_MIXED_SV_BETA = {
  searchHits: [
    {
      kod: 'AF2402',
      benamning: 'Akustik och brand',
      omfattning: {
        formattedWithUnit: '7.5 hp',
      },
      organisation: {
        id: '',
        code: 'SCI',
        name: 'SCI/Engineering',
        organisationTypeName: 'Department',
      },
      studieort: {
        id: '',
        code: 'MAIN_CAMPUS',
        name: 'Main Campus',
      },
      utbildningstyp: {
        id: '',
        code: '',
        name: 'Course, Basic level',
        creditsUnit: {
          code: 'HP',
          sv: 'Högskolepoäng',
          en: 'Credits',
        },
        level: {
          code: '1',
          name: 'BASIC',
        },
      },
      undervisningssprak: {
        id: '',
        code: 'SV',
        name: 'Swedish',
      },
      studietakt: {
        id: '',
        code: '33',
        name: 'One-third-time',
        takt: 33,
      },
      startperiod: {
        code: '20212',
        inDigits: '20212',
      },
      forstaUndervisningsdatum: {
        date: '2021-08-30',
        period: 1,
        year: 2021,
        week: 35,
      },
      sistaUndervisningsdatum: {
        date: '2022-01-17',
        period: 3,
        year: 2022,
        week: 3,
      },
      tillfallesperioderNummer: 1,
      schoolCode: 'SCI',
    },
    {
      kod: 'AH2905',
      benamning: 'Avancerad analys och design av vägbeläggningar',
      omfattning: {
        formattedWithUnit: '7.5 hp',
      },
      organisation: {
        id: '',
        code: 'SCI',
        name: 'SCI/Engineering',
        organisationTypeName: 'Department',
      },
      studieort: {
        id: '',
        code: 'MAIN_CAMPUS',
        name: 'Main Campus',
      },
      utbildningstyp: {
        id: '',
        code: '',
        name: 'Course, First-cycle',
        creditsUnit: {
          code: 'HP',
          sv: 'Högskolepoäng',
          en: 'Credits',
        },
        level: {
          code: '1',
          name: 'First cycle',
        },
      },
      undervisningssprak: {
        id: '',
        code: 'SV',
        name: 'Swedish',
      },
      studietakt: {
        id: '',
        code: '33',
        name: 'One-third-time',
        takt: 33,
      },
      startperiod: {
        code: '20212',
        inDigits: '20212',
      },
      forstaUndervisningsdatum: {
        date: '2021-08-30',
        period: 1,
        year: 2021,
        week: 35,
      },
      sistaUndervisningsdatum: {
        date: '2021-12-17',
        period: 1,
        year: 2021,
        week: 50,
      },
      tillfallesperioderNummer: 1,
      schoolCode: 'SCI',
    },
    {
      kod: 'FAF3901',
      benamning: 'Avancerad reologi för bituminösa material',
      omfattning: {
        formattedWithUnit: '7.5 hp',
      },
      organisation: {
        id: '',
        code: 'SCI',
        name: 'SCI/Materials Science',
        organisationTypeName: 'Department',
      },
      studieort: {
        id: '',
        code: 'MAIN_CAMPUS',
        name: 'Main Campus',
      },
      utbildningstyp: {
        id: '',
        code: '',
        name: 'Course, Research-level',
        creditsUnit: {
          code: 'HP',
          sv: 'Högskolepoäng',
          en: 'Credits',
        },
        level: {
          code: '2',
          name: 'RESEARCH',
        },
      },
      undervisningssprak: {
        id: '',
        code: 'SV',
        name: 'Swedish',
      },
      studietakt: {
        id: '',
        code: '33',
        name: 'One-third-time',
        takt: 33,
      },
      startperiod: {
        code: '20212',
        inDigits: '20212',
      },
      tillfallesperioderNummer: 1,
      schoolCode: 'SCI',
    },
    {
      kod: 'AF233X',
      benamning: 'Examensarbete inom byggnadsmateriallära, avancerad nivå',
      omfattning: {
        formattedWithUnit: '30 hp',
      },
      organisation: {
        id: '',
        code: 'SCI',
        name: 'SCI/Materials Science',
        organisationTypeName: 'Department',
      },
      studieort: {
        id: '',
        code: 'MAIN_CAMPUS',
        name: 'Main Campus',
      },
      utbildningstyp: {
        id: '',
        code: '',
        name: 'Course, Advanced-level',
        creditsUnit: {
          code: 'HP',
          sv: 'Högskolepoäng',
          en: 'Credits',
        },
        level: {
          code: '2',
          name: 'ADVANCED',
        },
      },
      undervisningssprak: {
        id: '',
        code: 'SV',
        name: 'Swedish',
      },
      studietakt: {
        id: '',
        code: '100',
        name: 'Full-time',
        takt: 100,
      },
      startperiod: {
        code: '20212',
        inDigits: '20212',
      },
      forstaUndervisningsdatum: {
        date: '2021-08-30',
        period: 1,
        year: 2021,
        week: 35,
      },
      sistaUndervisningsdatum: {
        date: '2021-12-15',
        period: 2,
        year: 2021,
        week: 50,
      },
      tillfallesperioderNummer: 2,
      schoolCode: 'SCI',
    },
    {
      kod: 'FAH3904',
      benamning: 'Introduktion till asfaltskemin',
      omfattning: {
        formattedWithUnit: '4 hp',
      },
      organisation: {
        id: '',
        code: 'SCI',
        name: 'SCI/Materials Science',
        organisationTypeName: 'Department',
      },
      studieort: {
        id: '',
        code: 'MAIN_CAMPUS',
        name: 'Main Campus',
      },
      utbildningstyp: {
        id: '',
        code: '',
        name: 'Course, Preparatory-level',
        creditsUnit: {
          code: 'HP',
          sv: 'Högskolepoäng',
          en: 'Credits',
        },
        level: {
          code: '0',
          name: 'PREPARATORY',
        },
      },
      undervisningssprak: {
        id: '',
        code: 'SV',
        name: 'Swedish',
      },
      studietakt: {
        id: '',
        code: '33',
        name: 'One-third-time',
        takt: 33,
      },
      startperiod: {
        code: '20212',
        inDigits: '20212',
      },
      forstaUndervisningsdatum: {
        date: '2021-08-30',
        period: 0,
        year: 2021,
        week: 35,
      },
      sistaUndervisningsdatum: {
        date: '2022-05-15',
        period: 5,
        year: 2022,
        week: 20,
      },
      tillfallesperioderNummer: 5,
      schoolCode: 'SCI',
    },
  ],
}

const EXPECTED_TEST_SEARCH_HITS_MIXED_PERIODS_TEXTS_EN = [
  'P1 Autumn 21 - P2 Autumn 21',
  'P1 Autumn 21 - P3 Spring 22',
  'P1 Autumn 21',
  '',
  'P0 Autumn 21 - P5 Spring 22',
] // todo: this needs to be deleted after removing the old search

const EXPECTED_TEST_SEARCH_HITS_MIXED_PERIODS_TEXTS_EN_BETA = [
  'P1 Autumn 21 - P2 Autumn 21',
  'P1 Autumn 21 - P3 Spring 22',
  'P1 Autumn 21',
  'Missing',
  'P0 Autumn 21 - P5 Spring 22',
]
const EXPECTED_TEST_SEARCH_HITS_MIXED_PERIODS_TEXTS_SV = [
  'P1 HT21 - P2 HT21',
  'P1 HT21 - P3 VT22',
  'P1 HT21',
  '',
  'P0 HT21 - P5 VT22',
]

const EXPECTED_TEST_SEARCH_HITS_MIXED_PERIODS_TEXTS_SV_BETA = [
  'P1 HT21 - P2 HT21',
  'P1 HT21 - P3 VT22',
  'P1 HT21',
  'Saknas',
  'P0 HT21 - P5 VT22',
] // todo: this needs to be deleted after removing the old search

const EXPECTED_TEST_SEARCH_HITS_MIXED_EN = {
  // SORTED
  searchHits: [
    {
      // ADVANCED
      course: {
        courseCode: 'AF233X',
        title: 'Degree Project in Building Materials, Second Cycle',
        credits: 30,
        creditUnitLabel: 'Credits',
        creditUnitAbbr: 'hp',
        educationalLevel: 'ADVANCED',
      },
      searchHitInterval: {
        startTerm: '20212',
        endTerm: '20212',
        startPeriod: 1,
        endPeriod: 2,
      },
    },
    {
      // BASIC
      course: {
        courseCode: 'AF2402',
        title: 'Acoustics and Fire',
        credits: 7.5,
        creditUnitLabel: 'Credits',
        creditUnitAbbr: 'hp',
        educationalLevel: 'BASIC',
      },
      searchHitInterval: {
        startTerm: '20212',
        endTerm: '20221',
        startPeriod: 1,
        endPeriod: 3,
      },
    },
    {
      // NO education level
      course: {
        courseCode: 'AH2905',
        title: 'Advanced Pavement Engineering Analysis and Design',
        credits: 7.5,
        creditUnitLabel: 'Credits',
        creditUnitAbbr: 'hp',
      },
      searchHitInterval: {
        startTerm: '20212',
        endTerm: '20212',
        startPeriod: 1,
        endPeriod: 1,
      },
    },
    {
      // RESEARCH, NO searchHitInterval
      course: {
        courseCode: 'FAF3901',
        title: 'Advanced Rheology of Bituminous Materials',
        credits: 7.5,
        creditUnitLabel: 'Credits',
        creditUnitAbbr: 'hp',
        educationalLevel: 'RESEARCH',
      },
    },

    {
      // PREPARATORY
      course: {
        courseCode: 'FAH3904',
        title: 'Introduction to Asphalt Chemistry',
        credits: 4,
        creditUnitLabel: 'Credits',
        creditUnitAbbr: 'hp',
        educationalLevel: 'PREPARATORY',
      },
      searchHitInterval: {
        startTerm: '20212',
        endTerm: '20221',
        startPeriod: 0,
        endPeriod: 5,
      },
    },
  ],
}

const EXPECTED_TEST_SEARCH_HITS_MIXED_EN_BETA = {
  searchHits: [
    {
      kod: 'AF233X',
      benamning: 'Degree Project in Building Materials, Second Cycle',
      omfattning: {
        formattedWithUnit: '30 hp',
      },
      organisation: {
        id: '',
        code: 'SCI',
        name: 'SCI/Materials Science',
        organisationTypeName: 'Department',
      },
      studieort: {
        id: '',
        code: 'MAIN_CAMPUS',
        name: 'Main Campus',
      },
      utbildningstyp: {
        id: '',
        code: '',
        name: 'Course, Advanced-level',
        creditsUnit: {
          code: 'HP',
          sv: 'Högskolepoäng',
          en: 'Credits',
        },
        level: {
          code: '2',
          name: 'ADVANCED',
        },
      },
      undervisningssprak: {
        id: '',
        code: 'EN',
        name: 'English',
      },
      studietakt: {
        id: '',
        code: '100',
        name: 'Full-time',
        takt: 100,
      },
      startperiod: {
        code: '20212',
        inDigits: '20212',
      },
      forstaUndervisningsdatum: {
        date: '2021-08-30',
        period: 1,
        year: 2021,
        week: 35,
      },
      sistaUndervisningsdatum: {
        date: '2021-12-15',
        period: 2,
        year: 2021,
        week: 50,
      },
      tillfallesperioderNummer: 2,
      schoolCode: 'SCI',
    },
    {
      kod: 'AF2402',
      benamning: 'Acoustics and Fire',
      omfattning: {
        formattedWithUnit: '7.5 hp',
      },
      organisation: {
        id: '',
        code: 'SCI',
        name: 'SCI/Engineering',
        organisationTypeName: 'Department',
      },
      studieort: {
        id: '',
        code: 'MAIN_CAMPUS',
        name: 'Main Campus',
      },
      utbildningstyp: {
        id: '',
        code: '',
        name: 'Course, Basic level',
        creditsUnit: {
          code: 'HP',
          sv: 'Högskolepoäng',
          en: 'Credits',
        },
        level: {
          code: '1',
          name: 'BASIC',
        },
      },
      undervisningssprak: {
        id: '',
        code: 'EN',
        name: 'English',
      },
      studietakt: {
        id: '',
        code: '33',
        name: 'One-third-time',
        takt: 33,
      },
      startperiod: {
        code: '20212',
        inDigits: '20212',
      },
      forstaUndervisningsdatum: {
        date: '2021-08-30',
        period: 1,
        year: 2021,
        week: 35,
      },
      sistaUndervisningsdatum: {
        date: '2022-01-17',
        period: 3,
        year: 2022,
        week: 3,
      },
      tillfallesperioderNummer: 1,
      schoolCode: 'SCI',
    },
    {
      kod: 'AH2905',
      benamning: 'Advanced Pavement Engineering Analysis and Design',
      omfattning: {
        formattedWithUnit: '7.5 hp',
      },
      organisation: {
        id: '',
        code: 'SCI',
        name: 'SCI/Engineering',
        organisationTypeName: 'Department',
      },
      studieort: {
        id: '',
        code: 'MAIN_CAMPUS',
        name: 'Main Campus',
      },
      utbildningstyp: {
        id: '',
        code: '',
        name: 'Course, First-cycle',
        creditsUnit: {
          code: 'HP',
          sv: 'Högskolepoäng',
          en: 'Credits',
        },
        level: {
          code: '1',
          name: 'First cycle',
        },
      },
      undervisningssprak: {
        id: '',
        code: 'EN',
        name: 'English',
      },
      studietakt: {
        id: '',
        code: '33',
        name: 'One-third-time',
        takt: 33,
      },
      startperiod: {
        code: '20212',
        inDigits: '20212',
      },
      forstaUndervisningsdatum: {
        date: '2021-08-30',
        period: 1,
        year: 2021,
        week: 35,
      },
      sistaUndervisningsdatum: {
        date: '2021-12-17',
        period: 1,
        year: 2021,
        week: 50,
      },
      tillfallesperioderNummer: 1,
      schoolCode: 'SCI',
    },
    {
      kod: 'FAF3901',
      benamning: 'Advanced Rheology of Bituminous Materials',
      omfattning: {
        formattedWithUnit: '7.5 hp',
      },
      organisation: {
        id: '',
        code: 'SCI',
        name: 'SCI/Materials Science',
        organisationTypeName: 'Department',
      },
      studieort: {
        id: '',
        code: 'MAIN_CAMPUS',
        name: 'Main Campus',
      },
      utbildningstyp: {
        id: '',
        code: '',
        name: 'Course, Research-level',
        creditsUnit: {
          code: 'HP',
          sv: 'Högskolepoäng',
          en: 'Credits',
        },
        level: {
          code: '2',
          name: 'RESEARCH',
        },
      },
      undervisningssprak: {
        id: '',
        code: 'EN',
        name: 'English',
      },
      studietakt: {
        id: '',
        code: '33',
        name: 'One-third-time',
        takt: 33,
      },
      startperiod: {
        code: '20212',
        inDigits: '20212',
      },
      tillfallesperioderNummer: 1,
      schoolCode: 'SCI',
    },
    {
      kod: 'FAH3904',
      benamning: 'Introduction to Asphalt Chemistry',
      omfattning: {
        formattedWithUnit: '4 hp',
      },
      organisation: {
        id: '',
        code: 'SCI',
        name: 'SCI/Materials Science',
        organisationTypeName: 'Department',
      },
      studieort: {
        id: '',
        code: 'MAIN_CAMPUS',
        name: 'Main Campus',
      },
      utbildningstyp: {
        id: '',
        code: '',
        name: 'Course, Preparatory-level',
        creditsUnit: {
          code: 'HP',
          sv: 'Högskolepoäng',
          en: 'Credits',
        },
        level: {
          code: '0',
          name: 'PREPARATORY',
        },
      },
      undervisningssprak: {
        id: '',
        code: 'EN',
        name: 'English',
      },
      studietakt: {
        id: '',
        code: '33',
        name: 'One-third-time',
        takt: 33,
      },
      startperiod: {
        code: '20212',
        inDigits: '20212',
      },
      forstaUndervisningsdatum: {
        date: '2021-08-30',
        period: 0,
        year: 2021,
        week: 35,
      },
      sistaUndervisningsdatum: {
        date: '2022-05-15',
        period: 5,
        year: 2022,
        week: 20,
      },
      tillfallesperioderNummer: 5,
      schoolCode: 'SCI',
    },
  ],
}

const EXPECTED_TEST_SEARCH_HITS_MIXED_SV = {
  // SORTED
  searchHits: [
    {
      // ADVANCED
      course: {
        courseCode: 'AF233X',
        title: 'Examensarbete inom byggnadsmateriallära, avancerad nivå',
        credits: 30,
        creditUnitLabel: 'Högskolepoäng',
        creditUnitAbbr: 'hp',
        educationalLevel: 'ADVANCED',
      },
      searchHitInterval: {
        startTerm: '20212',
        endTerm: '20212',
        startPeriod: 1,
        endPeriod: 2,
      },
    },
    {
      // BASIC
      course: {
        courseCode: 'AF2402',
        title: 'Akustik och brand',
        credits: 7.5,
        creditUnitLabel: 'Högskolepoäng',
        creditUnitAbbr: 'hp',
        educationalLevel: 'BASIC',
      },
      searchHitInterval: {
        startTerm: '20212',
        endTerm: '20221',
        startPeriod: 1,
        endPeriod: 3,
      },
    },
    {
      // NO education level
      course: {
        courseCode: 'AH2905',
        title: 'Avancerad analys och design av vägbeläggningar',
        credits: 7.5,
        creditUnitLabel: 'Högskolepoäng',
        creditUnitAbbr: 'hp',
      },
      searchHitInterval: {
        startTerm: '20212',
        endTerm: '20212',
        startPeriod: 1,
        endPeriod: 1,
      },
    },
    {
      // RESEARCH, NO searchHitInterval
      course: {
        courseCode: 'FAF3901',
        title: 'Avancerad reologi för bituminösa material',
        credits: 7.5,
        creditUnitLabel: 'Högskolepoäng',
        creditUnitAbbr: 'hp',
        educationalLevel: 'RESEARCH',
      },
    },

    {
      // PREPARATORY
      course: {
        courseCode: 'FAH3904',
        title: 'Introduktion till asfaltskemin',
        credits: 4,
        creditUnitLabel: 'Högskolepoäng',
        creditUnitAbbr: 'hp',
        educationalLevel: 'PREPARATORY',
      },
      searchHitInterval: {
        startTerm: '20212',
        endTerm: '20221',
        startPeriod: 0,
        endPeriod: 5,
      },
    },
  ],
}

const EXPECTED_TEST_SEARCH_HITS_MIXED_SV_BETA = {
  searchHits: [
    {
      kod: 'AF233X',
      benamning: 'Examensarbete inom byggnadsmateriallära, avancerad nivå',
      omfattning: {
        formattedWithUnit: '30 hp',
      },
      organisation: {
        id: '',
        code: 'SCI',
        name: 'SCI/Materials Science',
        organisationTypeName: 'Department',
      },
      studieort: {
        id: '',
        code: 'MAIN_CAMPUS',
        name: 'Main Campus',
      },
      utbildningstyp: {
        id: '',
        code: '',
        name: 'Course, Advanced-level',
        creditsUnit: {
          code: 'HP',
          sv: 'Högskolepoäng',
          en: 'Credits',
        },
        level: {
          code: '2',
          name: 'ADVANCED',
        },
      },
      undervisningssprak: {
        id: '',
        code: 'SV',
        name: 'Swedish',
      },
      studietakt: {
        id: '',
        code: '100',
        name: 'Full-time',
        takt: 100,
      },
      startperiod: {
        code: '20212',
        inDigits: '20212',
      },
      forstaUndervisningsdatum: {
        date: '2021-08-30',
        period: 1,
        year: 2021,
        week: 35,
      },
      sistaUndervisningsdatum: {
        date: '2021-12-15',
        period: 2,
        year: 2021,
        week: 50,
      },
      tillfallesperioderNummer: 2,
      schoolCode: 'SCI',
    },
    {
      kod: 'AF2402',
      benamning: 'Akustik och brand',
      omfattning: {
        formattedWithUnit: '7.5 hp',
      },
      organisation: {
        id: '',
        code: 'SCI',
        name: 'SCI/Engineering',
        organisationTypeName: 'Department',
      },
      studieort: {
        id: '',
        code: 'MAIN_CAMPUS',
        name: 'Main Campus',
      },
      utbildningstyp: {
        id: '',
        code: '',
        name: 'Course, Basic level',
        creditsUnit: {
          code: 'HP',
          sv: 'Högskolepoäng',
          en: 'Credits',
        },
        level: {
          code: '1',
          name: 'BASIC',
        },
      },
      undervisningssprak: {
        id: '',
        code: 'SV',
        name: 'Swedish',
      },
      studietakt: {
        id: '',
        code: '33',
        name: 'One-third-time',
        takt: 33,
      },
      startperiod: {
        code: '20212',
        inDigits: '20212',
      },
      forstaUndervisningsdatum: {
        date: '2021-08-30',
        period: 1,
        year: 2021,
        week: 35,
      },
      sistaUndervisningsdatum: {
        date: '2022-01-17',
        period: 3,
        year: 2022,
        week: 3,
      },
      tillfallesperioderNummer: 1,
      schoolCode: 'SCI',
    },
    {
      kod: 'AH2905',
      benamning: 'Avancerad analys och design av vägbeläggningar',
      omfattning: {
        formattedWithUnit: '7.5 hp',
      },
      organisation: {
        id: '',
        code: 'SCI',
        name: 'SCI/Engineering',
        organisationTypeName: 'Department',
      },
      studieort: {
        id: '',
        code: 'MAIN_CAMPUS',
        name: 'Main Campus',
      },
      utbildningstyp: {
        id: '',
        code: '',
        name: 'Course, First-cycle',
        creditsUnit: {
          code: 'HP',
          sv: 'Högskolepoäng',
          en: 'Credits',
        },
        level: {
          code: '1',
          name: 'First cycle',
        },
      },
      undervisningssprak: {
        id: '',
        code: 'SV',
        name: 'Swedish',
      },
      studietakt: {
        id: '',
        code: '33',
        name: 'One-third-time',
        takt: 33,
      },
      startperiod: {
        code: '20212',
        inDigits: '20212',
      },
      forstaUndervisningsdatum: {
        date: '2021-08-30',
        period: 1,
        year: 2021,
        week: 35,
      },
      sistaUndervisningsdatum: {
        date: '2021-12-17',
        period: 1,
        year: 2021,
        week: 50,
      },
      tillfallesperioderNummer: 1,
      schoolCode: 'SCI',
    },
    {
      kod: 'FAF3901',
      benamning: 'Avancerad reologi för bituminösa material',
      omfattning: {
        formattedWithUnit: '7.5 hp',
      },
      organisation: {
        id: '',
        code: 'SCI',
        name: 'SCI/Materials Science',
        organisationTypeName: 'Department',
      },
      studieort: {
        id: '',
        code: 'MAIN_CAMPUS',
        name: 'Main Campus',
      },
      utbildningstyp: {
        id: '',
        code: '',
        name: 'Course, Research-level',
        creditsUnit: {
          code: 'HP',
          sv: 'Högskolepoäng',
          en: 'Credits',
        },
        level: {
          code: '2',
          name: 'RESEARCH',
        },
      },
      undervisningssprak: {
        id: '',
        code: 'SV',
        name: 'Swedish',
      },
      studietakt: {
        id: '',
        code: '33',
        name: 'One-third-time',
        takt: 33,
      },
      startperiod: {
        code: '20212',
        inDigits: '20212',
      },
      tillfallesperioderNummer: 1,
      schoolCode: 'SCI',
    },
    {
      kod: 'FAH3904',
      benamning: 'Introduktion till asfaltskemin',
      omfattning: {
        formattedWithUnit: '4 hp',
      },
      organisation: {
        id: '',
        code: 'SCI',
        name: 'SCI/Materials Science',
        organisationTypeName: 'Department',
      },
      studieort: {
        id: '',
        code: 'MAIN_CAMPUS',
        name: 'Main Campus',
      },
      utbildningstyp: {
        id: '',
        code: '',
        name: 'Course, Preparatory-level',
        creditsUnit: {
          code: 'HP',
          sv: 'Högskolepoäng',
          en: 'Credits',
        },
        level: {
          code: '0',
          name: 'PREPARATORY',
        },
      },
      undervisningssprak: {
        id: '',
        code: 'SV',
        name: 'Swedish',
      },
      studietakt: {
        id: '',
        code: '33',
        name: 'One-third-time',
        takt: 33,
      },
      startperiod: {
        code: '20212',
        inDigits: '20212',
      },
      forstaUndervisningsdatum: {
        date: '2021-08-30',
        period: 0,
        year: 2021,
        week: 35,
      },
      sistaUndervisningsdatum: {
        date: '2022-05-15',
        period: 5,
        year: 2022,
        week: 20,
      },
      tillfallesperioderNummer: 5,
      schoolCode: 'SCI',
    },
  ],
}

const TEST_SEARCH_RESEARCH_THIRD_CYCLE_COURSES_SV = {
  // RESEARCH, NO searchHitInterval
  searchHits: [
    {
      course: {
        courseCode: 'FAF3302',
        title: 'Projekt i byggnadsmaterialteknik',
        credits: 7.5,
        creditUnitLabel: 'Högskolepoäng',
        creditUnitAbbr: 'hp',
        educationalLevel: 'RESEARCH',
      },
    },
    {
      course: {
        courseCode: 'FAF3304',
        title: 'Träkemi för biokompositer som byggnadsmaterial',
        credits: 7.5,
        creditUnitLabel: 'Högskolepoäng',
        creditUnitAbbr: 'hp',
        educationalLevel: 'RESEARCH',
      },
    },
    {
      course: {
        courseCode: 'FAF3305',
        title: 'Vägdimensionering och prestandautvärdering',
        credits: 3,
        creditUnitLabel: 'Högskolepoäng',
        creditUnitAbbr: 'hp',
        educationalLevel: 'RESEARCH',
      },
    },
  ],
}

const TEST_SEARCH_RESEARCH_THIRD_CYCLE_COURSES_SV_BETA = {
  searchHits: [
    {
      kod: 'FAF3302',
      benamning: 'Projekt i byggnadsmaterialteknik',
      omfattning: {
        formattedWithUnit: '7.5 hp',
      },
      organisation: {
        id: '',
        code: 'SCI',
        name: 'SCI/Materials Science',
        organisationTypeName: 'Department',
      },
      studieort: {
        id: '',
        code: 'MAIN_CAMPUS',
        name: 'Main Campus',
      },
      utbildningstyp: {
        id: '',
        code: '',
        name: 'Course, Research-level',
        creditsUnit: {
          code: 'HP',
          sv: 'Högskolepoäng',
          en: 'Credits',
        },
        level: {
          code: '2',
          name: 'Forskarnivå',
        },
      },
      undervisningssprak: {
        id: '',
        code: 'SV',
        name: 'Swedish',
      },
      studietakt: {
        id: '',
        code: '33',
        name: 'One-third-time',
        takt: 33,
      },
      schoolCode: 'SCI',
    },
    {
      kod: 'FAF3304',
      benamning: 'Träkemi för biokompositer som byggnadsmaterial',
      omfattning: {
        formattedWithUnit: '7.5 hp',
      },
      organisation: {
        id: '',
        code: 'SCI',
        name: 'SCI/Materials Science',
        organisationTypeName: 'Department',
      },
      studieort: {
        id: '',
        code: 'MAIN_CAMPUS',
        name: 'Main Campus',
      },
      utbildningstyp: {
        id: '',
        code: '',
        name: 'Course, Research-level',
        creditsUnit: {
          code: 'HP',
          sv: 'Högskolepoäng',
          en: 'Credits',
        },
        level: {
          code: '2',
          name: 'Forskarnivå',
        },
      },
      undervisningssprak: {
        id: '',
        code: 'SV',
        name: 'Swedish',
      },
      studietakt: {
        id: '',
        code: '33',
        name: 'One-third-time',
        takt: 33,
      },
      schoolCode: 'SCI',
    },
    {
      kod: 'FAF3305',
      benamning: 'Vägdimensionering och prestandautvärdering',
      omfattning: {
        formattedWithUnit: '3 hp',
      },
      organisation: {
        id: '',
        code: 'SCI',
        name: 'SCI/Materials Science',
        organisationTypeName: 'Department',
      },
      studieort: {
        id: '',
        code: 'MAIN_CAMPUS',
        name: 'Main Campus',
      },
      utbildningstyp: {
        id: '',
        code: '',
        name: 'Course, Research-level',
        creditsUnit: {
          code: 'HP',
          sv: 'Högskolepoäng',
          en: 'Credits',
        },
        level: {
          code: '2',
          name: 'Forskarnivå',
        },
      },
      undervisningssprak: {
        id: '',
        code: 'SV',
        name: 'Swedish',
      },
      studietakt: {
        id: '',
        code: '33',
        name: 'One-third-time',
        takt: 33,
      },
      schoolCode: 'SCI',
    },
  ],
}

const TEST_SEARCH_RESEARCH_THIRD_CYCLE_COURSES_EN = {
  // RESEARCH, NO searchHitInterval
  searchHits: [
    {
      course: {
        courseCode: 'FAF3302',
        title: 'Project in Building Materials Technology',
        credits: 7.5,
        creditUnitLabel: 'Credits',
        creditUnitAbbr: 'hp',
        educationalLevel: 'RESEARCH',
      },
    },
    {
      course: {
        courseCode: 'FAF3304',
        title: 'Wood Chemistry, Biocomposites and Building Materials',
        credits: 7.5,
        creditUnitLabel: 'Credits',
        creditUnitAbbr: 'hp',
        educationalLevel: 'RESEARCH',
      },
    },
    {
      course: {
        courseCode: 'FAF3305',
        title: 'Pavement Design and Performance Prediction',
        credits: 3,
        creditUnitLabel: 'Credits',
        creditUnitAbbr: 'hp',
        educationalLevel: 'RESEARCH',
      },
    },
  ],
}

const TEST_SEARCH_RESEARCH_THIRD_CYCLE_COURSES_EN_BETA = {
  searchHits: [
    {
      kod: 'FAF3302',
      benamning: 'Project in Building Materials Technology',
      omfattning: {
        formattedWithUnit: '7.5 hp',
      },
      organisation: {
        id: '',
        code: 'SCI',
        name: 'SCI/Materials Science',
        organisationTypeName: 'Department',
      },
      studieort: {
        id: '',
        code: 'MAIN_CAMPUS',
        name: 'Main Campus',
      },
      utbildningstyp: {
        id: '',
        code: '',
        name: 'Course, Research-level',
        creditsUnit: {
          code: 'HP',
          sv: 'Högskolepoäng',
          en: 'Credits',
        },
        level: {
          code: '2',
          name: 'Third cycle',
        },
      },
      undervisningssprak: {
        id: '',
        code: 'EN',
        name: 'English',
      },
      studietakt: {
        id: '',
        code: '33',
        name: 'One-third-time',
        takt: 33,
      },
      schoolCode: 'SCI',
    },
    {
      kod: 'FAF3304',
      benamning: 'Wood Chemistry, Biocomposites and Building Materials',
      omfattning: {
        formattedWithUnit: '7.5 hp',
      },
      organisation: {
        id: '',
        code: 'SCI',
        name: 'SCI/Materials Science',
        organisationTypeName: 'Department',
      },
      studieort: {
        id: '',
        code: 'MAIN_CAMPUS',
        name: 'Main Campus',
      },
      utbildningstyp: {
        id: '',
        code: '',
        name: 'Course, Research-level',
        creditsUnit: {
          code: 'HP',
          sv: 'Högskolepoäng',
          en: 'Credits',
        },
        level: {
          code: '2',
          name: 'Third cycle',
        },
      },
      undervisningssprak: {
        id: '',
        code: 'EN',
        name: 'English',
      },
      studietakt: {
        id: '',
        code: '33',
        name: 'One-third-time',
        takt: 33,
      },
      schoolCode: 'SCI',
    },
    {
      kod: 'FAF3305',
      benamning: 'Pavement Design and Performance Prediction',
      omfattning: {
        formattedWithUnit: '3 hp',
      },
      organisation: {
        id: '',
        code: 'SCI',
        name: 'SCI/Materials Science',
        organisationTypeName: 'Department',
      },
      studieort: {
        id: '',
        code: 'MAIN_CAMPUS',
        name: 'Main Campus',
      },
      utbildningstyp: {
        id: '',
        code: '',
        name: 'Course, Research-level',
        creditsUnit: {
          code: 'HP',
          sv: 'Högskolepoäng',
          en: 'Credits',
        },
        level: {
          code: '2',
          name: 'Third cycle',
        },
      },
      undervisningssprak: {
        id: '',
        code: 'EN',
        name: 'English',
      },
      studietakt: {
        id: '',
        code: '33',
        name: 'One-third-time',
        takt: 33,
      },
      schoolCode: 'SCI',
    },
  ],
}

export {
  EXPECTED_TEST_SEARCH_HITS_MIXED_EN,
  EXPECTED_TEST_SEARCH_HITS_MIXED_EN_BETA,
  EXPECTED_TEST_SEARCH_HITS_MIXED_SV,
  EXPECTED_TEST_SEARCH_HITS_MIXED_SV_BETA,
  EXPECTED_TEST_SEARCH_HITS_MIXED_PERIODS_TEXTS_EN,
  EXPECTED_TEST_SEARCH_HITS_MIXED_PERIODS_TEXTS_EN_BETA,
  EXPECTED_TEST_SEARCH_HITS_MIXED_PERIODS_TEXTS_SV,
  EXPECTED_TEST_SEARCH_HITS_MIXED_PERIODS_TEXTS_SV_BETA,
  TEST_SEARCH_HITS_MIXED_EN,
  TEST_SEARCH_HITS_MIXED_EN_BETA,
  TEST_SEARCH_HITS_MIXED_SV,
  TEST_SEARCH_HITS_MIXED_SV_BETA,
  TEST_SEARCH_RESEARCH_THIRD_CYCLE_COURSES_SV,
  TEST_SEARCH_RESEARCH_THIRD_CYCLE_COURSES_SV_BETA,
  TEST_SEARCH_RESEARCH_THIRD_CYCLE_COURSES_EN,
  TEST_SEARCH_RESEARCH_THIRD_CYCLE_COURSES_EN_BETA,
}
