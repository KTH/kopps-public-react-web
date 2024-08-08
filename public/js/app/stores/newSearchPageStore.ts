type SetPatternFunction = (this: SearchCoursesStore, textPattern: string) => void

type SchoolsWithDepartments = {
  departmentPrefix: string
  departments: {
    code: string
    name: string
  }[]
  name: string
}[]

type SetSchoolsWithDepartments = (this: SearchCoursesStore, schoolsWithDepartments: SchoolsWithDepartments) => void

interface SearchCoursesStore {
  textPattern: string
  schoolsWithDepartments: SchoolsWithDepartments
  currentSchoolsWithDepartments: SchoolsWithDepartments
  deprecatedSchoolsWithDepartments: SchoolsWithDepartments
  setPattern: SetPatternFunction
  setSchoolsWithDepartments: SetSchoolsWithDepartments
  setDeprecatedSchoolsWithDepartments: SetSchoolsWithDepartments
  setCurrentSchoolsWithDepartments: SetSchoolsWithDepartments
}

const setPattern: SetPatternFunction = function (textPattern) {
  if (typeof textPattern === 'string') {
    const cleanTextPattern = textPattern.replace(/['"<>$]+/g, '').trim()
    this.textPattern = cleanTextPattern || ''
  }
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

function createNewSearchPageStore(): SearchCoursesStore {
  const searchCoursesStore: SearchCoursesStore = {
    textPattern: '',
    schoolsWithDepartments: [],
    currentSchoolsWithDepartments: [],
    deprecatedSchoolsWithDepartments: [],
    setPattern,
    setSchoolsWithDepartments,
    setDeprecatedSchoolsWithDepartments,
    setCurrentSchoolsWithDepartments,
  }

  return searchCoursesStore
}

export default createNewSearchPageStore
