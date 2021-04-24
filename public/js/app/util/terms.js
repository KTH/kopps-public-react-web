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
  const currentDate = overrideDate || new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()
  const currentSemester = currentMonth < 6 ? 1 : 2
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
  if (_isSpringTerm(term)) {
    return term + 1
  }
  return term + 10 - 1
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
  const t = typeof term === 'number' ? term : parseInt(term, 10)
  const termsAgo = _nTermsAgo(t, overrideDate)
  const studyYear = _limit(1 + termsAgo / 2, lengthInStudyYears)
  return parseInt(studyYear, 10)
}

module.exports = {
  _getCurrentTerm,
  _isSpringTerm,
  _isFallTerm,
  _getNextTerm,
  _nTermsAgo,
  studyYear: _studyYear,
}
