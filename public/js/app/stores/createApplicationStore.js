/* eslint no-use-before-define: ["error", "nofunc"] */

// @ts-check

// eslint-disable-next-line no-unused-vars
import { observable } from 'mobx'
import commonStore from './commonStore'
import curriculumStore from './curriculumStore'
import studyProgrammeStore from './studyProgrammeStore'
import searchCoursesStore from './searchCoursesStore'
import appendix1Store from './appendix1Store'
import appendix2Store from './appendix2Store'
import literatureStore from './literatureStore'

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
  /**
   * @property {string} lastAdmissionTerm
   */
  lastAdmissionTerm: '',
  /**
   * @method
   * @param {string} lastAdmissionTerm
   */
  setLastAdmissionTerm,
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
    case 'searchCourses':
      return {
        ...commonStore,
        ...searchCoursesStore,
      }
    case 'objectives':
    case 'extent':
    case 'eligibility':
    case 'implementation':
      return {
        ...commonStore,
        ...studyProgrammeStore,
      }
    case 'appendix1':
      return {
        ...commonStore,
        ...studyProgrammeStore,
        ...appendix1Store,
      }
    case 'appendix2':
      return {
        ...commonStore,
        ...studyProgrammeStore,
        ...appendix2Store,
      }
    case 'literatureList':
      return {
        ...commonStore,
        ...literatureStore,
      }
    default:
      return {
        ...commonStore,
        ...store,
      }
  }
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

function setLastAdmissionTerm(lastAdmissionTerm) {
  this.lastAdmissionTerm = lastAdmissionTerm
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
