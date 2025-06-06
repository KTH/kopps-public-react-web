import { EducationalLevelCode } from "@kth/om-kursen-ladok-client"

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

export type EduLevel = `${EducationalLevelCode}`

export type SetEduLevels = (eduLevels: EduLevel[]) => void

export type Period = `${number}:${'1' | '2' | '3' | '4' | 'summer'}`

export type Semester = `${'VT' | 'HT'}${number}}`

export type SetPeriods = (periods: Period[]) => void

export type ShowOptions = 'onlyEnglish' | 'onlyMHU' | 'showCancelled'

export type SetShowOptions = (showOptions: ShowOptions[]) => void

export type DepartmentCodeOrPrefix = string

export type SetDepartmentCodeOrPrefix = (departmentCodeOrPrefix: DepartmentCodeOrPrefix) => void

export type ClearStore = () => void

export interface SearchCoursesStore {
  schoolsWithDepartments: SchoolsWithDepartments[]
  currentSchoolsWithDepartments: SchoolsWithDepartments[]
  deprecatedSchoolsWithDepartments: SchoolsWithDepartments[]
  setSchoolsWithDepartments: SetSchoolsWithDepartments
  setDeprecatedSchoolsWithDepartments: SetSchoolsWithDepartments
  setCurrentSchoolsWithDepartments: SetSchoolsWithDepartments
}
