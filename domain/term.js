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

function _getCurrentTerm(overrideDate) {
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

function _nTermsAgo(fromTerm, overrideDate) {
  let nTerms = 0
  let term = fromTerm
  while (term < _getCurrentTerm(overrideDate)) {
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

function _splitTerm(term) {
  if (typeof term === 'number') {
    // TODO Verify that semester is 1 or 2?
    return [Math.floor(term / 10), term % 10]
  }
  return term.split(/([1|2])$/)
}

function formatShortTerm(term, language) {
  const t = translate(language)
  const [year, semester] = _splitTerm(term)
  const shortYear = year.slice(-2)
  return `${t('semester')[semester]}${language === 'en' ? ' ' : ''}${shortYear}`
}

function formatLongTerm(term, language) {
  const t = translate(language)
  const [year, semester] = _splitTerm(term)
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
function getRelevantTerms(numberOfTerms, overrideDate = null) {
  const currentTerm = _getCurrentTerm(overrideDate)
  const relevantTerms = _getNextTerms(currentTerm, numberOfTerms)
  return relevantTerms
}

module.exports = {
  termConstants: _constants,
  _getCurrentTerm,
  _isSpringTerm,
  _isFallTerm,
  getNextTerm: _getNextTerm,
  getRelevantTerms,
  _nTermsAgo,
  studyYear: _studyYear,
  formatShortTerm,
  formatLongTerm,
  splitTerm: _splitTerm,
}
