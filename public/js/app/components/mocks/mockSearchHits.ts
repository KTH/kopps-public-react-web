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
const EXPECTED_TEST_SEARCH_HITS_MIXED_PERIODS_TEXTS_EN = [
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
  'Saknas',
  'P0 HT21 - P5 VT22',
]

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

export {
  EXPECTED_TEST_SEARCH_HITS_MIXED_EN,
  EXPECTED_TEST_SEARCH_HITS_MIXED_SV,
  EXPECTED_TEST_SEARCH_HITS_MIXED_PERIODS_TEXTS_EN,
  EXPECTED_TEST_SEARCH_HITS_MIXED_PERIODS_TEXTS_SV,
  TEST_SEARCH_HITS_MIXED_EN,
  TEST_SEARCH_HITS_MIXED_SV,
  TEST_SEARCH_RESEARCH_THIRD_CYCLE_COURSES_SV,
  TEST_SEARCH_RESEARCH_THIRD_CYCLE_COURSES_EN,
}
