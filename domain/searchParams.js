const querystring = require('querystring')
const i18n = require('../i18n')
const { formatLongTerm, getRelevantTerms, termConstants, _isSpringTerm } = require('./term')

const PREPARATORY_EDU_LEVEL = 'PREPARATORY'
const BASIC_EDU_LEVEL = 'BASIC'
const ADVANCED_EDU_LEVEL = 'ADVANCED'
const RESEARCH_EDU_LEVEL = 'RESEARCH'
const IN_ENGLISH_ONLY = 'onlyEnglish'
const ONLY_MHU = 'onlyMHU'
const SHOW_CANCELLED = 'showCancelled'
const CLIENT_SHOW_OPTIONS = [SHOW_CANCELLED, ONLY_MHU, IN_ENGLISH_ONLY]

function educationalLevel(levelNumberAsStr) {
  switch (levelNumberAsStr) {
    /**
     * Education preparing for university studies.
     */
    case '0':
      return PREPARATORY_EDU_LEVEL
    /**
     * Studies at university.
     */
    case '1':
      return BASIC_EDU_LEVEL
    /**
     * Doctoral studies.
     */
    case '2':
      return ADVANCED_EDU_LEVEL
    /**
     * Post-doc studies.
     */
    case '3':
      return RESEARCH_EDU_LEVEL
    default: {
      if (typeof levelNumberAsStr !== 'string')
        throw new Error(`Check the type of level: ${levelNumberAsStr} has the type ${typeof levelNumberAsStr}`)

      throw new Error(`Unknown education level number: ${levelNumberAsStr}. Allowed types: '0'-'3'`)
    }
  }
}

function getShowOptions(option) {
  // showOptions.map(opt => opt ? {})
  switch (option) {
    /**
     * Courses only in English
     */
    case IN_ENGLISH_ONLY:
      return 'in_english_only'
    /**
     * Behandlar miljö, miljöteknik eller hållbar utveckling
     */
    case ONLY_MHU:
      return 'only_mhu'
    /**
     * Nedlagd kurs
     */
    case SHOW_CANCELLED:
      return 'include_non_active'
    default: {
      if (typeof option !== 'string')
        throw new Error(`Check the type of option: ${option} has the type ${typeof option}`)
      throw new Error(
        `Unknown show options: ${option}. Allowed options: ${IN_ENGLISH_ONLY}, ${ONLY_MHU}, ${SHOW_CANCELLED}`
      )
    }
  }
}

function _summerTermsAndPeriods(year) {
  const summerSpring = `${year}${termConstants.SPRING_TERM_NUMBER}:${SUMMER_PERIOD_SPRING}`
  const summerAutumn = `${year}${termConstants.AUTUMN_TERM_NUMBER}:${SUMMER_PERIOD_AUTUMN}`
  return [summerSpring, summerAutumn]
}

function _getSummerPeriodsList(termString = '1900:summer') {
  const year = termString.substring(0, 4)
  return _summerTermsAndPeriods(year)
}

function _transformIfSummerOrEmptyPeriods(initialPeriods) {
  const transformedPeriods = []

  initialPeriods.forEach(p => {
    if (!p) return

    if (p.includes(':summer')) {
      const summerPeriodsList = _getSummerPeriodsList(p)
      summerPeriodsList.forEach(summerPeriod => transformedPeriods.push(summerPeriod))
    } else transformedPeriods.push(p)
  })
  return transformedPeriods
}

function _transformSearchParams(params) {
  const { eduLevel = [], pattern = '', showOptions = [], period = [], department = '' } = params
  const koppsFormatParams = {
    educational_level: eduLevel.map(level => educationalLevel(level)), // ['RESEARCH', 'ADVANCED'],
    flag: showOptions.map(opt => getShowOptions(opt)), // Example: flag: [only_mhu, in_english_only, include_non_active]
    term_period: _transformIfSummerOrEmptyPeriods(period), // ['2018:2']
  }
  if (pattern) koppsFormatParams.text_pattern = pattern
  if (department) koppsFormatParams.department_prefix = department

  return koppsFormatParams
}

function stringifyUrlParams(params) {
  return querystring.stringify(params)
}

function stringifyKoppsSearchParams(params) {
  const koppsFormatParams = _transformSearchParams(params)
  const paramsStr = stringifyUrlParams(koppsFormatParams)
  return paramsStr
}
const CLIENT_EDU_LEVELS = ['0', '1', '2', '3']

const eduLevelConfig = langIndex => {
  const { bigSearch } = i18n.messages[langIndex]

  return CLIENT_EDU_LEVELS.map(level => {
    const id = educationalLevel(level)
    const label = bigSearch[id]
    return { label, id, value: level }
  })
}

const showOptionsConfig = langIndex => {
  const { bigSearch } = i18n.messages[langIndex]

  return [IN_ENGLISH_ONLY, ONLY_MHU, SHOW_CANCELLED].map(option => {
    const label = bigSearch[option]

    return { label, id: option, value: option }
  })
}

/**
 * All periods in order in an array.
 */
