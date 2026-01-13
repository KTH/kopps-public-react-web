const querystring = require('querystring')
const i18n = require('../i18n')
const { getRelevantTerms } = require('./term')
const { CLIENT_EDU_LEVELS, educationalLevel } = require('./eduLevels')
const { CLIENT_SHOW_OPTIONS, ONLY_MHU, getShowOptions } = require('./courseOptions')
const { periodConfigForOneYear } = require('kopps-public-react-web/shared/periodSearchUtils')
const { isEnglishLangIndex } = require('kopps-public-react-web/shared/languageUtil')

function _transformSearchParams(params) {
  const { eduLevel = [], pattern = '', showOptions = [], department = '' } = params
  const formatParams = {
    educational_level: eduLevel.map(level => educationalLevel(level)), // ['RESEARCH', 'ADVANCED'],
    flag: showOptions.map(opt => getShowOptions(opt)), // Example: flag: [only_mhu, in_english_only, include_non_active]
  }
  if (pattern) formatParams.text_pattern = pattern
  if (department) formatParams.department_prefix = department

  return formatParams
}

function stringifyUrlParams(params) {
  return querystring.stringify(params)
}

function stringifySearchParams(params) {
  const formatParams = _transformSearchParams(params)
  const paramsStr = stringifyUrlParams(formatParams)
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

const onlyMHUConfig = langIndex => {
  const { bigSearch } = i18n.messages[langIndex]

  const label = bigSearch[ONLY_MHU]

  return [{ label, id: ONLY_MHU, value: ONLY_MHU }]
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

function _periodConfigByYearType(yearType, langIndex) {
  const { summer: summerLabel } = i18n.messages[langIndex].bigSearch
  const semesterLabel = i18n.messages[langIndex].messages.semester
  const config = {
    isEnglish: isEnglishLangIndex(langIndex),
    summerLabel,
    semesterLabel,
  }

  const relevantTerms = getRelevantTerms(2)
  const yearsAndPeriod = _separateYearAndPeriod(relevantTerms)
  const { current, next } = _combineTermsByYear(yearsAndPeriod)
  switch (yearType) {
    case 'currentYear':
      return periodConfigForOneYear(current, config)
    case 'nextYear':
      return periodConfigForOneYear(next, config)
    default:
      throw new Error(`Unknown yearType: ${yearType}. Allowed values: currentYear and nextYear`)
  }
}

function _semestersConfig(langIndex) {
  const { messages } = i18n.messages[langIndex]
  const { semester } = messages
  const relevantTerms = getRelevantTerms(2)
  const yearsAndPeriod = _separateYearAndPeriod(relevantTerms)
  const resultSemestersConfig = []
  yearsAndPeriod.forEach(({ year, termNumber }) => {
    const label = `${semester[termNumber]} ${year}`
    const value = `${termNumber === '1' ? 'VT' : 'HT'}${year}`
    resultSemestersConfig.push({
      label,
      id: value,
      value,
    })
  })
  return resultSemestersConfig
}

function getParamConfig(paramName, langIndex) {
  switch (paramName) {
    case 'eduLevel':
      return eduLevelConfig(langIndex)
    case 'currentYear':
      return _periodConfigByYearType('currentYear', langIndex, true)
    case 'nextYear':
      return _periodConfigByYearType('nextYear', langIndex, true)
    case 'semesters':
      return _semestersConfig(langIndex)
    case 'showOptions':
      return showOptionsConfig(langIndex)
    case 'onlyMHU':
      return onlyMHUConfig(langIndex)
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
  stringifySearchParams,
  stringifyUrlParams,
}
