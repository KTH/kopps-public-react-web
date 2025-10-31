import { groupedPeriodsBySeasonInCorrectOrder } from './periods'
import { formatLongTerm, isSpringTerm } from './term'

type PeriodConfig = {
  label: string
  id: string
  value: string
}

export const periodConfigForOneYear = (
  { year, terms }: { year: number; terms: number[] },
  {
    summerLabel,
    semesterLabel,
    isEnglish,
  }: { summerLabel: string; semesterLabel: { 1: string; 2: string }; isEnglish: boolean }
): PeriodConfig[] => {
  const hasOnlyOneSemester = terms.length === 1

  const { spring: springPeriods, autumn: autumnPeriods } = groupedPeriodsBySeasonInCorrectOrder

  type PeriodToken = number | 'summer'

  const result: PeriodConfig[] = []

  terms.forEach(term => {
    // Compute list of tokens (period numbers and/or a single 'summer' placeholder)
    let tokens: PeriodToken[]
    if (isSpringTerm(term)) {
      // spring periods then summer
      tokens = [...springPeriods, 'summer']
    } else if (hasOnlyOneSemester) {
      // one-semester autumn: summer then autumn periods
      tokens = ['summer', ...autumnPeriods]
    } else {
      // two-semester autumn: only autumn periods
      tokens = [...autumnPeriods]
    }

    const termLabelPrefix = formatLongTerm(`${year}${term}`, semesterLabel[term], isEnglish)

    tokens.forEach(token => {
      if (token === 'summer') {
        // Summer is shown as a single merged option
        const value = `${year}:summer`
        result.push({ label: `${year} ${summerLabel}`, id: value, value })
      } else {
        const value = `${year}:P${token}`
        result.push({ label: `${termLabelPrefix} period ${token}`, id: value, value })
      }
    })
  })

  return result
}

/**
 *
 * @param kthPeriods array containing year:KTHPeriodLabel or year:summer, e.g. ['2025:P1', '2025:summer']
 * @returns array containing year:KTHPeriodLabel, e.g. ['2025:P1', '2025:P5', '2025:P0']
 */
export const convertSummerToPeriods = (kthPeriods: string[]) => {
  return kthPeriods.flatMap(period => {
    const summerString = 'summer'
    if (period.includes(summerString)) return [period.replace(summerString, 'P5'), period.replace(summerString, 'P0')]

    return [period]
  })
}
