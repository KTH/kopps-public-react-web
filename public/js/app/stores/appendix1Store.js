function addHtmlStudyYear(html, studyYear) {
  if (!this.htmlStudyYears) {
    this.htmlStudyYears = {}
  }
  this.htmlStudyYears[studyYear] = html
}

function addElectiveConditionCourse(course, electiveCondition, studyYear, code) {
  if (!this.studyYearCourses[code]) {
    this.studyYearCourses[code] = { [studyYear]: {} }
  }
  if (!this.studyYearCourses[code][studyYear]) {
    this.studyYearCourses[code][studyYear] = { [electiveCondition]: [] }
  }
  if (!this.studyYearCourses[code][studyYear][electiveCondition]) {
    this.studyYearCourses[code][studyYear][electiveCondition] = []
  }

  const existingCourses = this.studyYearCourses[code][studyYear][electiveCondition]
  const alreadyExists = existingCourses.some(c => c.code === course.code)
  /*
    These lines has been added due to the fact that previously we were getting courses from kopps
    and the later we were fetching course rounds for them. So we had unique courses.
    But the the data from ladok send course instance, and on that case we might have multiple
    course instances for the same coruse version. (and here we will skip to add the course if it is already added)
  */
  if (!alreadyExists) {
    this.studyYearCourses[code][studyYear][electiveCondition].push(course)
  }
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

function createAppendix1Store() {
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

    htmlStudyYears: {},
    /**
     * @method
     * @param {string} html
     * @param {number} studyYear
     */
    addHtmlStudyYear,
  }
  return appendix1Store
}

export default createAppendix1Store
