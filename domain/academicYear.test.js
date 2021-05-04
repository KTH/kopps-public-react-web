const { format } = require('./academicYear')

const testStringSpringTerm = '20191'
const testStringAutumnTerm = '20192'
const testNumberSpringTerm = 20191
const testNumberAutumnTerm = 20192

const expectedFormattedAcadeicYearSpringStart = '2019/2019'
const expectedFormattedAcadeicYearAutumnStart = '2019/2020'

describe('Format academic year', () => {
  test('starting with spring term', () => {
    let formattedAcademicYear = format(testStringSpringTerm)
    expect(formattedAcademicYear).toEqual(expectedFormattedAcadeicYearSpringStart)
    formattedAcademicYear = format(testNumberSpringTerm)
    expect(formattedAcademicYear).toEqual(expectedFormattedAcadeicYearSpringStart)
  })
  test('starting with autumn term', () => {
    let formattedAcademicYear = format(testStringAutumnTerm)
    expect(formattedAcademicYear).toEqual(expectedFormattedAcadeicYearAutumnStart)
    formattedAcademicYear = format(testNumberAutumnTerm)
    expect(formattedAcademicYear).toEqual(expectedFormattedAcadeicYearAutumnStart)
  })
})
