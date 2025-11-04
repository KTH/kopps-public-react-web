import { convertSummerToPeriods, periodConfigForOneYear } from '../periodSearchUtils'

describe('periodSearchUtils', () => {
  describe('periodConfigForOneYear', () => {
    test.each([2024, 2020])('should create config for spring and summer', year => {
      const result = periodConfigForOneYear(
        { year, terms: [1] },
        { semesterLabel: { 1: 'Spring', 2: 'Autumn' }, isEnglish: true, summerLabel: 'summer' }
      )

      expect(result).toHaveLength(3)

      expect(result[0].label).toStrictEqual(`Spring ${year} period 3`)
      expect(result[0].id).toStrictEqual(`${year}:P3`)
      expect(result[0].value).toStrictEqual(`${year}:P3`)
      expect(result[1].label).toStrictEqual(`Spring ${year} period 4`)
      expect(result[1].id).toStrictEqual(`${year}:P4`)
      expect(result[1].value).toStrictEqual(`${year}:P4`)
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
      expect(result[1].id).toStrictEqual(`${year}:P1`)
      expect(result[1].value).toStrictEqual(`${year}:P1`)
      expect(result[2].label).toStrictEqual(`Autumn ${year} period 2`)
      expect(result[2].id).toStrictEqual(`${year}:P2`)
      expect(result[2].value).toStrictEqual(`${year}:P2`)
    })

    test.each([2024, 2025])('should create config for spring, summer and autumn', year => {
      const result = periodConfigForOneYear(
        { year, terms: [1, 2] },
        { semesterLabel: { 1: 'Spring', 2: 'Autumn' }, isEnglish: true, summerLabel: 'summer' }
      )

      expect(result).toHaveLength(5)

      expect(result[0].label).toStrictEqual(`Spring ${year} period 3`)
      expect(result[0].id).toStrictEqual(`${year}:P3`)
      expect(result[0].value).toStrictEqual(`${year}:P3`)
      expect(result[1].label).toStrictEqual(`Spring ${year} period 4`)
      expect(result[1].id).toStrictEqual(`${year}:P4`)
      expect(result[1].value).toStrictEqual(`${year}:P4`)
      expect(result[2].label).toStrictEqual(`${year} summer`)
      expect(result[2].id).toStrictEqual(`${year}:summer`)
      expect(result[2].value).toStrictEqual(`${year}:summer`)
      expect(result[3].label).toStrictEqual(`Autumn ${year} period 1`)
      expect(result[3].id).toStrictEqual(`${year}:P1`)
      expect(result[3].value).toStrictEqual(`${year}:P1`)
      expect(result[4].label).toStrictEqual(`Autumn ${year} period 2`)
      expect(result[4].id).toStrictEqual(`${year}:P2`)
      expect(result[4].value).toStrictEqual(`${year}:P2`)
    })

    test.each([2024, 2025])('should create config for spring, summer and autumn', year => {
      const result = periodConfigForOneYear(
        { year, terms: [1, 2] },
        { semesterLabel: { 1: 'VT', 2: 'HT' }, isEnglish: false, summerLabel: 'summer' }
      )

      expect(result).toHaveLength(5)

      expect(result[0].label).toStrictEqual(`VT${year} period 3`)
      expect(result[0].id).toStrictEqual(`${year}:P3`)
      expect(result[0].value).toStrictEqual(`${year}:P3`)
      expect(result[1].label).toStrictEqual(`VT${year} period 4`)
      expect(result[1].id).toStrictEqual(`${year}:P4`)
      expect(result[1].value).toStrictEqual(`${year}:P4`)
      expect(result[2].label).toStrictEqual(`${year} summer`)
      expect(result[2].id).toStrictEqual(`${year}:summer`)
      expect(result[2].value).toStrictEqual(`${year}:summer`)
      expect(result[3].label).toStrictEqual(`HT${year} period 1`)
      expect(result[3].id).toStrictEqual(`${year}:P1`)
      expect(result[3].value).toStrictEqual(`${year}:P1`)
      expect(result[4].label).toStrictEqual(`HT${year} period 2`)
      expect(result[4].id).toStrictEqual(`${year}:P2`)
      expect(result[4].value).toStrictEqual(`${year}:P2`)
    })
  })

  describe('convertSummerToPeriods', () => {
    test.each([[['2025:P1', '2025:P2', '2025:P3', '2025:P4']], [['1999:P1', '1899:P2', '1111:P3', '3333:P4']]])(
      'does not change periods that are not summer',
      kthPeriods => {
        expect(convertSummerToPeriods(kthPeriods)).toEqual(kthPeriods)
      }
    )

    test.each([[['2025:P0']], [['2025:P5']]])(
      'does NOT do anything with periods that are converted summer-periods',
      kthPeriods => {
        expect(convertSummerToPeriods(kthPeriods)).toEqual(kthPeriods)
      }
    )

    test.each([2025, 1999])('converts summer to P5 and P0 and inserts it in that place: %s:summer', year => {
      const result = convertSummerToPeriods([`${year}:summer`])

      expect(result).toHaveLength(2)

      expect(result[0]).toEqual(`${year}:P5`)
      expect(result[1]).toEqual(`${year}:P0`)
    })
  })
})
