function parentLink(language) {
  const languageParam = language === 'en' ? '?l=en' : ''
  return `/student/${languageParam}`
}

function pageLink(proxyPrefixPath, pageId) {
  return `${proxyPrefixPath}/${pageId}`
}

function programmeLink(programmeCode, language) {
  const languageParam = language === 'en' ? '?l=en' : ''
  return `/student/kurser/program/${programmeCode}${languageParam}`
}

function departmentLink(departmentCode, language) {
  const languageParam = language === 'en' ? '?l=en' : ''
  return `/student/kurser/org/${departmentCode}${languageParam}`
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
  centralStudyCounselingUrl,
  koppsEmail,
}
