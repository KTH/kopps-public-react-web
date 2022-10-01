const {
  getCurrentTerm,
  isSpringTerm: isSpringTerm,
  _isFallTerm: isAutumnTerm,
  getNextTerm,
  _nTermsAgo: nTermsAgo,
  studyYear,
  formatShortTerm,
  formatLongTerm,
  splitTerm,
  parseTerm,
} = require('./term')

const overrideSpringDate = new Date()
overrideSpringDate.setFullYear(2021, 4) // May, 2021
const overrideAutumnDate = new Date()
overrideAutumnDate.setFullYear(2021, 6) // July, 2021
const expectedSpringTerm = '20211'
const expectedAutumnTerm = '20212'

const testStringSpringTerm = '20191'
const testStringAutumnTerm = '20192'
const testNumberSpringTerm = 20191
const testNumberAutumnTerm = 20192
const testNumberNextSpringTerm = 20201

const formattedLongSpringTerm = 'VT2021'
const formattedLongAutumnTerm = 'HT2021'
const formattedShortSpringTerm = 'VT21'
const formattedShortAutumnTerm = 'HT21'
const malformedTerms = ['XT2021', 'YT2021', 'XT21', 'YT21', '2021', '202', '21']

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

describe('Format term', () => {
  test('short in English', () => {
    const formattedTerm = formatShortTerm(testStringSpringTerm, 'en')
    expect(formattedTerm).toMatch('Spring 19')
  })
  test('short in Swedish', () => {
    const formattedTerm = formatShortTerm(testStringSpringTerm, 'sv')
    expect(formattedTerm).toMatch('VT19')
  })
  test('long in English', () => {
    const formattedTerm = formatLongTerm(testStringSpringTerm, 'en')
    expect(formattedTerm).toMatch('Spring 2019')
  })
  test('long in Swedish', () => {
    const formattedTerm = formatLongTerm(testStringSpringTerm, 'sv')
    expect(formattedTerm).toMatch('VT2019')
  })
})

describe('Split term', () => {
  test('with spring term', () => {
    const [stringYear, stringSemester] = splitTerm(testStringSpringTerm)
    expect(stringYear).toEqual('2019')
    expect(stringSemester).toEqual('1')
    const [numberYear, numberSemester] = splitTerm(testNumberSpringTerm)
    expect(numberYear).toEqual('2019')
    expect(numberSemester).toEqual('1')
  })
  test('with autumn term', () => {
    const [stringYear, stringSemester] = splitTerm(testStringAutumnTerm)
    expect(stringYear).toEqual('2019')
    expect(stringSemester).toEqual('2')
    const [numberYear, numberSemester] = splitTerm(testNumberAutumnTerm)
    expect(numberYear).toEqual('2019')
    expect(numberSemester).toEqual('2')
  })
})

describe('Parse term', () => {
  test('with spring term', () => {
    let parsedTerm = parseTerm(formattedLongSpringTerm)
    expect(parsedTerm).toEqual(expectedSpringTerm)
    parsedTerm = parseTerm(formattedShortSpringTerm)
    expect(parsedTerm).toEqual(expectedSpringTerm)
  })
  test('with autumn term', () => {
    let parsedTerm = parseTerm(formattedLongAutumnTerm)
    expect(parsedTerm).toEqual(expectedAutumnTerm)
    parsedTerm = parseTerm(formattedShortAutumnTerm)
    expect(parsedTerm).toEqual(expectedAutumnTerm)
  })
  test('with malformed terms', () => {
    malformedTerms.forEach(malformedTerm => {
      const parsedTerm = parseTerm(malformedTerm)
      expect(parsedTerm).toBeNull()
    })
  })
})
