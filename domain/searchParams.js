const querystring = require('querystring')

function educationalLevel(levelNumberAsStr) {
  switch (levelNumberAsStr) {
    /**
     * Education preparing for university studies.
     */
    case '0':
      return 'PREPARATORY'
    /**
     * Studies at university.
     */
    case '1':
      return 'BASIC'
    /**
     * Doctoral studies.
     */
    case '2':
      return 'ADVANCED'
    /**
     * Post-doc studies.
     */
    case '3':
      return 'RESEARCH'
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
  const { eduLevels = [], pattern = '' } = params
  const koppsFormatParams = {
    text_pattern: pattern,
    educational_level: eduLevels.map(level => educationalLevel(level)), //['RESEARCH', 'ADVANCED'],
    // only_mhu:
    // in_english_only:
    // include_non_active
    // term_period
    // department_prefix
  }
  console.log('koppsFormatParams', koppsFormatParams)
  return koppsFormatParams
}

function stringifyKoppsSearchParams(params) {
  const koppsFormatParams = _transformSearchParams(params)
  const paramsStr = querystring.stringify(koppsFormatParams)
  console.log('paramsStr', paramsStr)
  return paramsStr
}

module.exports = { educationalLevel, stringifyKoppsSearchParams }
