/* eslint no-use-before-define: ["error", "nofunc"] */

import { observable } from 'mobx'
import createCommonStore from './commonStore'
import createCurriculumStore from './curriculumStore'
import createStudyProgrammeStore from './studyProgrammeStore'
import createSearchCoursesStore from './searchCoursesStore'
import { createSearchPageStore } from './searchPageStore'
import createAppendix1Store from './appendix1Store'
import createAppendix2Store from './appendix2Store'
import createPdfStore from './pdfStore'

export default createApplicationStore

function createStore() {
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
    isOldProgramme: '',
    /**
     * @method
     * @param {boolean} isOldProgramme
     */
    setIsOldProgramme,
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
  return store
}
function createApplicationStore(storeId) {
  switch (storeId) {
    case 'curriculum':
      return {
        ...createCommonStore(),
        ...createCurriculumStore(),
      }
    case 'SearchPage':
      return {
        ...createCommonStore(),
        ...createStore(),
        ...createSearchPageStore(),
      }
    case 'objectives':
    case 'extent':
    case 'eligibility':
    case 'implementation':
      return {
        ...createCommonStore(),
        ...createStudyProgrammeStore(),
      }
    case 'appendix1':
      return {
        ...createCommonStore(),
        ...createStudyProgrammeStore(),
        ...createAppendix1Store(),
      }
    case 'appendix2':
      return {
        ...createCommonStore(),
        ...createStudyProgrammeStore(),
        ...createAppendix2Store(),
      }
    case 'pdfStore':
      return {
        ...createCommonStore(),
        ...createStudyProgrammeStore(),
        ...createAppendix1Store(),
        ...createAppendix2Store(),
        ...createPdfStore(),
      }
    default:
      return {
        ...createCommonStore(),
        ...createStore(),
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

function setIsOldProgramme(isOldProgramme) {
  this.isOldProgramme = isOldProgramme
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
