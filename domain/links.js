function _getLanguageParam(language, url = '') {
  if (language !== 'en') return ''

  const querySeparator = url.includes('?') ? '&' : '?'

  return `${querySeparator}l=en`
}

function pageLink(pagePath, language) {
  const languageParam = _getLanguageParam(language, pagePath)
  return `${pagePath}${languageParam}`
}

function departmentLink(departmentCode, language) {
  return pageLink(`/student/kurser/org/${departmentCode}`, language)
}

function programmeLink(programmeCode, language) {
  return pageLink(`/student/kurser/program/${programmeCode}`, language)
}

function thirdCycleDepartmentLink(departmentCode, language) {
  return pageLink(`/utbildning/forskarutbildning/kurser/org/${departmentCode}`, language)
}

function literatureListLink(schoolCode, term, language) {
  return pageLink(`/student/kurser/lit/${term}/${schoolCode}`, language)
}

module.exports = { departmentLink, pageLink, programmeLink, thirdCycleDepartmentLink, literatureListLink }
