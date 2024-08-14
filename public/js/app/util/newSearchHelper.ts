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
import { formatShortTerm } from '../../../../domain/term'

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

export const periodsStr: PeriodsStrType = (startPeriod, startTerm, endPeriod, endTerm, language) => {
  // Ensure startPeriod and endPeriod are strings
  const startPeriodStr = startPeriod?.toString()
  const endPeriodStr = endPeriod?.toString()

  if (!startTerm || !startPeriodStr) return ''
  if (!endTerm || !endPeriodStr) return `P${startPeriod} ${formatShortTerm(startTerm, language)}`
  if (startPeriod === endPeriod && startTerm === endTerm)
    return `P${startPeriod} ${formatShortTerm(startTerm, language)}`

  return `P${startPeriod} ${formatShortTerm(startTerm, language)} - P${endPeriod} ${formatShortTerm(endTerm, language)}`
}

export const sortAndParseByCourseCodeForTableView: SortAndParseByCourseCodeForTableViewType = (
  courses,
  sliceUntilNum,
  language
) => {
  const { bigSearch } = i18n.messages[language === 'en' ? '0' : '1']

  // Sort courses by courseCode
  courses.sort(compareCoursesBy('courseCode'))

  // Map and parse courses into the desired format
  const parsedCourses = courses.map(
    ({
      courseCode: code,
      title,
      credits,
      creditUnitAbbr,
      educationalLevel: level,
      startPeriod,
      startTerm,
      endPeriod,
      endTerm,
    }) =>
      [
        codeCell(code, startTerm, language),
        titleCell(code, title, startTerm, language),
        `${credits} ${creditUnitAbbr}`,
        bigSearch[level] || '',
        periodsStr(startPeriod, startTerm, endPeriod, endTerm, language) || '',
      ].slice(0, sliceUntilNum)
  )

  return parsedCourses
}
