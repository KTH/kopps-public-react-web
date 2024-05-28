const IN_ENGLISH_ONLY = 'onlyEnglish'
const ONLY_MHU = 'onlyMHU'
const SHOW_CANCELLED = 'showCancelled'
const CLIENT_SHOW_OPTIONS = [IN_ENGLISH_ONLY, ONLY_MHU, SHOW_CANCELLED]

function getShowOptions(option) {
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

module.exports = {
  CLIENT_SHOW_OPTIONS,
  ONLY_MHU,
  getShowOptions,
}
