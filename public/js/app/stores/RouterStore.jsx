import { observable, action } from 'mobx'

class RouterStore {
  @observable test = 'This is the default string...'

  @action getData(){
      return this.test = 'Happy coding!! :)'
  }

  @action getLdapUserByUsername (params) {
    return axios.get(this.buildApiUrl(this.paths.api.searchLdapUser.uri, params), this._getOptions()).then((res) => {
      return res.data
    }).catch(err => {
      if (err.response) {
        throw new Error(err.message, err.response.data)
      }
      throw err
    })
  }

  @action getBreadcrumbs () {
    return {
      url:'xxx',
      label:'TODO'
    }
  }

  @action setBrowserConfig (config, paths, apiHost, profileBaseUrl) {
    this.browserConfig = config
    this.paths = paths
    this.apiHost = apiHost
    this.profileBaseUrl = profileBaseUrl
  }

  @action __SSR__setCookieHeader (cookieHeader) {
    if (typeof window === 'undefined') {
      this.cookieHeader = cookieHeader || ''
    }
  }

  @action doSetLanguage (lang) {
    this.language = lang
  }

  @action getBrowserInfo () {
    var navAttrs = ['appCodeName', 'appName', 'appMinorVersion', 'cpuClass',
     'platform', 'opsProfile', 'userProfile', 'systemLanguage',
     'userLanguage', 'appVersion', 'userAgent', 'onLine', 'cookieEnabled']
    var docAttrs = ['referrer', 'title', 'URL']
    var value = {document: {}, navigator: {}}

    for (let i = 0; i < navAttrs.length; i++) {
      if (navigator[navAttrs[i]] || navigator[navAttrs[i]] === false) {
        value.navigator[navAttrs[i]] = navigator[navAttrs[i]]
      }
    }

    for (let i = 0; i < docAttrs.length; i++) {
      if (document[docAttrs[i]]) {
        value.document[docAttrs[i]] = document[docAttrs[i]]
      }
    }
    return value
  }

  initializeStore (storeName) {
      const store = this

      if (typeof window !== 'undefined' && window.__initialState__ && window.__initialState__[storeName]) {
        /* TODO:
        const util = globalRegistry.getUtility(IDeserialize, 'kursinfo-web')
        const importData = JSON.parse(decodeURIComponent(window.__initialState__[storeName]))
        console.log("importData",importData, "util",util)
        for (let key in importData) {
          // Deserialize so we get proper ObjectPrototypes
          // NOTE! We need to escape/unescape each store to avoid JS-injection
          store[key] = util.deserialize(importData[key])
        }
        delete window.__initialState__[storeName]*/

        const tmp = JSON.parse(decodeURIComponent(window.__initialState__[storeName]))
        for (let key in tmp) {
          store[key] = tmp[key]
          delete tmp[key]
        }

        // Just a nice helper message
        if (Object.keys(window.__initialState__).length === 0) {
          window.__initialState__ = 'Mobx store state initialized'
        }
      }
    }
  }

export default RouterStore