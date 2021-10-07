function setSelectedSchoolCode(schoolCode) {
  this.selectedSchoolCode = schoolCode
}

function setSelectedTerm(term) {
  this.selectedTerm = term
}

function setLiterature(literature) {
  this.literature = literature
}

function setSchools(schools) {
  this.schools = [...schools]
}

const literatureStore = {
  /**
   * @property {string} selecetedSchoolCode
   */
  schoolCode: '',
  /**
   * @method
   * @param {string} schoolCode
   */
  setSelectedSchoolCode,
  /**
   * @property {string} selectedTerm
   */
  selectedTerm: '',
  /**
   * @method
   * @param {string} term
   */
  setSelectedTerm,
  /**
   * @property {[]} literature
   */
  literature: [],
  /**
   * @method
   * @param {[]} literature
   */
  setLiterature,

  /**
   * @method
   * @param {[]} schools
   *
   */
  setSchools,

  /**
   * @property {[]} schools
   */
  schools: [],
}

export default literatureStore
