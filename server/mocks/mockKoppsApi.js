const chalk = require('chalk')

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
const TEST_API_ANSWER_OVERFLOW = {
  searchHits: [],
  errorCode: 'search-error-overflow',
  errorMessage: 'search-error-overflow',
}

const TEST_API_ANSWER_NO_HITS = {
  searchHits: [],
}

const TEST_API_ANSWER_UNKNOWN_ERROR = {
  searchHits: [],
  errorCode: 'search-error-unknown',
  errorMessage: 'search-error-unknown',
}
const TEST_API_ANSWER_ALGEBRA = {
  searchHits: [
    {
      course: {
        courseCode: 'IX1303',
        title: 'Algebra och geometri',
        credits: 7.5,
        creditUnitLabel: 'Högskolepoäng',
        creditUnitAbbr: 'hp',
        educationalLevel: 'BASIC',
      },
    },
    {
      course: {
        courseCode: 'SF1624',
        title: 'Algebra och geometri',
        credits: 7.5,
        creditUnitLabel: 'Högskolepoäng',
        creditUnitAbbr: 'hp',
        educationalLevel: 'BASIC',
      },
    },
  ],
}

const TEST_API_ANSWER_EDU_LEVEL_RESEARCH = {
  searchHits: [
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
  ],
}
const TEST_API_ANSWER_RESOLVED = {
  searchHits: [
    {
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
      course: {
        courseCode: 'AH2905',
        title: 'Advanced Pavement Engineering Analysis and Design',
        credits: 7.5,
        creditUnitLabel: 'Credits',
        creditUnitAbbr: 'hp',
        educationalLevel: 'ADVANCED',
      },
      searchHitInterval: {
        startTerm: '20212',
        endTerm: '20212',
        startPeriod: 1,
        endPeriod: 1,
      },
    },
  ],
}
const TEST_API_ANSWER_SEARCH_DEPARTMENT = {
  searchHits: [
    {
      course: {
        courseCode: 'AD235V',
        title: 'Arkitektoniska rekonstruktioner',
        credits: 7.5,
        creditUnitLabel: 'Högskolepoäng',
        creditUnitAbbr: 'hp',
        educationalLevel: 'ADVANCED',
      },
    },
    {
      course: {
        courseCode: 'A21HIA',
        title: 'Arkitekturens historia och teori 2, nordisk arkitektur',
        credits: 6,
        creditUnitLabel: 'Högskolepoäng',
        creditUnitAbbr: 'hp',
        educationalLevel: 'BASIC',
      },
    },
  ],
}

const TEST_API_ANSWER_EMPTY_PARAMS = 'No query restriction was specified'

const getMockedSearchResults = searchString => {
  switch (searchString) {
    case '?text_pattern=Algebra':
      return { data: TEST_API_ANSWER_ALGEBRA }
    case '?term_period=20212%3A1':
      return { data: TEST_API_ANSWER_OVERFLOW }
    case '?educational_level=RESEARCH':
      return { data: TEST_API_ANSWER_EDU_LEVEL_RESEARCH }
    case '?educational_level=ADVANCED&educational_level=RESEARCH&educational_level=BASIC&educational_level=PREPARATORY':
      return { data: TEST_SEARCH_HITS_MIXED_SV }
    case '?flag=in_english_only&flag=only_mhu&flag=include_non_active&text_pattern=AF&term_period=20212%3A1&term_period=20222%3A1&educational_level=BASIC&educational_level=ADVANCED':
      return { data: TEST_API_ANSWER_RESOLVED }
    case '?flag=in_english_only':
      return { data: TEST_API_ANSWER_RESOLVED }
    case '?department_prefix=ADD&department_prefix=ADB':
      return { data: TEST_API_ANSWER_SEARCH_DEPARTMENT }
    case '':
      return { data: TEST_API_ANSWER_EMPTY_PARAMS }
    default:
      throw new Error(`🚨  ${chalk.red(`Smth wrong with search string with search parameters ${searchString}`)}\n\n `)
  }
}

export {
  getMockedSearchResults,
  TEST_API_ANSWER_EMPTY_PARAMS,
  TEST_API_ANSWER_UNKNOWN_ERROR,
  TEST_API_ANSWER_OVERFLOW,
  TEST_API_ANSWER_NO_HITS,
  TEST_API_ANSWER_RESOLVED,
}
