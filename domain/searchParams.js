const querystring = require('querystring')
const i18n = require('../i18n')

const PREPARATORY_EDU_LEVEL = 'PREPARATORY'
const BASIC_EDU_LEVEL = 'BASIC'
const ADVANCED_EDU_LEVEL = 'ADVANCED'
const RESEARCH_EDU_LEVEL = 'RESEARCH'

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
        throw new Error(`Check the type of level: ${levelNumberAsStr} has the type ${typeof $levelNumberAsStr}`)

      throw new Error(`Unknown education level number: ${levelNumberAsStr}`)
    }
  }
}

function checkOptions(options) {
  // showOptions.map(opt => opt ? {})
  // switch (option) {
  //   /**
  //    * Education preparing for university studies.
  //    */
  //   case 'onlyEnglish':
  //     return params
  //   /**
  //    * Studies at university.
  //    */
  //   case '1':
  //     return 'BASIC'
  //   /**
  //    * Doctoral studies.
  //    */
  //   case '2':
  //     return 'ADVANCED'
  //   /**
  //    * Post-doc studies.
  //    */
  //   case '3':
  //     return 'RESEARCH'
  //   default: {
  //     if (typeof levelNumberAsStr !== 'string')
  //       throw new Error(`Check the type of level: ${levelNumberAsStr} has the type ${typeof $levelNumberAsStr}`)
  //     throw new Error(`Unknown education level number: ${levelNumberAsStr}`)
  //   }
  // }
}

// static final String IN_ENGLISH_ONLY = "onlyEnglish";
// static final String ONLY_MHU = "onlyMHU";
// static final String SHOW_CANCELLED = "showCancelled";

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
  const { eduLevel = [], pattern = '' } = params
  const koppsFormatParams = {
    text_pattern: pattern,
    educational_level: eduLevel.map(level => educationalLevel(level)), //['RESEARCH', 'ADVANCED'],
    // only_mhu:
    // in_english_only:
    // include_non_active
    // term_period
    // department_prefix
  }
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

function transformQueryToObject(query) {
  return querystring.parse(query)
}

module.exports = {
  educationalLevel,
  getHelpText,
  transformQueryToObject,
  stringifyKoppsSearchParams,
  stringifyUrlParams,
}
