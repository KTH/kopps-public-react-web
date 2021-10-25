function getLanguageParam(language) {
  return language === 'en' ? '?l=en' : ''
}
function pageLink(pageId, language) {
  const languageParam = getLanguageParam(language)
  return `${pageId}${languageParam}`
}
function programmeLink(programmeCode, language) {
  return pageLink(`/student/kurser/program/${programmeCode}`, language)
}

module.exports = { getLanguageParam, pageLink, programmeLink }
