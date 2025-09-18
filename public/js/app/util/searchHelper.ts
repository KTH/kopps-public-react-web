import i18n from '../../../../i18n'
import { DataItem } from './types/SearchDisplayTypes'
import { Link } from '@kth/kth-reactstrap/dist/components/studinfo'
import { courseLink } from './links'
import React, { ReactElement } from 'react'
import { formatTermByYearAndPeriod } from '../../../../domain/term'
import { CourseInstanceSearchDTO, CourseVersionDTO } from '@kth/om-kursen-ladok-client/dist/search/types'

export const getHelpText = (langIndex: number, nameOfInstruction: string, instructionKeys: string[]): string[] => {
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

/**
 *
 * Creates a link element for a course using the provided code, language, start term, and text.
 * If no text is provided, it defaults to the course code.
 * @param param0
 * @returns
 */
export const createLinkElement = ({
  code,
  language,
  startTerm,
  text = code,
  isExternal,
}: {
  code: string
  language: string
  startTerm?: string
  text?: string
  isExternal?: boolean
}): React.ReactElement => {
  return React.createElement(Link, {
    href: courseLink(code, language, { term: startTerm }),
    children: text,
    type: isExternal ? 'external-link' : undefined,
  })
}

const createLinkInSortableCell = ({
  code,
  language,
  startTerm,
  text,
}: {
  code: string
  language: string
  startTerm?: string
  text: string
}): {
  content: ReactElement
  sortKey: string
} => {
  return {
    content: createLinkElement({
      code,
      language,
      startTerm,
      text,
    }),
    sortKey: text,
  }
}

export const compareCourseDTOBy = <K extends CourseVersionDTO | CourseInstanceSearchDTO, T extends keyof K>(key: T) => {
  return function compare(a: K, b: K): number {
    if (a[key] < b[key]) {
      return -1
    }
    if (a[key] > b[key]) {
      return 1
    }
    return 0
  }
}

export const periodsStr = ({
  startPeriod,
  startPeriodYear,
  endPeriod,
  endPeriodYear,
  tillfallesperioderNummer,
  language,
}: {
  startPeriod?: number
  startPeriodYear: string
  endPeriod?: number
  endPeriodYear: string
  tillfallesperioderNummer?: number
  language: string
}): string => {
  if (!startPeriod && startPeriod !== 0) return ''
  if (startPeriod === endPeriod && tillfallesperioderNummer === 1)
    return `P${startPeriod} ${formatTermByYearAndPeriod(startPeriod, startPeriodYear, language)}`

  return `P${startPeriod} ${formatTermByYearAndPeriod(startPeriod, startPeriodYear, language)} - P${endPeriod} ${formatTermByYearAndPeriod(endPeriod, endPeriodYear, language)}`
}

export const formatCourseInstance = (course: CourseInstanceSearchDTO, language: string) => {
  const periodTexts = course.perioder.map(period => periodsStr({ ...period, language }))

  const areAllPeriodTextsEmpty = periodTexts.every((value: string) => value === '')
  const courseHasNoRounds = periodTexts.length === 0 || areAllPeriodTextsEmpty

  const studietakterWithPercentage = course.studietakter.map(studietakt => `${studietakt}%`)

  return {
    courseCode: course.kod,
    startTerm: course.startTerm,
    title: course.benamning,
    credits: course.omfattning,
    utbildningsTypes: course.utbildningstyper,
    languages: course.undervisningssprak,
    campuses: course.studieorter,
    studyPaces: studietakterWithPercentage,
    periodTexts,
    courseHasNoRounds,
  }
}

export const parseCourseVersionsForTableView = (courses: CourseVersionDTO[], language: string) => {
  courses.sort(compareCourseDTOBy('kod')) // TODO Benni make sure we only sort once

  return courses.map(course => {
    return [
      // Code Cell
      createLinkInSortableCell({
        code: course.kod,
        text: course.kod,
        language,
      }),
      // Title Cell
      createLinkInSortableCell({
        code: course.kod,
        text: course.benamning,
        language,
      }),
      course.omfattning,
      course.utbildningstyp,
    ]
  })
}

export const parseCourseInstancesForTableView = (courses: CourseInstanceSearchDTO[], language: string): DataItem[][] => {
  const { generalSearch } = i18n.messages[language === 'en' ? '0' : '1']

  courses.sort(compareCourseDTOBy('kod')) // TODO Benni make sure we only sort once

  const parsedCourses: DataItem[][] = courses.map(course => {
    const {
      courseCode,
      startTerm,
      title,
      credits,
      courseHasNoRounds,
      utbildningsTypes,
      languages,
      studyPaces,
      campuses,
      periodTexts,
    } = formatCourseInstance(course, language)

    const educationalLevelText = utbildningsTypes.join('\n')
    const courseLanguageText = languages.join('\n')

    const coursePaceText = studyPaces.join('\n')
    const courseCampusText = campuses.join('\n')

    const periodText = courseHasNoRounds ? generalSearch.courseHasNoRoundsInTableCell : periodTexts.join('\n')

    return [
      createLinkInSortableCell({
        // Code Cell
        code: courseCode,
        language,
        startTerm,
        text: courseCode,
      }),
      createLinkInSortableCell({
        // Title Cell
        code: courseCode,
        language,
        startTerm,
        text: title,
      }),
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
