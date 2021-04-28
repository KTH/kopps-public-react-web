function setBrowserConfig(config, thisHostBaseUrl = null) {
  this.browserConfig = config
  // this.paths = paths
  // this.apiHost = apiHost
  this.thisHostBaseUrl = thisHostBaseUrl
}

function setLanguage(lang) {
  this.language = lang
  this.languageIndex = lang === 'en' ? 0 : 1
}

function setBreadcrumbsDynamicItems(items) {
  // [{
  //   url: 'https://www.kth.se/student/kurser/program/A/20042/arskurs5',
  //   label: 'Degree Programme in Architecture',
  // }],
  this.breadcrumbsDynamicItems = items
}

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
  /**
   * @property {array<map<string, string>>} breadcrumbsDynamicItems
   */
  /* Use only if breadcrumbs ending depends on f.e., api */
  breadcrumbsDynamicItems: [],
  /**
   * @method
   * @param {array<map<string, string>>} items
   */
  setBreadcrumbsDynamicItems,
}

export default commonStore
