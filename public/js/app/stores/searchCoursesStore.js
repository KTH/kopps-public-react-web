function setPattern(textPattern) {
  if (typeof textPattern === 'string') this.textPattern = textPattern || ''
  // else throw new Error
}

function _transformByInputType(parameters) {
  const type = typeof parameters
  switch (type) {
    case 'string':
      return [parameters]
    case 'object':
      return Object.values(parameters)
    case 'array':
      return parameters
  }
}

function setEduLevels(eduLevels) {
  this.eduLevel = _transformByInputType(eduLevels)
}

function setShowOptions(otherOptions) {
  this.showOptions = _transformByInputType(otherOptions)
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
  /**
   * @property {[]} showOptions
   */
  showOptions: [],
  /**
   * @method
   * @param {[]} otherOptions
   */
  setShowOptions,
}

export default searchCoursesStore
