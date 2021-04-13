function parentLink(language) {
  const languageParam = language === 'en' ? '?l=en' : ''
  return `/student/${languageParam}`
}

function pageLink(pageId) {
  // TODO: Use proxyPrefixPath.uri, or similar, instead of 'kopps-public'
  return `/kopps-public/${pageId}`
}

function programmeLink(programmeCode, language) {
  const languageParam = language === 'en' ? '?l=en' : ''
  return `/student/kurser/program/${programmeCode}${languageParam}`
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
  centralStudyCounselingUrl,
  koppsEmail,
}
