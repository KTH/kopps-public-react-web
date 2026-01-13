import { AcademicSemester } from '@kth/om-kursen-ladok-client/dist/utils'
import { parseSemester, SemesterNumber } from './semesterUtils'

// eslint-disable-next-line no-unused-vars
export const termConstants = {
  SPRING_TERM_NUMBER: SemesterNumber.Spring, // Minimum possible term number.
  AUTUMN_TERM_NUMBER: SemesterNumber.Autumn, // Maximum possible term number.
  SPRING_TERM_NAME_SV: 'VT', // Swedish user-friendly name of Spring term.
  AUTUMN_TERM_NAME_SV: 'HT', // Swedish user-friendly name of Autumn term.
  SPRING_TERM_NAME_EN: 'spring ', // English user-friendly name of Spring term.
  AUTUMN_TERM_NAME_EN: 'autumn ', // English user-friendly name of Autumn term.
  YEAR_MINIMUM: 1945, // The earliest year accepted by the system.
}

export const getCurrentTerm = (overrideDate: Date): string => {
  const JULY = 6
  const SPRING = 1
  const FALL = 2
  const currentDate = overrideDate || new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()
  const currentSemester = currentMonth < JULY ? SPRING : FALL
  return `${currentYear * 10 + currentSemester}`
}

export const isSpringTerm = (term: number | string) => {
  if (typeof term === 'number') {
    return term % 2 === 1
  }
  return term.slice(-1) === '1'
}

export const isFallTerm = (term: number | string) => {
  if (typeof term === 'number') {
    return term % 2 === 0
  }
  return term.slice(-1) === '2'
}

export const getNextTerm = (term: number) => {
  const t = Math.abs(term)
  if (isSpringTerm(t)) {
    return t + 1
  }
  return t + 10 - 1
}

// TODO this logic is broken
export const nTermsAgo = (fromTerm: any, overrideDate: Date) => {
  let nTerms = 0
  let term = fromTerm
  while (term < getCurrentTerm(overrideDate)) {
    nTerms++
    term = getNextTerm(term)
  }
  return nTerms
}

/**
 *
 * @param kthSemesterString 20241
 * @returns ["2024", "1"]
 */
export const splitTerm = (kthSemesterString: string | number) => {
  const [year, semesterNumber] = parseSemester(kthSemesterString.toString())
  return [year.toString(), semesterNumber.toString()]
}

export const formatShortSemester = (academicSemester: AcademicSemester, semesterLabel: string, isEnglish: boolean) => {
  const shortYear = formatShortYear(academicSemester.year)

  return formattedSemesterTemplate(semesterLabel, isEnglish, shortYear)
}

export const formatShortYear = (year: number) => year.toString().slice(-2)

export const formatLongTerm = (kthSemesterString: string | number, semesterLabel: string, isEnglish: boolean) => {
  const [year] = splitTerm(kthSemesterString)
  return formattedSemesterTemplate(semesterLabel, isEnglish, year)
}

export const formattedSemesterTemplate = (semesterLabel: string, isEnglish: boolean, year: string) => {
  return `${semesterLabel}${isEnglish ? ' ' : ''}${year}`
}

const _getNextTerms = (fromTerm: number, numberOfTerms: number) => {
  // this term + numberOfTerms
  let nTerms = 0
  const terms = [fromTerm]
  while (nTerms < numberOfTerms) {
    terms.push(getNextTerm(terms[nTerms]))
    nTerms++
  }
  return terms
}

// numberOfTerms is always 2 in our usage, maybe we can simplify here?
export const getRelevantTerms = (numberOfTerms: number, overrideDate: Date = null) => {
  const currentTerm = getCurrentTerm(overrideDate)
  const relevantTerms = _getNextTerms(parseInt(currentTerm, 10), numberOfTerms)
  return relevantTerms
}

export const add = (fromTerm: number, years: number) => {
  return Math.abs(fromTerm) + Math.abs(years) * 10
}

export const parseTerm = (formattedTerm: string) => {
  const termRegex = /(?<term>[VvHh][Tt])(?<year>[0-9]{4}|[0-9]{2})/i
  const match = formattedTerm.match(termRegex)
  // TODO: Throw error instead?
  if (!match) return null

  const { term, year } = match.groups
  if (term === termConstants.SPRING_TERM_NAME_SV || term.toUpperCase() === termConstants.SPRING_TERM_NAME_SV) {
    return `${year.length === 2 ? '20' + year : year}1`
  }
  return `${year.length === 2 ? '20' + year : year}2`
}
