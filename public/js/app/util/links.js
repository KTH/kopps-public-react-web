function parentLink(language) {
  const languageParam = language === 'en' ? '?l=en' : ''
  return `/student/kurser/kurser-inom-program${languageParam}`
}

function pageLink(pageId) {
  // TODO: Use proxyPrefixPath.uri, or similar, instead of 'kopps-public'
  return `/kopps-public/${pageId}`
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
  centralStudyCounselingUrl,
  koppsEmail,
}
