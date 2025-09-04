import { parseSemesterIntoYearSemesterNumber } from './semesterUtils'

// eslint-disable-next-line no-unused-vars
export const termConstants = {
  SPRING_TERM_NUMBER: 1, // Minimum possible term number.
  AUTUMN_TERM_NUMBER: 2, // Maximum possible term number.
  SPRING_TERM_NAME_SV: 'VT', // Swedish user-friendly name of Spring term.
  AUTUMN_TERM_NAME_SV: 'HT', // Swedish user-friendly name of Autumn term.
  SPRING_TERM_NAME_EN: 'spring ', // English user-friendly name of Spring term.
  AUTUMN_TERM_NAME_EN: 'autumn ', // English user-friendly name of Autumn term.
  YEAR_MINIMUM: 1945, // The earliest year accepted by the system.
}

function _limit(value: number, max: number) {
  if (value > max) {
    return max
  }
  if (value < 1) {
    return 1
  }
  return value
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

function _getPreviousTerm(term: string) {
  const t = parseInt(term)
  if (isFallTerm(term)) {
    return t - 1
  } else {
    return t - 10 + 1
  }
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

// TODO this logic is broken
export const studyYear = (term, lengthInStudyYears, overrideDate) => {
  const t = Math.abs(term)
  const termsAgo = nTermsAgo(t, overrideDate)
  const studyYear = _limit(1 + termsAgo / 2, lengthInStudyYears)
  return studyYear
}

/**
 *
 * @param term 20241
 * @returns [2024, 1]
 */
export const splitTerm = (term: string | number) => {
  return term.toString().split(/([1|2])$/)
}

// export const getShortYearAndSemesterNumber = (term: string | number) => {
//   const { year, semesterNumber } = parseSemesterIntoYearSemesterNumber(term.toString())
//   const shortYear = year.toString().slice(-2)

//   return { shortYear, semesterNumber }
// }

export const formatShortTerm = (term: string | number, semesterLabel: string, isEnglish: boolean) => {
  const [year] = splitTerm(term)
  const shortYear = year.slice(-2)
  return `${semesterLabel}${isEnglish ? ' ' : ''}${shortYear}`
}

// TODO
// export const formatTermByYearAndPeriod = (period: string | number, year: string | number, language: 'en' | 'sv') => {
//   const t = translate(language)
//   const shortYear = year.toString().slice(-2)
//   return `${t('semester')[period == 0 || period == 1 || period == 2 ? 2 : 1]}${language === 'en' ? ' ' : ''}${shortYear}`
// }

export const formatLongTerm = (term: string | number, semesterLabel: string, isEnglish: boolean) => {
  const [year] = splitTerm(term)
  return `${semesterLabel}${isEnglish ? ' ' : ''}${year}`
}

function _getNextTerms(fromTerm: number, numberOfTerms: number) {
  // this term + numberOfTerms
  let nTerms = 0
  const terms = [fromTerm]
  while (nTerms < numberOfTerms) {
    terms.push(getNextTerm(terms[nTerms]))
    nTerms++
  }
  return terms
}

// function _getPreviousTerms(fromTerm, numberOfPreviousTerms) {
//   // previous terms in historical order (earlier term comes first). Current term is not included.
//   const terms = []
//   let loopTerm = fromTerm
//   for (let i = 0; i < numberOfPreviousTerms; i++) {
//     loopTerm = _getPreviousTerm(loopTerm)
//     terms.push(loopTerm)
//   }
//   return terms.reverse()
// }

// numberOfTerms is always 2
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

// export // isFallTerm as _isFallTerm,
// _getNextTerm as getNextTerm,
// _getPreviousTerm as getPreviousTerm,
// getRelevantTerms,
// _nTermsAgo,
// _studyYear as studyYear,
// formatShortTerm,
// formatTermByYearAndPeriod,
// formatLongTerm,
// splitTerm,
// add,
// parseTerm,
// _getPreviousTerms as getPreviousTerms,
// _getNextTerms as getNextTerms,
{
}
