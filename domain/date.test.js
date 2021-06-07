const { formatISODate } = require('./date')

const englishIndex = 0
const englishAbbr = 'en'
const swedishIndex = 1
const swedishAbbr = 'sv'

const dateOnlyString = '2021-01-02'
const dateTimeString = '2021-01-02T00:01:02'
const dateTimeLongString = '2021-01-02T00:01:02.000+01:00'

const expectedSwedishFormatted = '2021-01-02'
const expectedEnglishFormatted = '1/2/2021'

describe('Format date', () => {
  test('in Swedish format', () => {
    let swedishFormatted = formatISODate(dateOnlyString, swedishAbbr)
    expect(swedishFormatted).toEqual(expectedSwedishFormatted)
    swedishFormatted = formatISODate(dateTimeString, swedishAbbr)
    expect(swedishFormatted).toEqual(expectedSwedishFormatted)
    swedishFormatted = formatISODate(dateTimeLongString, swedishAbbr)
    expect(swedishFormatted).toEqual(expectedSwedishFormatted)
    swedishFormatted = formatISODate(dateOnlyString, swedishIndex)
    expect(swedishFormatted).toEqual(expectedSwedishFormatted)
    swedishFormatted = formatISODate(dateTimeString, swedishIndex)
    expect(swedishFormatted).toEqual(expectedSwedishFormatted)
    swedishFormatted = formatISODate(dateTimeLongString, swedishIndex)
    expect(swedishFormatted).toEqual(expectedSwedishFormatted)
  })
  test('in English format', () => {
    let englishFormatted = formatISODate(dateOnlyString, englishAbbr)
    expect(englishFormatted).toEqual(expectedEnglishFormatted)
    englishFormatted = formatISODate(dateTimeString, englishAbbr)
    expect(englishFormatted).toEqual(expectedEnglishFormatted)
    englishFormatted = formatISODate(dateTimeLongString, englishAbbr)
    expect(englishFormatted).toEqual(expectedEnglishFormatted)
    englishFormatted = formatISODate(dateOnlyString, englishIndex)
    expect(englishFormatted).toEqual(expectedEnglishFormatted)
    englishFormatted = formatISODate(dateTimeString, englishIndex)
    expect(englishFormatted).toEqual(expectedEnglishFormatted)
    englishFormatted = formatISODate(dateTimeLongString, englishIndex)
    expect(englishFormatted).toEqual(expectedEnglishFormatted)
  })
  test('in default format', () => {
    let defaultFormatted = formatISODate(dateOnlyString)
    expect(defaultFormatted).toEqual(expectedEnglishFormatted)
    defaultFormatted = formatISODate(dateTimeString)
    expect(defaultFormatted).toEqual(expectedEnglishFormatted)
    defaultFormatted = formatISODate(dateTimeLongString)
    expect(defaultFormatted).toEqual(expectedEnglishFormatted)
  })
})
