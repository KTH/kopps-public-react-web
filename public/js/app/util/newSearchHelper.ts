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
import { formatShortTerm, formatTermByYearAndPeriod } from '../../../../domain/term'

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
  const parsedCourses = courses.map(
    ({
      kod: code,
      benamning: title,
      omfattning: credits,
      utbildningstyp: { creditsUnit: { code: creditUnitAbbr = '' } = {} } = {},
      utbildningstyp: { level: { name: educationalLevel = '' } = {} } = {},
      forstaUndervisningsdatum: { period: startPeriod = '', year: startPeriodYear = '' } = {},
      sistaUndervisningsdatum: { period: endPeriod = '', year: endPeriodYear = '' } = {},
      tillfallesperioderNummer = '',
      startperiod: { inDigits: startTerm = '' } = {},
      studietakt: { takt: coursePace = '' } = {},
      undervisningssprak: { name: courseLanguage = '' } = {},
      studieort: { name: courseCampus = '' } = {},
    }) => [
      codeCell(code, startTerm, language),
      titleCell(code, title, startTerm, language),
      `${credits} ${creditUnitAbbr.toLowerCase()}`,
      educationalLevel,
      courseLanguage,
      `${coursePace}%`,
      courseCampus,
      periodsStr(startPeriod, startPeriodYear, endPeriod, endPeriodYear, tillfallesperioderNummer, language) ||
        courseHasNoRoundsInTableCell,
    ]
  )

  return parsedCourses
}
