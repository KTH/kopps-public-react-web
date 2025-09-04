import { LanguageCode } from '@kth/om-kursen-ladok-client/dist/utils'
import { createPeriodConfigForOneYear, periodConfigForOneYear } from './periodSearchUtils'

describe('periodSearchUtils', () => {
  test.each([2024, 2020])('should create config for spring and summer', year => {
    const result = periodConfigForOneYear(
      { year, terms: [1] },
      { semesterLabel: { 1: 'Spring', 2: 'Autumn' }, isEnglish: true, summerLabel: 'summer' }
    )

    expect(result).toHaveLength(3)

    expect(result[0].label).toStrictEqual(`Spring ${year} period 3`)
    expect(result[0].id).toStrictEqual(`VT${year}:3`)
    expect(result[0].value).toStrictEqual(`VT${year}:3`)
    expect(result[1].label).toStrictEqual(`Spring ${year} period 4`)
    expect(result[1].id).toStrictEqual(`VT${year}:4`)
    expect(result[1].value).toStrictEqual(`VT${year}:4`)
    expect(result[2].label).toStrictEqual(`${year} summer`)
    expect(result[2].id).toStrictEqual(`${year}:summer`)
    expect(result[2].value).toStrictEqual(`${year}:summer`)
  })

  test.each([2019, 2025])('should create config for autumn', year => {
    const result = periodConfigForOneYear(
      { year, terms: [2] },
      { semesterLabel: { 1: 'Spring', 2: 'Autumn' }, isEnglish: true, summerLabel: 'summer' }
    )

    expect(result).toHaveLength(3)

    expect(result[0].label).toStrictEqual(`${year} summer`)
    expect(result[0].id).toStrictEqual(`${year}:summer`)
    expect(result[0].value).toStrictEqual(`${year}:summer`)
    expect(result[1].label).toStrictEqual(`Autumn ${year} period 1`)
    expect(result[1].id).toStrictEqual(`HT${year}:1`)
    expect(result[1].value).toStrictEqual(`HT${year}:1`)
    expect(result[2].label).toStrictEqual(`Autumn ${year} period 2`)
    expect(result[2].id).toStrictEqual(`HT${year}:2`)
    expect(result[2].value).toStrictEqual(`HT${year}:2`)
  })

  test.each([2024, 2025])('should create config for spring, summer and autumn', year => {
    const result = periodConfigForOneYear(
      { year, terms: [1, 2] },
      { semesterLabel: { 1: 'Spring', 2: 'Autumn' }, isEnglish: true, summerLabel: 'summer' }
    )

    expect(result).toHaveLength(5)

    expect(result[0].label).toStrictEqual(`Spring ${year} period 3`)
    expect(result[0].id).toStrictEqual(`VT${year}:3`)
    expect(result[0].value).toStrictEqual(`VT${year}:3`)
    expect(result[1].label).toStrictEqual(`Spring ${year} period 4`)
    expect(result[1].id).toStrictEqual(`VT${year}:4`)
    expect(result[1].value).toStrictEqual(`VT${year}:4`)
    expect(result[2].label).toStrictEqual(`${year} summer`)
    expect(result[2].id).toStrictEqual(`${year}:summer`)
    expect(result[2].value).toStrictEqual(`${year}:summer`)
    expect(result[3].label).toStrictEqual(`Autumn ${year} period 1`)
    expect(result[3].id).toStrictEqual(`HT${year}:1`)
    expect(result[3].value).toStrictEqual(`HT${year}:1`)
    expect(result[4].label).toStrictEqual(`Autumn ${year} period 2`)
    expect(result[4].id).toStrictEqual(`HT${year}:2`)
    expect(result[4].value).toStrictEqual(`HT${year}:2`)
  })

  test.each([2024, 2025])('should create config for spring, summer and autumn', year => {
    const result = periodConfigForOneYear(
      { year, terms: [1, 2] },
      { semesterLabel: { 1: 'VT', 2: 'HT' }, isEnglish: false, summerLabel: 'summer' }
    )

    expect(result).toHaveLength(5)

    expect(result[0].label).toStrictEqual(`VT${year} period 3`)
    expect(result[0].id).toStrictEqual(`VT${year}:3`)
    expect(result[0].value).toStrictEqual(`VT${year}:3`)
    expect(result[1].label).toStrictEqual(`VT${year} period 4`)
    expect(result[1].id).toStrictEqual(`VT${year}:4`)
    expect(result[1].value).toStrictEqual(`VT${year}:4`)
    expect(result[2].label).toStrictEqual(`${year} summer`)
    expect(result[2].id).toStrictEqual(`${year}:summer`)
    expect(result[2].value).toStrictEqual(`${year}:summer`)
    expect(result[3].label).toStrictEqual(`HT${year} period 1`)
    expect(result[3].id).toStrictEqual(`HT${year}:1`)
    expect(result[3].value).toStrictEqual(`HT${year}:1`)
    expect(result[4].label).toStrictEqual(`HT${year} period 2`)
    expect(result[4].id).toStrictEqual(`HT${year}:2`)
    expect(result[4].value).toStrictEqual(`HT${year}:2`)
  })
})

// describe('createPeriodConfigForOneYear', () => {

//   test('should create config for spring and summer', () => {
//     const result = createPeriodConfigForOneYear(year: 2025, semesters: [1])
//   })
// })
