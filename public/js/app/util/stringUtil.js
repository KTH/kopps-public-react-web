function replacePathNameWithHref(element) {
  const aEl = element.getElementsByTagName('a')
  for (let i = 0; i < aEl.length; i++) {
    const a = aEl[i]
    if (!String(a.outerHTML).includes(a.href)) {
      a.outerHTML = a.outerHTML.replace(a.pathname, a.href)
    }
  }
}

function getCurrentHost(thisHostBaseUrl) {
  let hostURL = thisHostBaseUrl
  if (origin.includes('app-')) {
    hostURL = String(thisHostBaseUrl).replace('app-', 'www-')
  }
  return hostURL.slice(-1) === '/' ? hostURL.slice(0, -1) : hostURL
}

export { replacePathNameWithHref, getCurrentHost }
