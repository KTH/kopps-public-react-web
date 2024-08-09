import {
  SetPattern,
  SetSchoolsWithDepartments,
  SetEduLevels,
  SetPeriods,
  SetShowOptions,
  SetDepartmentCodeOrPrefix,
  SearchCoursesStore,
  ClearStore
} from './types/searchPageStoreTypes'

const setPattern: SetPattern = function (textPattern) {
  if (typeof textPattern === 'string') {
    const cleanTextPattern = textPattern.replace(/['"<>$]+/g, '').trim()
    this.textPattern = cleanTextPattern || ''
  }
}

const setEduLevels: SetEduLevels = function (eduLevels) {
  this.eduLevel = _transformByInputType(eduLevels)
}

const setPeriods: SetPeriods = function (periods) {
  this.period = _transformByInputType(periods)
}

const setShowOptions: SetShowOptions = function (showOptions) {
  this.showOptions = _transformByInputType(showOptions)
}

const setDepartmentCodeOrPrefix: SetDepartmentCodeOrPrefix = function (departmentCodeOrPrefix) {
  this.departmentCodeOrPrefix = departmentCodeOrPrefix
}

const setSchoolsWithDepartments: SetSchoolsWithDepartments = function (schoolsWithDepartments) {
  this.schoolsWithDepartments = schoolsWithDepartments
}

const setDeprecatedSchoolsWithDepartments: SetSchoolsWithDepartments = function (deprecatedSchoolsWithDepartments) {
  this.deprecatedSchoolsWithDepartments = deprecatedSchoolsWithDepartments
}

const setCurrentSchoolsWithDepartments: SetSchoolsWithDepartments = function (currentSchoolsWithDepartments) {
  this.currentSchoolsWithDepartments = currentSchoolsWithDepartments
}

const clearStore: ClearStore = function () {
  this.setPattern('')
  this.setDepartmentCodeOrPrefix('')
  this.setPeriods([])
  this.setEduLevels([])
  this.setShowOptions([])
}

function _transformByInputType(parameters: string | string[]) {
  const type = typeof parameters
  switch (type) {
    case 'string':
      return [parameters]
    case 'object':
      return Object.values(parameters)
    default:
      return []
  }
}

export function createNewSearchPageStore(): SearchCoursesStore {
  const searchCoursesStore: SearchCoursesStore = {
    textPattern: '',
    eduLevel: [],
    period: [],
    showOptions: [],
    schoolsWithDepartments: [],
    currentSchoolsWithDepartments: [],
    deprecatedSchoolsWithDepartments: [],
    departmentCodeOrPrefix: '',
    setPattern,
    setEduLevels,
    setPeriods,
    setShowOptions,
    setDepartmentCodeOrPrefix,
    setSchoolsWithDepartments,
    setDeprecatedSchoolsWithDepartments,
    setCurrentSchoolsWithDepartments,
    clearStore,
  }

  return searchCoursesStore
}
