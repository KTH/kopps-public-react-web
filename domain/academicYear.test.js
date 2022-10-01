const { formatAcademicYear } = require('./academicYear')

const testStringSpringTerm = '20191'
const testStringAutumnTerm = '20192'
const testNumberSpringTerm = 20191
const testNumberAutumnTerm = 20192

const expectedFormattedAcadeicYearSpringStart = '2019/2019'
const expectedFormattedAcadeicYearAutumnStart = '2019/2020'

describe('Format academic year', () => {
  test('starting with spring term', () => {
    let formattedAcademicYear = formatAcademicYear(testStringSpringTerm)
    expect(formattedAcademicYear).toEqual(expectedFormattedAcadeicYearSpringStart)
    formattedAcademicYear = formatAcademicYear(testNumberSpringTerm)
    expect(formattedAcademicYear).toEqual(expectedFormattedAcadeicYearSpringStart)
  })
  test('starting with autumn term', () => {
    let formattedAcademicYear = formatAcademicYear(testStringAutumnTerm)
    expect(formattedAcademicYear).toEqual(expectedFormattedAcadeicYearAutumnStart)
    formattedAcademicYear = formatAcademicYear(testNumberAutumnTerm)
    expect(formattedAcademicYear).toEqual(expectedFormattedAcadeicYearAutumnStart)
  })
})
