import i18n from '../../../../i18n'
import {
  CodeCell,
  Course,
  FlatCoursesArrType,
  GetHelpText,
  InforKursvalLink,
  PeriodsStrType,
  SortAndParseByCourseCodeForTableViewType,
  TitleCell,
} from './types/SearchHelperTypes'
import { Link } from '@kth/kth-reactstrap/dist/components/studinfo'
import { courseLink } from './links'
import React from 'react'
import { formatTermByYearAndPeriod } from '../../../../domain/term'

export const getHelpText: GetHelpText = (langIndex, nameOfInstruction, instructionKeys) => {
  /**
   * Retrieves a list of translated instructional texts based on the given language index,
   * the name of the instruction set, and the specific instruction keys.
   */

  const messages = i18n.messages[langIndex]
  const instructions = messages[nameOfInstruction] as Record<string, string>
  // instructions is an object containing all the instructions for the specified language and instruction set.

  const instructionsTexts = instructionKeys.map(key => instructions[key])
  // instructionsTexts is the list of translated instructions based on the provided instructionKeys.

  return instructionsTexts
}

export const codeCell: CodeCell = (code, startTerm, language) => {
  return {
    content: React.createElement(Link, {
      href: courseLink(code, language, { term: startTerm }),
      children: code,
    }),
    sortKey: code,
  }
}

export const titleCell: TitleCell = (code, title, startTerm, language) => {
  return {
    content: React.createElement(Link, {
      href: courseLink(code, language, { term: startTerm }),
      children: title,
    }),
    sortKey: title,
  }
}

export const inforKursvalLink: InforKursvalLink = (text, code, startTerm, language) => {
  return React.createElement(Link, {
    href: courseLink(code, language, { term: startTerm }),
    children: text,
    type: 'external-link',
  })
}

export const flatCoursesArr: FlatCoursesArrType = searchHits => {
  let hasSearchHitInterval = false
  const courses = searchHits.map(({ course, searchHitInterval }) => {
    if (searchHitInterval) hasSearchHitInterval = true
    return {
      ...course,
      ...searchHitInterval,
    }
  })
  return {
    courses: courses,
    hasSearchHitInterval: hasSearchHitInterval,
  }
}

export const compareCoursesBy = <T extends keyof Course>(key: T) => {
  return function compare(a: Course, b: Course): number {
    if (a[key] < b[key]) {
      return -1
    }
    if (a[key] > b[key]) {
      return 1
    }
    return 0
  }
}

export const periodsStr: PeriodsStrType = (
  startPeriod,
  startPeriodYear,
  endPeriod,
  endPeriodYear,
  tillfallesperioderNummer,
  language
) => {
  if (!startPeriod && startPeriod !== 0) return ''
  if (startPeriod === endPeriod && tillfallesperioderNummer === 1)
    return `P${startPeriod} ${formatTermByYearAndPeriod(startPeriod, startPeriodYear, language)}`

  return `P${startPeriod} ${formatTermByYearAndPeriod(startPeriod, startPeriodYear, language)} - P${endPeriod} ${formatTermByYearAndPeriod(endPeriod, endPeriodYear, language)}`
}

export const sortAndParseByCourseCodeForTableView: SortAndParseByCourseCodeForTableViewType = (courses, language) => {
  const { generalSearch } = i18n.messages[language === 'en' ? '0' : '1']
  const { courseHasNoRoundsInTableCell } = generalSearch

  // Sort courses by courseCode
  courses.sort(compareCoursesBy('kod'))

  // Map and parse courses into the desired format
  const parsedCourses = courses.map(course => {
    const {
      kod: courseCode,
      benamning: title,
      utbildningstyp: utbildningstyps = [],
      omfattning: { formattedWithUnit: credits = '' } = {},
      period: periods = [],
      startperiod: startPeriods = [],
      studietakt: studyPaces = [],
      undervisningssprak: languages = [],
      studieort: campuses = [],
    } = course || {}

    const allPeriods = periods.map(
      ({
        startperiod: { inDigits: startTerm = '' } = {},
        forstaUndervisningsdatum: {
          date: startDate = '',
          year: startPeriodYear = '',
          week: startWeek = '',
          period: startPeriod = '',
        } = {},
        sistaUndervisningsdatum: {
          date: endDate = '',
          year: endPeriodYear = '',
          week: endWeek = '',
          period: endPeriod = '',
        } = {},
        tillfallesperioderNummer = undefined,
      }) => ({
        startTerm,
        startDate,
        startPeriodYear,
        startWeek,
        startPeriod,
        endDate,
        endPeriodYear,
        endWeek,
        endPeriod,
        tillfallesperioderNummer,
      })
    )

    const allEducationalLevels = utbildningstyps.map(({ level: { name: educationalLevel = '' } = {} }) => ({
      educationalLevel,
    }))

    const allStudyPaces = studyPaces.map(({ takt: coursePace = '' }) => ({
      coursePace,
    }))

    const allLanguages = languages.map(({ name: courseLanguage = '' }) => ({
      courseLanguage,
    }))

    const allCampuses = campuses.map(({ name: courseCampus = '' }) => ({
      courseCampus,
    }))

    const allStartPeriods = startPeriods.map(({ code: startTerm = '', inDigits = '' }) => ({
      startTerm,
      inDigits,
    }))

    const startTerm = allStartPeriods.length === 1 ? allStartPeriods[0].startTerm : undefined

    let allPeriodTexts = []
    allPeriodTexts = allPeriods.map(
      ({
        startPeriod,
        startPeriodYear,
        endPeriod,
        endPeriodYear,
        tillfallesperioderNummer,
      }: {
        startPeriod: string
        startPeriodYear: number
        endPeriod: string
        endPeriodYear: number
        tillfallesperioderNummer: number
      }) => periodsStr(startPeriod, startPeriodYear, endPeriod, endPeriodYear, tillfallesperioderNummer, language)
    )

    const areAllPeriodTextsEmpty = allPeriodTexts.every((value: string) => value === '')

    let educationalLevelText = ''
    allEducationalLevels.forEach(({ educationalLevel }: { educationalLevel: string }, index: number) => {
      educationalLevelText += `${educationalLevel}${index + 1 != allEducationalLevels.length ? '\n' : ''}`
    })

    let courseLanguageText = ''
    allLanguages.forEach(({ courseLanguage }: { courseLanguage: string }, index: number) => {
      courseLanguageText += `${courseLanguage}${index + 1 != allLanguages.length ? '\n' : ''}`
    })

    let coursePaceText = ''
    allStudyPaces.forEach(({ coursePace }: { coursePace: number }, index: number) => {
      coursePaceText += `${coursePace}%${index + 1 != allStudyPaces.length ? '\n' : ''}`
    })

    let courseCampusText = ''
    allCampuses.forEach(({ courseCampus }: { courseCampus: string }, index: number) => {
      courseCampusText += `${courseCampus}${index + 1 != allCampuses.length ? '\n' : ''}`
    })

    let periodText = areAllPeriodTextsEmpty ? courseHasNoRoundsInTableCell : ''
    if (!areAllPeriodTextsEmpty) {
      allPeriodTexts.forEach((text: string, index: number) => {
        periodText += ` ${text} ${index + 1 != allPeriodTexts.length ? '\n' : ''}`
      })
    }

    return [
      codeCell(courseCode, startTerm, language),
      titleCell(courseCode, title, startTerm, language),
      credits,
      educationalLevelText,
      courseLanguageText,
      coursePaceText,
      courseCampusText,
      periodText,
    ]
  })

  return parsedCourses
}
