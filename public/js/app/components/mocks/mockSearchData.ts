import { ResultType } from '../../../../../shared/ResultType'
import { CourseInstanceResult, SearchData } from '../../hooks/types/UseCourseSearchTypes'

export const SEARCH_DATA_WITH_INSTANCE_RESULTS: CourseInstanceResult = {
  results: [
    {
      kod: 'AF1765',
      benamning: 'Mathematics 3, Statistics',
      omfattning: '5.0 credits',
      utbildningstyper: ['First cycle'],
      studietakter: [25],
      undervisningssprak: ['Swedish'],
      studieorter: ['KTH Campus'],
      startTerm: 'VT2025',
      perioder: [
        {
          startPeriodYear: '2025',
          startPeriod: 4,
          endPeriodYear: '2025',
          endPeriod: 4,
          tillfallesperioderNummer: 1,
        },
      ],
    },
    {
      kod: 'AI1178',
      benamning: 'Applied Mathematics and Statistics for Economists',
      omfattning: '6.0 credits',
      utbildningstyper: ['First cycle'],
      studietakter: [33],
      undervisningssprak: ['Swedish'],
      studieorter: ['KTH Campus'],
      startTerm: 'VT2025',
      perioder: [
        {
          startPeriodYear: '2025',
          startPeriod: 4,
          endPeriodYear: '2025',
          endPeriod: 4,
          tillfallesperioderNummer: 1,
        },
      ],
    },
  ],
  type: ResultType.INSTANCE,
}

export const MIXED_SEARCH_DATA_SE: CourseInstanceResult = {
  type: ResultType.INSTANCE,
  results: [
    {
      kod: 'AF0700',
      benamning: 'Introduktionskurs i matematik',
      omfattning: '1,5 fup',
      utbildningstyper: ['Förberedande nivå'],
      studietakter: [50],
      undervisningssprak: ['Svenska'],
      studieorter: ['KTH Campus'],
      startTerm: 'HT2025',
      perioder: [
        {
          startPeriodYear: '2025',
          startPeriod: 0,
          endPeriodYear: '2025',
          endPeriod: 0,
          tillfallesperioderNummer: 1,
        },
      ],
    },
    {
      kod: 'AF1764',
      benamning: 'Matematik 2, Envariabelanalys',
      omfattning: '7,5 hp',
      utbildningstyper: ['Grundnivå'],
      studietakter: [25],
      undervisningssprak: ['Svenska'],
      studieorter: ['KTH Campus'],
      startTerm: 'HT2025',
      perioder: [
        {
          startPeriodYear: '2025',
          startPeriod: 2,
          endPeriodYear: '2026',
          endPeriod: 3,
          tillfallesperioderNummer: 2,
        },
      ],
    },
    {
      kod: 'LT2047',
      benamning: 'Teman inom matematiken',
      omfattning: '7,5 hp',
      utbildningstyper: ['Avancerad nivå'],
      studietakter: [25],
      undervisningssprak: ['Svenska'],
      studieorter: ['KTH Campus'],
      startTerm: 'HT2025',
      perioder: [
        {
          startPeriodYear: '2025',
          startPeriod: 1,
          endPeriodYear: '2026',
          endPeriod: 2,
          tillfallesperioderNummer: 1,
        },
      ],
    },
    {
      kod: 'SF2725',
      benamning: 'Matematikens historia',
      omfattning: '7,5 hp',
      utbildningstyper: ['Forskarnivå'],
      studietakter: [50],
      undervisningssprak: ['Engelska'],
      studieorter: ['KTH Campus'],
      startTerm: 'HT2025',
      perioder: [
        {
          startPeriodYear: '2025',
          startPeriod: 1,
          endPeriodYear: '2025',
          endPeriod: 1,
          tillfallesperioderNummer: 1,
        },
      ],
    },
  ],
}

export const MIXED_SEARCH_DATA_EN: CourseInstanceResult = {
  type: ResultType.INSTANCE,
  results: [
    {
      kod: 'AF0700',
      benamning: 'Introduction Course in Mathematics',
      omfattning: '1.5 credits',
      utbildningstyper: ['Pre-university level'],
      studietakter: [50],
      undervisningssprak: ['Swedish'],
      studieorter: ['KTH Campus'],
      startTerm: 'HT2025',
      perioder: [
        {
          startPeriodYear: '2025',
          startPeriod: 0,
          endPeriodYear: '2025',
          endPeriod: 0,
          tillfallesperioderNummer: 1,
        },
      ],
    },
    {
      kod: 'AF1764',
      benamning: 'Mathematics 2, Single Variable Calculus',
      omfattning: '7.5 credits',
      utbildningstyper: ['First cycle'],
      studietakter: [25],
      undervisningssprak: ['Swedish'],
      studieorter: ['KTH Campus'],
      startTerm: 'HT2025',
      perioder: [
        {
          startPeriodYear: '2025',
          startPeriod: 2,
          endPeriodYear: '2026',
          endPeriod: 3,
          tillfallesperioderNummer: 2,
        },
      ],
    },
    {
      kod: 'LT2047',
      benamning: 'Themes in Mathematics',
      omfattning: '7.5 credits',
      utbildningstyper: ['Second cycle'],
      studietakter: [25],
      undervisningssprak: ['Swedish'],
      studieorter: ['KTH Campus'],
      startTerm: 'HT2025',
      perioder: [
        {
          startPeriodYear: '2025',
          startPeriod: 1,
          endPeriodYear: '2026',
          endPeriod: 2,
          tillfallesperioderNummer: 1,
        },
      ],
    },
    {
      kod: 'SF2725',
      benamning: 'History of Mathematics',
      omfattning: '7.5 credits',
      utbildningstyper: ['Third cycle'],
      studietakter: [50],
      undervisningssprak: ['English'],
      studieorter: ['KTH Campus'],
      startTerm: 'HT2025',
      perioder: [
        {
          startPeriodYear: '2025',
          startPeriod: 1,
          endPeriodYear: '2025',
          endPeriod: 1,
          tillfallesperioderNummer: 1,
        },
      ],
    },
  ],
}

export const RESEARCH_SEARCH_DATA_EN: SearchData = {
  type: ResultType.VERSION,
  results: [
    {
      kod: 'FEG3324',
      benamning: 'Applied Optimization and mathematical Decompositions',
      omfattning: '10.0 credits',
      utbildningstyp: 'Third cycle',
    },
    {
      kod: 'FEI3362',
      benamning: 'Power System Mathematical Statistics',
      omfattning: '8.0 credits',
      utbildningstyp: 'Third cycle',
    },
    {
      kod: 'FME3542',
      benamning: 'Mathematics',
      omfattning: '7.5 credits',
      utbildningstyp: 'Third cycle',
    },
  ],
}

export const RESEARCH_SEARCH_DATA_SV: SearchData = {
  type: ResultType.VERSION,
  results: [
    {
      kod: 'FEG3324',
      benamning: 'Tillämpad optimering och matematiska dekompositioner',
      omfattning: '10,0 hp',
      utbildningstyp: 'Forskarnivå',
    },
    {
      kod: 'FEI3362',
      benamning: 'Matematisk statistisk för elkraftsystem',
      omfattning: '8,0 hp',
      utbildningstyp: 'Forskarnivå',
    },
    {
      kod: 'FME3542',
      benamning: 'Matematik',
      omfattning: '7,5 hp',
      utbildningstyp: 'Forskarnivå',
    },
  ],
}

export const SEARCH_DATA_EMPTY_RESULT: SearchData = {
  results: [],
  type: ResultType.INSTANCE,
}
