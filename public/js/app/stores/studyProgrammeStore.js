function setStudyProgramme(studyProgramme) {
  this.studyProgramme = studyProgramme
}

function setProgrammeCode(programmeCode) {
  this.programmeCode = programmeCode
}

function setProgrammeName(programmeName) {
  this.programmeName = programmeName
}

function setTerm(term) {
  this.term = term
}

function setLengthInStudyYears(lengthInStudyYears) {
  this.lengthInStudyYears = lengthInStudyYears
}

const studyProgrammeStore = {
  /**
   * @property {string} studyProgramme
   */
  // TODO: Refactor. Duplicate in createApplicationStore
  studyProgramme: '',
  /**
   * @method
   * @param {string} studyProgramme
   */
  // TODO: Refactor. Duplicate in createApplicationStore
  setStudyProgramme,
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
   * @property {number} lengthInStudyYears
   */
  lengthInStudyYears: 0,
  /**
   * @method
   * @param {number} lengthInStudyYears
   */
  setLengthInStudyYears,
}

export default studyProgrammeStore
