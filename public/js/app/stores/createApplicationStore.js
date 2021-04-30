/* eslint no-use-before-define: ["error", "nofunc"] */

// @ts-check

// eslint-disable-next-line no-unused-vars
import { observable } from 'mobx'
import axios from 'axios'
import curriculumStore from './curriculumStore'
import commonStore from './commonStore'

const kopps = axios.create({ baseURL: 'http://localhost:8010/proxy/api/kopps/v2' })

export default createApplicationStore

const store = {
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
   * @property {string} departmentName
   */
  departmentName: '',
  /**
   * @method
   * @param {string} departmentName
   */
  setDepartmentName,

  /**
   * @property {[]} departmentCourses
   */
  departmentCourses: [],
  /**
   * @method
   * @param {[]} departmentCourses
   */
  setDepartmentCourses,
  /**
   * @property {string} programmeName
   */
  programmeName: '',
  /**
   * @method
   * @param {string} programmeName
   */
  setProgrammeName,
  /**
   * @property {string} programmeCode
   */
  programmeCode: '',
  /**
   * @method
   * @param {string} programmeCode
   */
  setProgrammeCode,
  /**
   * @property {[]} programmeTerms
   */
  programmeTerms: [],
  /**
   * @method
   * @param {[]} programmeTerms
   */
  setProgrammeTerms,
  /**
   * @property {number} lengthInStudyYears
   */
  lengthInStudyYears: 0,
  /**
   * @method
   * @param {number} lengthInStudyYears
   */
  setLengthInStudyYears,
  /**
   * @property {string} thisHostBaseUrl
   */
  thisHostBaseUrl: null,
}

function createApplicationStore(storeId) {
  switch (storeId) {
    case 'curriculum':
      return {
        ...commonStore,
        ...curriculumStore,
      }
    default:
      return {
        ...commonStore,
        ...store,
      }
  }
}

function _getThisHost(thisHostBaseUrl) {
  return thisHostBaseUrl.slice(-1) === '/' ? thisHostBaseUrl.slice(0, -1) : thisHostBaseUrl
}
async function koppsCourseSearch(textPattern) {
  try {
    const thisHost = _getThisHost(this.thisHostBaseUrl)

    const result = await axios.get(`${thisHost}/kopps-public/intern-api/sok/${this.language}?pattern=${textPattern}`)
    if (result) {
      if (result.status >= 400) {
        return 'ERROR-createApplicationStore.js-koppsCourseSearch-' + result.status
      }
      const { data } = result
      return data
    }
    return
  } catch (error) {
    if (error.response) {
      throw new Error('createApplicationStore.js-koppsCourseSearch-' + error.message)
    }
    throw error
  }
  // this.koppsCourseData = await kopps.get('/courses/search', {
  //   params: {
  //     text_pattern: textPattern,
  //     educational_level: 'BASIC',
  //   },
  // })
  // console.log(this.koppsCourseData)
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

function setDepartmentName(departmentName) {
  this.departmentName = departmentName
}

function setDepartmentCourses(departmentCourses) {
  this.departmentCourses = departmentCourses
}

function setProgrammeName(programmeName) {
  this.programmeName = programmeName
}

function setProgrammeCode(programmeCode) {
  this.programmeCode = programmeCode
}

function setProgrammeTerms(programmeTerms) {
  this.programmeTerms = programmeTerms
}

function setLengthInStudyYears(lengthInStudyYears) {
  this.lengthInStudyYears = lengthInStudyYears
}
