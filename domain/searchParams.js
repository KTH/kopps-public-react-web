const querystring = require('querystring')
const i18n = require('../i18n')

const PREPARATORY_EDU_LEVEL = 'PREPARATORY'
const BASIC_EDU_LEVEL = 'BASIC'
const ADVANCED_EDU_LEVEL = 'ADVANCED'
const RESEARCH_EDU_LEVEL = 'RESEARCH'
const IN_ENGLISH_ONLY = 'onlyEnglish'
const ONLY_MHU = 'onlyMHU'
const SHOW_CANCELLED = 'showCancelled'

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
function separateOptions(optionsArr) {
  const optionsObject = {}
  optionsArr.forEach(opt => (optionsObject[getShowOptions(opt)] = true))

  return optionsObject
}

// private static final Set<String> ALLOWED_SHOW_OPTIONS = new HashSet<>(Arrays.asList(IN_ENGLISH_ONLY, ONLY_MHU, SHOW_CANCELLED));
// private static final Pattern TERM_PERIOD_PATTERN = Pattern.compile("\\d{5}:(\\d|summer)");
// private static final Pattern EDU_LEVEL_PATTERN = Pattern.compile("\\d");
// private static final Pattern DEPARTMENT_CODE_PATTERN = Pattern.compile("[A-Za-zÅÄÖåäö]{1,4}");
// public static final String PERIOD_PARAM = "period";
// public static final String EDU_LEVEL_PARAM = "eduLevel";
// public static final String DEPARTMENT_PARAM = "department";
// public static final String PATTERN_PARAM = "pattern";
// public static final String SHOW_OPTIONS_PARAM = "showOptions";

// private String pattern;
// private Set<String> termPeriods = new HashSet<>();
// private Set<String> showOptions = new HashSet<>();
// private Set<String> eduLevel = new HashSet<>();
// private String departmentCode;
// private boolean constructedFromOldStyleQueryParams;

function _transformSearchParams(params) {
  const { eduLevel = [], pattern = '', showOptions = [] } = params
  const separatedOptions = separateOptions(showOptions)
  const koppsFormatParams = {
    text_pattern: pattern,
    educational_level: eduLevel.map(level => educationalLevel(level)), //['RESEARCH', 'ADVANCED'],
    ...separatedOptions, // Example: {only_mhu: true}, {in_english_only: true}, {include_non_active: true}
    // term_period
    // department_prefix
  }
  console.log('transformed Kopps_ ', koppsFormatParams)
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

function getHelpText(langIndex) {
  const { searchInstructions } = i18n.messages[langIndex]

  return [
    'search_help_1',
    'search_help_2',
    'search_help_3',
    'search_help_4',
    'search_help_5',
    'search_help_7',
    'search_help_8',
    'search_help_9',
  ].map(s => searchInstructions[s])
}

const eduLevelConfig = langIndex => {
  const { bigSearch } = i18n.messages[langIndex]

  return ['0', '1', '2', '3'].map(level => {
    const id = educationalLevel(level)
    const label = bigSearch[id]
    return { label, id, value: level }
  })
}

const showOptionsConfig = langIndex => {
  const { bigSearch } = i18n.messages[langIndex]

  return [IN_ENGLISH_ONLY, ONLY_MHU, SHOW_CANCELLED].map(option => {
    const label = bigSearch[option]
    console.log('showOptionsConfig', { label, id: option, value: option })

    return { label, id: option, value: option }
  })
}

function getParamConfig(paramName, langIndex) {
  switch (paramName) {
    case 'eduLevel':
      return eduLevelConfig(langIndex)
    case 'showOptions':
      return showOptionsConfig(langIndex)
    default: {
      if (typeof paramName !== 'string')
        throw new Error(`Check the type of parameter name: ${paramName} has the type ${typeof paramName}`)
      throw new Error(`Unknown show options: ${paramName}. Allowed options: eduLevel, showOptions`)
    }
  }
}

module.exports = {
  educationalLevel,
  getParamConfig,
  getHelpText,
  stringifyKoppsSearchParams,
  stringifyUrlParams,
}
