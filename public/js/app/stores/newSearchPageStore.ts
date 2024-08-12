import {
  SetSchoolsWithDepartments,
  SearchCoursesStore,
} from './types/searchPageStoreTypes'

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
    schoolsWithDepartments: [],
    currentSchoolsWithDepartments: [],
    deprecatedSchoolsWithDepartments: [],
    setSchoolsWithDepartments,
    setDeprecatedSchoolsWithDepartments,
    setCurrentSchoolsWithDepartments,
  }

  return searchCoursesStore
}
