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

function setPeriods(periods) {
  this.period = _transformByInputType(periods)
}

function setSchoolsWithDepartments(schoolsWithDepartments) {
  this.schoolsWithDepartments = schoolsWithDepartments
  console.log('schoolsWithDepartments first department', schoolsWithDepartments[0].departments[0])
  //  const departments_example= [
  //   {
  //     departmentPrefix: 'J',
  //     name: 'Elektroteknik och datavetenskap',
  //     departments: [
  //       { code: 'AAB', name: 'Utbildningskansli AAB' }
  //, [Object], [Object],
  //     ]
  //   },
  //   {
  //     departmentPrefix: 'K',
  //     name: 'Kemivetenskap',
  //     departments: [ [Object], [Object], [Object], [Object], [Object], [Object] ]
  //   },]
}

function setDepartmentCodeOrPrefix(departmentCodeOrPrefix) {
  this.departmentCodeOrPrefix = departmentCodeOrPrefix
}

const searchCoursesStore = {
  /**
   * @property {string} departmentCodeOrPrefix
   */
  departmentCodeOrPrefix: '',
  /**
   * @method
   * @param {string} departmentCodeOrPrefix
   */
  setDepartmentCodeOrPrefix,
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
  /**
   * @property {[]} period
   */
  period: [],
  /**
   * @method
   * @param {[]} periods
   */
  setPeriods,

  /**
   * @method
   * @param {[]} schoolsWithDepartments
   */
  setSchoolsWithDepartments,

  /**
   * @property {[]} schoolsWithDepartments
   */
  schoolsWithDepartments: [],
}

export default searchCoursesStore
