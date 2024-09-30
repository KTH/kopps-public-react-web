import { ErrorAsync } from '../../hooks/types/UseCourseSearchTypes'
import { SearchHits } from '../../util/types/SearchApiTypes'

const TEST_API_ANSWER_OVERFLOW = {
  searchHits: [] as SearchHits[],
  errorCode: 'search-error-overflow' as ErrorAsync,
  errorMessage: 'search-error-overflow',
}

const TEST_API_ANSWER_NO_HITS = {
  searchHits: [] as SearchHits[],
}

const TEST_API_ANSWER_UNKNOWN_ERROR = {
  searchHits: [] as SearchHits[],
  errorCode: 'search-error-unknown' as ErrorAsync,
  errorMessage: 'search-error-unknown',
}

const TEST_API_ANSWER_RESOLVED = {
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
  ],
}

const TEST_API_ANSWER_EMPTY_PARAMS = 'No query restriction was specified'
const TEST_API_ANSWER_ALGEBRA = {
  searchHits: [
    {
      kod: 'IX1303',
      benamning: 'Algebra och geometri',
            omfattning: {
        formattedWithUnit: '7.5 hp',
      },
      organisation: {
        id: '',
        code: 'SCI',
        name: 'SCI/Mathematics',
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
      schoolCode: 'SCI',
    },
    {
      kod: 'SF1624',
      benamning: 'Algebra och geometri',
            omfattning: {
        formattedWithUnit: '7.5 hp',
      },
      organisation: {
        id: '',
        code: 'SCI',
        name: 'SCI/Mathematics',
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
      schoolCode: 'SCI',
    },
  ],
}

export {
  TEST_API_ANSWER_ALGEBRA,
  TEST_API_ANSWER_EMPTY_PARAMS,
  TEST_API_ANSWER_UNKNOWN_ERROR,
  TEST_API_ANSWER_OVERFLOW,
  TEST_API_ANSWER_NO_HITS,
  TEST_API_ANSWER_RESOLVED,
}
