function getLanguageParam(language) {
  return language === 'en' ? '?l=en' : ''
}

function parentLink(language) {
  const languageParam = getLanguageParam(language)
  return `/student/${languageParam}`
}

function parentStudyLink(language) {
  return `/utbildning/${getLanguageParam(language)}`
}

function parentThirdCycleStudyLink(language) {
  return `/utbildning/forskarutbildning/${getLanguageParam(language)}`
}

function pageLink(proxyPrefixPath, pageId, language) {
  const languageParam = getLanguageParam(language)
  return `${proxyPrefixPath}/${pageId}${languageParam}`
}

function programmeLink(programmeCode, language) {
  const languageParam = getLanguageParam(language)
  return `/student/kurser/program/${programmeCode}${languageParam}`
}

function departmentLink(proxyPrefixPath, departmentCode, language) {
  const languageParam = getLanguageParam(language)
  return `${proxyPrefixPath}/student/kurser/org/${departmentCode}${languageParam}`
}

function courseLink(courseCode, language) {
  const languageParam = getLanguageParam(language)
  return `/student/kurser/kurs/${courseCode}${languageParam}`
}

function programTermLink(proxyPrefixPath, programmeCode, term, studyYear, language) {
  const languageParam = language === 'en' ? '?l=en' : ''
  return `${proxyPrefixPath}/student/kurser/program/${programmeCode}/${term}/${studyYear}${languageParam}`
}

function centralStudyCounselingUrl() {
  return 'https://www.kth.se/studycounselling'
}

function koppsEmail() {
  return 'mailto:kopps@kth.se'
}

module.exports = {
  parentLink,
  pageLink,
  programmeLink,
  departmentLink,
  courseLink,
  centralStudyCounselingUrl,
  koppsEmail,
  parentStudyLink,
  parentThirdCycleStudyLink,
  programTermLink,
}
