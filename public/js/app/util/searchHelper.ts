import i18n from '../../../../i18n'
import { DataItem } from './types/SearchDisplayTypes'
import { Link } from '@kth/kth-reactstrap/dist/components/studinfo'
import { courseLink } from './links'
import React, { ReactElement } from 'react'
import {
  CourseInstanceSearchDTO,
  CourseVersionDTO,
  KTHPeriodSemesterDTO,
} from '@kth/om-kursen-ladok-client/dist/search/types'
import { getLangIndex, isEnglishCode, LanguageCode } from 'kopps-public-react-web/shared/languageUtil'
import { formatShortYear, formattedSemesterTemplate } from 'kopps-public-react-web/shared/term'

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

export const createPeriodTexts = (
  language: LanguageCode,
  kthPeriodRange?: { start: KTHPeriodSemesterDTO; end?: KTHPeriodSemesterDTO }
): string => {
  if (!kthPeriodRange) return ''

  const start = createPeriodString(kthPeriodRange.start, language)
  const end = kthPeriodRange.end !== undefined ? createPeriodString(kthPeriodRange.end, language) : undefined

  const range = [start]
  if (end) {
    range.push(end)
  }
  return range.join(' - ')
}

const createPeriodString = (kthPeriodSemester: KTHPeriodSemesterDTO, languageCode: LanguageCode) => {
  const { messages } = i18n.messages[getLangIndex(languageCode)]

  const semesterLabel = messages.semester[kthPeriodSemester.semester.semesterNumber]

  return `${kthPeriodSemester.period} ${formattedSemesterTemplate(semesterLabel, isEnglishCode(languageCode), formatShortYear(kthPeriodSemester.semester.year))}`
}

export const formatCourseInstance = (course: CourseInstanceSearchDTO, language: LanguageCode) => {
  const periodTexts = createPeriodTexts(language, course.kthPeriodRange)

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
    courseHasNoRounds: course.courseHasNoInstances,
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

export const parseCourseInstancesForTableView = (
  courses: CourseInstanceSearchDTO[],
  languageCode: LanguageCode
): DataItem[][] => {
  const { generalSearch } = i18n.messages[getLangIndex(languageCode)]

  courses.sort(compareCourseDTOBy('kod'))

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
    } = formatCourseInstance(course, languageCode)

    const educationalLevelText = utbildningsTypes.join('\n')
    const courseLanguageText = languages.join('\n')

    const coursePaceText = studyPaces.join('\n')
    const courseCampusText = campuses.join('\n')

    const periodText = courseHasNoRounds ? generalSearch.courseHasNoRoundsInTableCell : periodTexts

    return [
      createLinkInSortableCell({
        // Code Cell
        code: courseCode,
        language: languageCode,
        startTerm,
        text: courseCode,
      }),
      createLinkInSortableCell({
        // Title Cell
        code: courseCode,
        language: languageCode,
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
