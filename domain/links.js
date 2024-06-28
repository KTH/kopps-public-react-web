function _getLanguageParam(language, url = '') {
  if (language !== 'en') return ''

  const querySeparator = url.includes('?') ? '&' : '?'

  return `${querySeparator}l=en`
}

function possiblyChangeBaseUrl() {
  let baseUrl = ''
  if (window.origin.includes('app')) {
    baseUrl = window.origin.replace('https://app', 'https://app')
  }
  return baseUrl
}

function pageLink(pagePath, language) {
  const baseUrl = possiblyChangeBaseUrl()
  const languageParam = _getLanguageParam(language, pagePath)
  return `${baseUrl}${pagePath}${languageParam}`
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

module.exports = {
  departmentLink,
  pageLink,
  possiblyChangeBaseUrl,
  programmeLink,
  thirdCycleDepartmentLink,
  literatureListLink,
}
