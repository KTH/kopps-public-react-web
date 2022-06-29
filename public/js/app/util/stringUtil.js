function replacePathNameWithHref(element) {
  const aEl = element.getElementsByTagName('a')
  for (let i = 0; i < aEl.length; i++) {
    const a = aEl[i]
    if (!String(a.outerHTML).includes(a.href)) {
      if (a.outerHTML.includes('#')) {
        a.outerHTML = a.outerHTML.replace('#', a.href)
      } else {
        a.outerHTML = a.outerHTML.replace(a.pathname, a.href)
      }
    }
  }
}

function getCurrentHost(thisHostBaseUrl, replaceAppWithWWW = true) {
  let hostURL = thisHostBaseUrl
  if (origin.includes('app-') && replaceAppWithWWW) {
    hostURL = String(thisHostBaseUrl).replace('app-', 'www-')
    // eslint-disable-next-line no-console
    console.warn('This host { uri : ' + hostURL + ' } needs KTH VPN. Make sure you are connected with KTH VPN.')
  }
  return hostURL.slice(-1) === '/' ? hostURL.slice(0, -1) : hostURL
}

export { replacePathNameWithHref, getCurrentHost }
