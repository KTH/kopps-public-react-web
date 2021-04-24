const {
  _getCurrentTerm: getCurrentTerm,
  _isSpringTerm: isSpringTerm,
  _isFallTerm: isAutumnTerm,
  _getNextTerm: getNextTerm,
  _nTermsAgo: nTermsAgo,
  studyYear,
} = require('./terms')

const overrideSpringDate = new Date()
overrideSpringDate.setFullYear(2021, 5) // June, 2021
const overrideAutumnDate = new Date()
overrideAutumnDate.setFullYear(2021, 6) // July, 2021
const expectedSpringTerm = '20211'
const expectedAutumnTerm = '20212'

const testStringSpringTerm = '20191'
const testStringAutumnTerm = '20192'
const testNumberSpringTerm = 20191
const testNumberAutumnTerm = 20192
const testNumberNextSpringTerm = 20201

describe('Get current term', () => {
  test('with override spring date', () => {
    const springTerm = getCurrentTerm(overrideSpringDate)
    expect(springTerm).toEqual(expectedSpringTerm)
  })
  test('with override autumn date', () => {
    const autumnTerm = getCurrentTerm(overrideAutumnDate)
    expect(autumnTerm).toEqual(expectedAutumnTerm)
  })
})

describe('Determine spring or autumn term', () => {
  test('with string spring term', () => {
    let springTerm = isSpringTerm(testStringSpringTerm)
    expect(springTerm).toBeTrue()
    springTerm = isSpringTerm(testStringAutumnTerm)
    expect(springTerm).toBeFalse()
  })
  test('with number spring term', () => {
    let springTerm = isSpringTerm(testNumberSpringTerm)
    expect(springTerm).toBeTrue()
    springTerm = isSpringTerm(testNumberAutumnTerm)
    expect(springTerm).toBeFalse()
  })
  test('with string autumn term', () => {
    let autumnTerm = isAutumnTerm(testStringAutumnTerm)
    expect(autumnTerm).toBeTrue()
    autumnTerm = isAutumnTerm(testStringSpringTerm)
    expect(autumnTerm).toBeFalse()
  })
  test('with number autumn term', () => {
    let autumnTerm = isAutumnTerm(testNumberAutumnTerm)
    expect(autumnTerm).toBeTrue()
    autumnTerm = isAutumnTerm(testNumberSpringTerm)
    expect(autumnTerm).toBeFalse()
  })
})

describe('Get next term', () => {
  test('with spring term', () => {
    const nextTerm = getNextTerm(testNumberSpringTerm)
    expect(nextTerm).toEqual(testNumberAutumnTerm)
  })
  test('with autumn term', () => {
    const nextTerm = getNextTerm(testNumberAutumnTerm)
    expect(nextTerm).toEqual(testNumberNextSpringTerm)
  })
})

describe('Calculate number of terms', () => {
  test('from spring term', () => {
    const numberOfTerms = nTermsAgo(testNumberSpringTerm, overrideAutumnDate)
    expect(numberOfTerms).toBe(5)
  })
  test('from autumn term', () => {
    const numberOfTerms = nTermsAgo(testNumberAutumnTerm, overrideAutumnDate)
    expect(numberOfTerms).toBe(4)
  })
})

describe('Calculate study year', () => {
  test('from spring term, for masters degree', () => {
    const year = studyYear(testStringSpringTerm, 5, overrideAutumnDate)
    expect(year).toBe(3)
  })
  test('from autumn term, for masters degree', () => {
    const year = studyYear(testStringAutumnTerm, 5, overrideAutumnDate)
    expect(year).toBe(3)
  })
  test('from spring term, for one-year degree', () => {
    const year = studyYear(testStringSpringTerm, 1, overrideAutumnDate)
    expect(year).toBe(1)
  })
  test('from autumn term, for one-year degree', () => {
    const year = studyYear(testStringAutumnTerm, 1, overrideAutumnDate)
    expect(year).toBe(1)
  })
})
