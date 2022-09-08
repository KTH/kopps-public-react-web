function replacePathNameWithHref(element) {
  const aEl = element.getElementsByTagName('a')
  for (let i = 0; i < aEl.length; i++) {
    const a = aEl[i]
    const outerHTMLLinks = String(a.outerHTML).split('<a href="')
    const link = outerHTMLLinks && outerHTMLLinks.length > 1 ? outerHTMLLinks[1].trim() : ''
    if (!link.startsWith('http://') && !link.startsWith('https://')) {
      // Need to replace '#' if only there in the outerHTML as a href
      if (link.includes('#') && link.split('#').length === 2) {
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
