function addElectiveConditionCourse(courses, electiveCondition, studyYear, code) {
  if (!this.studyYearCourses[code]) {
    this.studyYearCourses[code] = { [studyYear]: {} }
  }
  if (!this.studyYearCourses[code][studyYear]) {
    this.studyYearCourses[code][studyYear] = { [electiveCondition]: [] }
  }
  if (!this.studyYearCourses[code][studyYear][electiveCondition]) {
    this.studyYearCourses[code][studyYear][electiveCondition] = []
  }
  this.studyYearCourses[code][studyYear][electiveCondition].push(courses)
}

function addSupplementaryInfo(supplementaryInfo, studyYear, code) {
  if (!this.supplementaryInfo[code]) {
    this.supplementaryInfo[code] = { [code]: null }
  }
  this.supplementaryInfo[code][studyYear] = supplementaryInfo
}

function addConditionallyElectiveCoursesInfo(conditionallyElectiveCoursesInfo, studyYear, code) {
  if (!this.conditionallyElectiveCoursesInfo[code]) {
    this.conditionallyElectiveCoursesInfo[code] = { [code]: null }
  }
  this.conditionallyElectiveCoursesInfo[code][studyYear] = conditionallyElectiveCoursesInfo
}

function addStudyYear(studyYear) {
  this.studyYears.push(studyYear)
}

function setCreditUnitAbbr(creditUnitAbbr) {
  this.creditUnitAbbr = creditUnitAbbr
}

function setSpecializations(specializations) {
  this.specializations = specializations
}

function addSpecialization(specialization) {
  this.specializations.push(specialization)
}

const appendix1Store = {
  /**
   * @property {{}} studyYearCourses
   */
  studyYearCourses: {},
  /**
   * @method
   * @param {[]} courses
   * @param {string} electiveCondition
   * @param {number} studyYear
   * @param {string} code
   */
  addElectiveConditionCourse,
  /**
   * @property {{}} supplementaryInfo
   */
  supplementaryInfo: {},
  /**
   * @method
   * @param {string} supplementaryInfo
   * @param {number} studyYear
   * @param {string} code
   */
  addSupplementaryInfo,
  /**
   * @property {{}} conditionallyElectiveCoursesInfo
   */
  conditionallyElectiveCoursesInfo: {},
  /**
   * @method
   * @param {string} conditionallyElectiveCoursesInfo
   * @param {number} studyYear
   * @param {string} code
   */
  addConditionallyElectiveCoursesInfo,
  /**
   * @property {[]} studyYears
   */
  studyYears: [],
  /**
   * @method
   * @param {number} studyYear
   */
  addStudyYear,
  /**
   * @property {[]} studyYears
   */
  creditUnitAbbr: '',
  /**
   * @method
   * @param {string} creditUnitAbbr
   */
  setCreditUnitAbbr,
  /**
   * @property {[]} specializations
   */
  specializations: [],
  /**
   * @method
   * @param {[]} specializations
   */
  setSpecializations,
  /**
   * @method
   * @param {{}} specialization
   */
  addSpecialization,
}

export default appendix1Store
