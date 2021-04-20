function parentLink(language) {
  const languageParam = language === 'en' ? '?l=en' : ''
  return `/student/${languageParam}`
}

function pageLink(proxyPrefixPath, pageId, language) {
  const languageParam = language === 'en' ? '?l=en' : ''
  return `${proxyPrefixPath}/${pageId}${languageParam}`
}

function programmeLink(programmeCode, language) {
  const languageParam = language === 'en' ? '?l=en' : ''
  return `/student/kurser/program/${programmeCode}${languageParam}`
}

function departmentLink(proxyPrefixPath, departmentCode, language) {
  const languageParam = language === 'en' ? '?l=en' : ''
  return `${proxyPrefixPath}/student/kurser/org/${departmentCode}${languageParam}`
}

function courseLink(courseCode, language) {
  const languageParam = language === 'en' ? '?l=en' : ''
  return `/student/kurser/kurs/${courseCode}${languageParam}`
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
}
