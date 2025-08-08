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

  const { spring: springPeriods, summerGroup, autumn: autumnPeriods } = groupedPeriodsBySeasonInCorrectOrder

  let periodsForThisTerm = []

  const resultPeriodsConfig = []
  terms.forEach(term => {
    if (hasOnlyOneSemester)
      periodsForThisTerm = isSpringTerm(term)
        ? [...springPeriods, [summerGroup[0]]]
        : [[summerGroup[1]], ...autumnPeriods]
    else periodsForThisTerm = isSpringTerm(term) ? [...springPeriods, summerGroup] : [...autumnPeriods]

    periodsForThisTerm.forEach(periodNum => {
      if (typeof periodNum === 'object') {
        // summer has two periods, but in search it shown as summer with merged results for both
        const value = `${year}:summer`
        const label = `${year} ${summerLabel}`
        return resultPeriodsConfig.push({
          label,
          id: value,
          value,
        })
      }
      // const value = `${term == 2 ? 'HT' : 'VT'}${year}:${periodNum}`
      const value = `${year}:P${periodNum}`
      const label = `${formatLongTerm(`${year}${term}`, semesterLabel[term], isEnglish)} period ${periodNum}`
      return resultPeriodsConfig.push({ label, id: value, value })
    })
  })

  return resultPeriodsConfig
}

export const createPeriodConfigForOneYear = () => {}

// export const periodConfigByYearType = (yearType, langIndex) => {
//   const relevantTerms = getRelevantTerms(2)
//   const yearsAndPeriod = _separateYearAndPeriod(relevantTerms)
//   const { current, next } = _combineTermsByYear(yearsAndPeriod)
//   switch (yearType) {
//     case 'currentYear':
//       return periodConfigForOneYear(current, langIndex)
//     case 'nextYear':
//       return periodConfigForOneYear(next, langIndex)
//     default:
//       throw new Error(`Unknown yearType: ${yearType}. Allowed values: currentYear and nextYear`)
//   }
// }
