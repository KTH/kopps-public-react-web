function getLanguageParam(language) {
  return language === 'en' ? '?l=en' : ''
}

function pageLink(pageId, language) {
  const languageParam = getLanguageParam(language)
  return `${pageId}${languageParam}`
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

module.exports = { departmentLink, getLanguageParam, pageLink, programmeLink, thirdCycleDepartmentLink }
