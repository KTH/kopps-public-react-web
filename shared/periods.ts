import { termConstants } from './term'

const KthPeriod = {
  P0: 0,
  P1: 1,
  P2: 2,
  P3: 3,
  P4: 4,
  P5: 5,
}

export const ALL_PERIODS = [KthPeriod.P0, KthPeriod.P1, KthPeriod.P2, KthPeriod.P3, KthPeriod.P4, KthPeriod.P5]

export const ORDINARY_PERIODS = [KthPeriod.P1, KthPeriod.P2, KthPeriod.P3, KthPeriod.P4]

const AUTUMN_FIRST_PERIOD = KthPeriod.P1
/**
 * Period number of 2nd autumn period.
 */
const AUTUMN_SECOND_PERIOD = KthPeriod.P2
/**
 * Period number of first spring period.
 */
const SPRING_FIRST_PERIOD = KthPeriod.P3
/**
 * Period number of 2nd autumn period.
 */
const SPRING_SECOND_PERIOD = KthPeriod.P4
/**
 * Period number of spring summer period.
 */
const SUMMER_PERIOD_SPRING = KthPeriod.P5
/**
 * Period number of autumn summer period.
 */
const SUMMER_PERIOD_AUTUMN = KthPeriod.P0

export const groupedPeriodsBySeasonInCorrectOrder = {
  spring: [SPRING_FIRST_PERIOD, SPRING_SECOND_PERIOD],
  summerGroup: [SUMMER_PERIOD_SPRING, SUMMER_PERIOD_AUTUMN],
  autumn: [AUTUMN_FIRST_PERIOD, AUTUMN_SECOND_PERIOD],
}

const summerTermsAndPeriods = (year: string | number) => {
  const summerSpring = `${year}${termConstants.SPRING_TERM_NUMBER}:${SUMMER_PERIOD_SPRING}`
  const summerAutumn = `${year}${termConstants.AUTUMN_TERM_NUMBER}:${SUMMER_PERIOD_AUTUMN}`
  return [summerSpring, summerAutumn]
}
