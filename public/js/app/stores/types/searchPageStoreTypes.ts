export type Pattern = string

export type SetPattern = (textPattern: Pattern) => void

export type SchoolsWithDepartments = {
  departmentPrefix: string
  departments: {
    code: string
    name: string
  }[]
  name: string
}

export type SetSchoolsWithDepartments = (schoolsWithDepartments: SchoolsWithDepartments[]) => void

export type EduLevel = '0' | '1' | '2' | '3'

export type SetEduLevels = (eduLevels: EduLevel[]) => void

export type Period = `${number}:${'1' | '2' | '3' | '4' | 'summer'}`

export type SetPeriods = (periods: Period[]) => void

export type ShowOptions = 'onlyEnglish' | 'onlyMHU' | 'showCancelled'

export type SetShowOptions = (showOptions: ShowOptions[]) => void

export type DepartmentCodeOrPrefix = string

export type SetDepartmentCodeOrPrefix = (departmentCodeOrPrefix: DepartmentCodeOrPrefix) => void

export type ClearStore = () => void

export interface SearchCoursesStore {
  textPattern: Pattern
  eduLevel: EduLevel[]
  period: Period[]
  showOptions: ShowOptions[]
  departmentCodeOrPrefix: DepartmentCodeOrPrefix
  schoolsWithDepartments: SchoolsWithDepartments[]
  currentSchoolsWithDepartments: SchoolsWithDepartments[]
  deprecatedSchoolsWithDepartments: SchoolsWithDepartments[]
  setPattern: SetPattern
  setEduLevels: SetEduLevels
  setPeriods: SetPeriods
  setShowOptions: SetShowOptions
  setDepartmentCodeOrPrefix: SetDepartmentCodeOrPrefix
  setSchoolsWithDepartments: SetSchoolsWithDepartments
  setDeprecatedSchoolsWithDepartments: SetSchoolsWithDepartments
  setCurrentSchoolsWithDepartments: SetSchoolsWithDepartments
  clearStore: () => void
}
