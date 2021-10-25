function _beforeFirstAdmissionTerm(term, firstAdmissionTerm) {
  return firstAdmissionTerm && term < firstAdmissionTerm
}

function _afterLastAdmissionTerm(term, lastAdmissionTerm) {
  return lastAdmissionTerm && term > lastAdmissionTerm
}

function _validTerm(firstAdmissionTerm, lastAdmissionTerm) {
  return function f(term) {
    return !(_beforeFirstAdmissionTerm(term, firstAdmissionTerm) || _afterLastAdmissionTerm(term, lastAdmissionTerm))
  }
}

function _filterOutInvalidTerms(programme) {
  const { approvedStudyProgrammeTerms, firstAdmissionTerm, lastAdmissionTerm } = programme
  const filteredTerms = approvedStudyProgrammeTerms.filter(_validTerm(firstAdmissionTerm, lastAdmissionTerm))
  return filteredTerms
}

module.exports = {
  filterOutInvalidTerms: _filterOutInvalidTerms,
}
