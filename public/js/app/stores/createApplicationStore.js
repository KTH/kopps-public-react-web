/* eslint no-use-before-define: ["error", "nofunc"] */

// @ts-check

// eslint-disable-next-line no-unused-vars
import { observable } from 'mobx'
import axios from 'axios'

const kopps = axios.create({ baseURL: 'http://localhost:8010/proxy/api/kopps/v2' })

export default createApplicationStore

function createApplicationStore() {
  const store = {
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
     * @property {string} message
     */
    message: 'Hallo',
    /**
     * @method
     * @param {string} text
     */
    setMessage,

    koppsCourseData: null,
    koppsCourseSearch,
    /**
     * @method
     * @param {map<string, {}>} programmes
     */
    setProgrammes,

    /**
     * @property {map<string, {}>} programmes
     */
    programmes: [],

    /**
     * @method
     * @param {[]} currentSchoolsWithDepartments
     */
    setCurrentSchoolsWithDepartments,

    /**
     * @property {[]} currentSchoolsWithDepartments
     */
    currentSchoolsWithDepartments: [],

    /**
     * @method
     * @param {[]} deprecatedSchoolsWithDepartments
     */
    setDeprecatedSchoolsWithDepartments,

    /**
     * @property {[]} deprecatedSchoolsWithDepartments
     */
    deprecatedSchoolsWithDepartments: [],

    /**
     * @property {object} browserConfig
     */
    browserConfig: {},
    /**
     * @method
     * @param {object} config
     */
    setBrowserConfig,
  }

  return store
}

async function koppsCourseSearch(textPattern) {
  this.koppsCourseData = await kopps.get('/courses/search', {
    params: {
      text_pattern: textPattern,
      educational_level: 'BASIC',
    },
  })
  // console.log(this.koppsCourseData)
}

function setBreadcrumbsDynamicItems(items) {
  // [{
  //   url: 'https://www.kth.se/student/kurser/program/A/20042/arskurs5',
  //   label: 'Degree Programme in Architecture',
  // }],
  this.breadcrumbsDynamicItems = items
}
function setLanguage(lang) {
  this.language = lang
  this.languageIndex = lang === 'en' ? 0 : 1
}

function setMessage(text = 'Happy coding!! :)') {
  this.message = text
}

function setProgrammes(programmes) {
  this.programmes = [...programmes]
}

function setCurrentSchoolsWithDepartments(currentSchoolsWithDepartments) {
  this.currentSchoolsWithDepartments = currentSchoolsWithDepartments
}

function setDeprecatedSchoolsWithDepartments(deprecatedSchoolsWithDepartments) {
  this.deprecatedSchoolsWithDepartments = deprecatedSchoolsWithDepartments
}

function setBrowserConfig(config) {
  this.browserConfig = config
}
