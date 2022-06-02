const translate = require('./translate')

// eslint-disable-next-line no-unused-vars
const _constants = {
  SPRING_TERM_NUMBER: 1, // Minimum possible term number.
  AUTUMN_TERM_NUMBER: 2, // Maximum possible term number.
  SPRING_TERM_NAME_SV: 'VT', // Swedish user-friendly name of Spring term.
  AUTUMN_TERM_NAME_SV: 'HT', // Swedish user-friendly name of Autumn term.
  SPRING_TERM_NAME_EN: 'spring ', // English user-friendly name of Spring term.
  AUTUMN_TERM_NAME_EN: 'autumn ', // English user-friendly name of Autumn term.
  YEAR_MINIMUM: 1945, // The earliest year accepted by the system.
}

function _limit(value, max) {
  if (value > max) {
    return max
  }
  if (value < 1) {
    return 1
  }
  return value
}

function getCurrentTerm(overrideDate) {
  const JULY = 6
  const SPRING = 1
  const FALL = 2
  const currentDate = overrideDate || new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()
  const currentSemester = currentMonth < JULY ? SPRING : FALL
  return `${currentYear * 10 + currentSemester}`
}

function _isSpringTerm(term) {
  if (typeof term === 'number') {
    return term % 2 === 1
  }
  return term.slice(-1) === '1'
}

function _isFallTerm(term) {
  if (typeof term === 'number') {
    return term % 2 === 0
  }
  return term.slice(-1) === '2'
}

function _getNextTerm(term) {
  const t = Math.abs(term)
  if (_isSpringTerm(t)) {
    return t + 1
  }
  return t + 10 - 1
}

function _getPreviousTerm(term) {
  const t = parseInt(term)
  if (_isFallTerm(term)) {
    return t - 1
  } else {
    return t - 10 + 1
  }
}

function _nTermsAgo(fromTerm, overrideDate) {
  let nTerms = 0
  let term = fromTerm
  while (term < getCurrentTerm(overrideDate)) {
    nTerms++
    term = _getNextTerm(term)
  }
  return nTerms
}

function _studyYear(term, lengthInStudyYears, overrideDate) {
  const t = Math.abs(term)
  const termsAgo = _nTermsAgo(t, overrideDate)
  const studyYear = _limit(1 + termsAgo / 2, lengthInStudyYears)
  return parseInt(studyYear, 10)
}

function splitTerm(term) {
  return term.toString().split(/([1|2])$/)
}

function formatShortTerm(term, language) {
  const t = translate(language)
  const [year, semester] = splitTerm(term)
  const shortYear = year.slice(-2)
  return `${t('semester')[semester]}${language === 'en' ? ' ' : ''}${shortYear}`
}

function formatLongTerm(term, language) {
  const t = translate(language)
  const [year, semester] = splitTerm(term)
  return `${t('semester')[semester]}${language === 'en' ? ' ' : ''}${year}`
}

function _getNextTerms(fromTerm, numberOfTerms) {
  // this term + numberOfTerms
  let nTerms = 0
  const terms = [fromTerm]
  while (nTerms < numberOfTerms) {
    terms.push(_getNextTerm(terms[nTerms]))
    nTerms++
  }
  return terms
}

function _getPreviousTerms(fromTerm, numberOfPreviousTerms) {
  // previous terms in historical order (earlier term comes first). Current term is not included.
  const terms = []
  let loopTerm = fromTerm
  for (let i = 0; i < numberOfPreviousTerms; i++) {
    loopTerm = _getPreviousTerm(loopTerm)
    terms.push(loopTerm)
  }
  return terms.reverse()
}

function getRelevantTerms(numberOfTerms, overrideDate = null) {
  const currentTerm = getCurrentTerm(overrideDate)
  const relevantTerms = _getNextTerms(currentTerm, numberOfTerms)
  return relevantTerms
}

function add(fromTerm, years) {
  return Math.abs(fromTerm) + Math.abs(years) * 10
}

function parseTerm(formattedTerm) {
  const termRegex = /(?<term>[VvHh][Tt])(?<year>[0-9]{4}|[0-9]{2})/i
  const match = formattedTerm.match(termRegex)
  // TODO: Throw error instead?
  if (!match) return null

  const { term, year } = match.groups
  if (term === _constants.SPRING_TERM_NAME_SV || term.toUpperCase() === _constants.SPRING_TERM_NAME_SV) {
    return `${year.length === 2 ? '20' + year : year}1`
  }
  return `${year.length === 2 ? '20' + year : year}2`
}

module.exports = {
  termConstants: _constants,
  getCurrentTerm,
  _isSpringTerm,
  _isFallTerm,
  getNextTerm: _getNextTerm,
  getPreviousTerm: _getPreviousTerm,
  getRelevantTerms,
  _nTermsAgo,
  studyYear: _studyYear,
  formatShortTerm,
  formatLongTerm,
  splitTerm,
  add,
  parseTerm,
  getPreviousTerms: _getPreviousTerms,
  getNextTerms: _getNextTerms,
}
