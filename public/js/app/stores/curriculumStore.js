function setProgrammeCode(programmeCode) {
  this.programmeCode = programmeCode
}

function setProgrammeName(programmeName) {
  this.programmeName = programmeName
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
}

export default curriculumStore
