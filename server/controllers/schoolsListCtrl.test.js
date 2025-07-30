jest.mock('../configuration', () => ({ server: {} }))

const { filterOutDeprecatedSchools, deprecatedSchools } = require('../../domain/schools')

const langSv = 'sv'
const langEn = 'en'
const unfilteredSchoolsWithDepartmentsInSwedish = [{ name: deprecatedSchools[langSv][0] }, { name: 'Test på svenska' }]
const expectedCurrentSchoolsWithDepartmentsInSwedish = [{ name: 'Test på svenska' }]
const expectedDeprecatedSchoolsWithDepartmentsInSwedish = [{ name: deprecatedSchools[langSv][0] }]
const unfilteredSchoolsWithDepartmentsInEnglish = [{ name: deprecatedSchools[langEn][0] }, { name: 'Test in English' }]
const expectedCurrentSchoolsWithDepartmentsInEnglish = [{ name: 'Test in English' }]
const expectedDeprecatedSchoolsWithDepartmentsInEnglish = [{ name: deprecatedSchools[langEn][0] }]

describe('Filter out deprecated schools', () => {
  test('with Swedish names', done => {
    const { currentSchoolsWithDepartments, deprecatedSchoolsWithDepartments } = filterOutDeprecatedSchools(
      unfilteredSchoolsWithDepartmentsInSwedish,
      langSv
    )
    expect(currentSchoolsWithDepartments).toEqual(expectedCurrentSchoolsWithDepartmentsInSwedish)
    expect(deprecatedSchoolsWithDepartments).toEqual(expectedDeprecatedSchoolsWithDepartmentsInSwedish)
    done()
  })
  test('with English names', done => {
    const { currentSchoolsWithDepartments, deprecatedSchoolsWithDepartments } = filterOutDeprecatedSchools(
      unfilteredSchoolsWithDepartmentsInEnglish,
      langEn
    )
    expect(currentSchoolsWithDepartments).toEqual(expectedCurrentSchoolsWithDepartmentsInEnglish)
    expect(deprecatedSchoolsWithDepartments).toEqual(expectedDeprecatedSchoolsWithDepartmentsInEnglish)
    done()
  })
})
