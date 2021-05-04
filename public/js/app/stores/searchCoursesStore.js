function setPattern(textPattern) {
  if (typeof textPattern === 'string') this.textPattern = textPattern || ''
  // else throw new Error
}

function setEduLevels(eduLevels) {
  this.eduLevel = eduLevels
}

const searchCoursesStore = {
  /**
   * @property {string} textPattern
   */
  textPattern: '',
  /**
   * @method
   * @param {string} textPattern
   */
  setPattern,
  /**
   * @property {string} programmeName
   */
  /**
   * @property {[]} eduLevel
   */
  eduLevel: [],
  /**
   * @method
   * @param {[]} eduLevels
   */
  setEduLevels,
}

export default searchCoursesStore