// const ALL_PERIODS = { 'P0', 'P1', 'P2', 'P3', 'P4', 'P5' }
/**
 * Minimum possible period number.
 */
const MIN_PERIOD_NUMBER = 0
/**
 * Maximum possible period number.
 */
const MAX_PERIOD_NUMBER = 5

const AUTUMN_FIRST_PERIOD = 1
/**
 * Period number of 2nd autumn period.
 */
const AUTUMN_SECOND_PERIOD = 2
/**
 * Period number of first spring period.
 */
const SPRING_FIRST_PERIOD = 3
/**
 * Period number of 2nd autumn period.
 */
const SPRING_SECOND_PERIOD = 4
/**
 * Period number of spring summer period.
 */
const SUMMER_PERIOD_SPRING = 5
/**
 * Period number of autumn summer period.
 */
const SUMMER_PERIOD_AUTUMN = 0

const groupedPeriodsInCorrectOrder = {
  spring: [SPRING_FIRST_PERIOD, SPRING_SECOND_PERIOD],
  summerGroup: [SUMMER_PERIOD_SPRING, SUMMER_PERIOD_AUTUMN],
  autumn: [AUTUMN_FIRST_PERIOD, AUTUMN_SECOND_PERIOD],
}

function _separateYearAndPeriod(relevantTerms) {
  return relevantTerms.map(term => ({
    year: term.toString().substring(0, 4),
    termNumber: term.toString().substring(4),
  }))
  /* Example: 
    [{ year: '2021', termNumber: '1'},
    { year: '2021', termNumber: '2'},
    { year: '2022', termNumber: '1'}] 
  */
}

function _combineTermsByYear(arrWithYearsAndPeriod) {
  const groupedTerms = { current: {}, next: {} }

  arrWithYearsAndPeriod.forEach(({ year, termNumber }, index) => {
    if (index === 0) {
      groupedTerms.current = { year, terms: [termNumber] } // fullTerms: [fullTerm]
    } else if (year === groupedTerms.current.year) {
      groupedTerms.current.terms.push(termNumber)
    } else if (!groupedTerms.next.year) groupedTerms.next = { year, terms: [termNumber] }
    else groupedTerms.next.terms.push(termNumber)
  })
  /* result example:
    {
      current: { year: '2021', terms: [ '1', '2' ] },
      next: { year: '2022', terms: [ '1' ] }
    }
  */
  return groupedTerms
}

function _periodConfigForOneYear({ year, terms }, langIndex) {
  const hasOnlyOneTerm = !!terms.length === 1

  const { summer: summerLabel } = i18n.messages[langIndex].bigSearch
  const { spring: springPeriods, summerGroup, autumn: autumnPeriods } = groupedPeriodsInCorrectOrder

  let periodsForThisTerm = []

  const language = langIndex === 0 ? 'en' : 'sv'
  const resultPeriodsConfig = []
  terms.forEach(term => {
    if (hasOnlyOneTerm)
      periodsForThisTerm = _isSpringTerm(term)
        ? [...springPeriods, [summerGroup[0]]]
        : [[summerGroup[1]], ...autumnPeriods]
    else periodsForThisTerm = _isSpringTerm(term) ? [...springPeriods, summerGroup] : [...autumnPeriods]

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
      const value = `${year}${term}:${periodNum}`
      const label = `${formatLongTerm(`${year}${term}`, language)} period ${periodNum}`
      return resultPeriodsConfig.push({ label, id: value, value })
    })
  })

  return resultPeriodsConfig
}

function _periodConfigByYearType(yearType, langIndex) {
  const relevantTerms = getRelevantTerms(2)
  const yearsAndPeriod = _separateYearAndPeriod(relevantTerms)
  const { current, next } = _combineTermsByYear(yearsAndPeriod)
  switch (yearType) {
    case 'currentYear':
      return _periodConfigForOneYear(current, langIndex)
    case 'nextYear':
      return _periodConfigForOneYear(next, langIndex)
    default:
      throw new Error(`Unknown yearType: ${yearType}. Allowed values: currentYear and nextYear`)
  }
}

function getParamConfig(paramName, langIndex) {
  switch (paramName) {
    case 'eduLevel':
      return eduLevelConfig(langIndex)
    case 'currentYear':
      return _periodConfigByYearType('currentYear', langIndex)
    case 'nextYear':
      return _periodConfigByYearType('nextYear', langIndex)
    case 'showOptions':
      return showOptionsConfig(langIndex)
    default: {
      if (typeof paramName !== 'string')
        throw new Error(`Check the type of parameter name: ${paramName} has the type ${typeof paramName}`)
      throw new Error(
        `Unknown search options: ${paramName}. Allowed options: eduLevel, showOptions, currentYear, nextYear`
      )
    }
  }
}

module.exports = {
  educationalLevel,
  getParamConfig,
  stringifyKoppsSearchParams,
  stringifyUrlParams,
  CLIENT_EDU_LEVELS,
  CLIENT_SHOW_OPTIONS,
}
