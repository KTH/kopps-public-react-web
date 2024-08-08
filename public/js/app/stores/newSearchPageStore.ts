export type SetPattern = (textPattern: string) => void

export type SchoolsWithDepartments = {
  departmentPrefix: string
  departments: {
    code: string
    name: string
  }[]
  name: string
}[]

export type SetSchoolsWithDepartments = (schoolsWithDepartments: SchoolsWithDepartments) => void

export type EduLevel = '0' | '1' | '2' | '3'

export type SetEduLevels = (eduLevels: EduLevel[]) => void

export type SetPeriods = (periods: string[]) => void

export type ShowOptions = 'onlyEnglish' | 'onlyMHU' | 'showCancelled'

export type SetShowOptions = (showOptions: ShowOptions[]) => void

export type SetDepartmentCodeOrPrefix = (departmentCodeOrPrefix: string) => void

export interface SearchCoursesStore {
  textPattern: string
  eduLevel: EduLevel[]
  period: string[]
  showOptions: ShowOptions[]
  departmentCodeOrPrefix: string
  schoolsWithDepartments: SchoolsWithDepartments
  currentSchoolsWithDepartments: SchoolsWithDepartments
  deprecatedSchoolsWithDepartments: SchoolsWithDepartments
  setPattern: SetPattern
  setEduLevels: SetEduLevels
  setPeriods: SetPeriods
  setShowOptions: SetShowOptions
  setDepartmentCodeOrPrefix: SetDepartmentCodeOrPrefix
  setSchoolsWithDepartments: SetSchoolsWithDepartments
  setDeprecatedSchoolsWithDepartments: SetSchoolsWithDepartments
  setCurrentSchoolsWithDepartments: SetSchoolsWithDepartments
}

const setPattern: SetPattern = function (textPattern) {
  if (typeof textPattern === 'string') {
    const cleanTextPattern = textPattern.replace(/['"<>$]+/g, '').trim()
    this.textPattern = cleanTextPattern || ''
  }
}

const setEduLevels: SetEduLevels = function (eduLevels) {
  this.eduLevel = eduLevels
}

const setPeriods: SetEduLevels = function (periods) {
  this.period = periods
}

const setShowOptions: SetShowOptions = function (showOptions) {
  this.showOptions = showOptions
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
  }

  return searchCoursesStore
}
