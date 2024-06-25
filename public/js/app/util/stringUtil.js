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

const possiblyKeepApp = (baseUrl, keepAppOrigin) => {
  if (window.origin.includes('app') && keepAppOrigin) {
    return baseUrl.replace('www', 'app')
  }
  return baseUrl
}

const ensureNoTrailingSlash = currentHost => {
  if (currentHost.endsWith('/')) {
    return currentHost.slice(0, -1)
  }

  return currentHost
}

function getCurrentHost(baseUrl, keepAppOrigin = true) {
  const currentHost = possiblyKeepApp(baseUrl, keepAppOrigin)

  return ensureNoTrailingSlash(currentHost)
}

export { replacePathNameWithHref, getCurrentHost }
