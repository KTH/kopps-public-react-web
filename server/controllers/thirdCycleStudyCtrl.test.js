jest.mock('../configuration', () => ({ server: {} }))
jest.mock('../kopps/koppsApi', () => {})

const { coursesFromKopps, expectedThirdCycleCourseList } = require('../mocks/mockKoppsCoursesPerDepartment')
const { getOnlyThirdCycleCourses } = require('./thirdCycleStudyDepartmentCtrl')

const langSv = 'sv'
const langEn = 'en'
const unfilteredSchoolsWithDepartmentsInSwedish = coursesFromKopps(langSv)
const expectedSchoolsWithDepartmentsInSwedish = expectedThirdCycleCourseList(langSv)
const unfilteredSchoolsWithDepartmentsInEnglish = coursesFromKopps(langEn)
const expectedSchoolsWithDepartmentsInEnglish = expectedThirdCycleCourseList(langEn)

describe('Filter out other courses which are not third cycle studies', () => {
  test('with Swedish names', done => {
    const schoolsWithDepartments = getOnlyThirdCycleCourses(unfilteredSchoolsWithDepartmentsInSwedish, langSv)
    expect(schoolsWithDepartments).toEqual(expectedSchoolsWithDepartmentsInSwedish)
    done()
  })
  test('with English names', done => {
    const schoolsWithDepartments = getOnlyThirdCycleCourses(unfilteredSchoolsWithDepartmentsInEnglish, langEn)
    expect(schoolsWithDepartments).toEqual(expectedSchoolsWithDepartmentsInEnglish)
    done()
  })
})
