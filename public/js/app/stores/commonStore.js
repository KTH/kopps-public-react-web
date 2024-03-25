function setBrowserConfig(config, thisHostBaseUrl = null) {
  this.browserConfig = config
  this.thisHostBaseUrl = thisHostBaseUrl
}

function setLanguage(lang) {
  this.language = lang
  this.languageIndex = lang === 'en' ? 0 : 1
}

function setStatusCode(statusCode) {
  this.statusCode = statusCode
}

function createCommonStore() {
  const commonStore = {
    /**
     * @property {object} browserConfig
     */
    browserConfig: {},
    /**
     * @method
     * @param {object} config
     */
    setBrowserConfig,
    /**
     * @property {number} statusCode
     */
    statusCode: null,
    /**
     * @method
     * @param {number} statusCode
     */
    setStatusCode,
    /**
     * @property {string} language
     * @property {number} languageIndex
     */
    language: null,
    languageIndex: 0,
    /**
     * @method
     * @param {string} lang
     */
    setLanguage,
  }
  return commonStore
}
export default createCommonStore
