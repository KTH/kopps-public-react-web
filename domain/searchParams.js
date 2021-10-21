const querystring = require('querystring')
const i18n = require('../i18n')
const { formatLongTerm, getRelevantTerms, _isSpringTerm } = require('./term')
const { getSummerPeriodsList, groupedPeriodsBySeasonInCorrectOrder } = require('./periods')
const { CLIENT_EDU_LEVELS, educationalLevel } = require('./eduLevels')
const { CLIENT_SHOW_OPTIONS, getShowOptions } = require('./courseOptions')

function _transformIfSummerOrEmptyPeriods(initialPeriods) {
  const transformedPeriods = []

  initialPeriods.forEach(p => {
    if (!p) return

    if (p.includes(':summer')) {
      const summerPeriodsList = getSummerPeriodsList(p)
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

  return CLIENT_SHOW_OPTIONS.map(option => {
    const label = bigSearch[option]

    return { label, id: option, value: option }
  })
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
  const { spring: springPeriods, summerGroup, autumn: autumnPeriods } = groupedPeriodsBySeasonInCorrectOrder

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
  getParamConfig,
  stringifyKoppsSearchParams,
  stringifyUrlParams,
}
