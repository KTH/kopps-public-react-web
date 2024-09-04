import { ErrorAsync } from "../../hooks/types/UseCourseSearchTypes"
import { SearchHits } from "../../util/types/SearchApiTypes"

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

const TEST_API_ANSWER_EMPTY_PARAMS = 'No query restriction was specified'
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
export {
  TEST_API_ANSWER_ALGEBRA,
  TEST_API_ANSWER_EMPTY_PARAMS,
  TEST_API_ANSWER_UNKNOWN_ERROR,
  TEST_API_ANSWER_OVERFLOW,
  TEST_API_ANSWER_NO_HITS,
  TEST_API_ANSWER_RESOLVED,
}
