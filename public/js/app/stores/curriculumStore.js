function setProgrammeCode(programmeCode) {
  this.programmeCode = programmeCode
}

function setProgrammeName(programmeName) {
  this.programmeName = programmeName
}

function setOwningSchoolCode(owningSchoolCode) {
  this.owningSchoolCode = owningSchoolCode
}

function setTerm(term) {
  this.term = term
}

function setStudyYear(studyYear) {
  this.studyYear = studyYear
}

function setCurriculums(curriculums) {
  this.curriculums = curriculums
}

function setCourseRounds(courseRounds) {
  this.courseRounds = courseRounds
}

function setMissingAdmission() {
  this.error = this.errorType.MISSING_ADMISSION
}

function isMissingAdmission() {
  return this.error === this.errorType.MISSING_ADMISSION
}

function setCurriculumInfos(curriculumInfos) {
  this.curriculumInfos = curriculumInfos
}

const curriculumStore = {
  /**
   * @property {string} programmeCode
   */
  // TODO: Refactor. Duplicate in createApplicationStore
  programmeCode: '',
  /**
   * @method
   * @param {string} programmeCode
   */
  // TODO: Refactor. Duplicate in createApplicationStore
  setProgrammeCode,
  /**
   * @property {string} programmeName
   */
  // TODO: Refactor. Duplicate in createApplicationStore
  programmeName: '',
  /**
   * @method
   * @param {string} programmeName
   */
  // TODO: Refactor. Duplicate in createApplicationStore
  setProgrammeName,
  /**
   * @property {string} owningSchoolCode
   */
  owningSchoolCode: '',
  /**
   * @method
   * @param {string} owningSchoolCode
   */
  setOwningSchoolCode,
  /**
   * @property {string} term
   */
  term: '',
  /**
   * @method
   * @param {string} term
   */
  setTerm,
  /**
   * @property {string} studyYear
   */
  studyYear: '',
  /**
   * @method
   * @param {string} studyYear
   */
  setStudyYear,
  /**
   * @property {[]} curriculums
   */
  curriculums: [],
  /**
   * @method
   * @param {[]} curriculums
   */
  setCurriculums,
  /**
   * @property {[]} courseRounds
   */
  courseRounds: [],
  /**
   * @method
   * @param {[]} courseRounds
   */
  setCourseRounds,
  /**
   * @property {{}} errorType
   */
  errorType: {
    MISSING_ADMISSION: 'missing_admission',
  },
  /**
   * @property {string} error
   */
  error: null,
  /**
   * @method
   */
  setMissingAdmission,
  /**
   * @method
   */
  isMissingAdmission,
  /**
   * @property {[]} curriculumInfos
   */
  curriculumInfos: null,
  /**
   * @method
   * @param {[]} curriculumInfos
   */
  setCurriculumInfos,
}

export default curriculumStore
