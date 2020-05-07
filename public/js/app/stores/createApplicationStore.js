/* eslint no-use-before-define: ["error", "nofunc"] */

// @ts-check

import { observable, action } from 'mobx'

export default createApplicationStore

function createApplicationStore() {
  const store = {
    message: 'Hallo',

    setMessage: action(function setMessage(text = 'Happy coding!! :)') {
      this.message = text
    }),

    getMessage: action(function getMessage() {
      return this.message
    }),

    setBrowserConfig: action(function setBrowserConfig(config, paths, apiHost, profileBaseUrl) {
      this.browserConfig = config
      this.paths = paths
      this.apiHost = apiHost
      this.profileBaseUrl = profileBaseUrl
    }),

    SSRsetCookieHeader: action(function SSRsetCookieHeader(cookieHeader) {
      if (typeof window === 'undefined') {
        this.cookieHeader = cookieHeader || ''
      }
    }),

    doSetLanguage: action(function doSetLanguage(lang) {
      this.language = lang
    }),
  }

  return store
}
