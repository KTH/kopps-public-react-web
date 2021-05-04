function setPattern(textPattern) {
  if (typeof textPattern === 'string') this.textPattern = textPattern || ''
  // else throw new Error
}

function setEduLevels(eduLevels) {
  this.eduLevels = eduLevels
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
   * @property {[]} eduLevels
   */
  eduLevels: [],
  /**
   * @method
   * @param {[]} eduLevels
   */
  setEduLevels,
}

export default searchCoursesStore
