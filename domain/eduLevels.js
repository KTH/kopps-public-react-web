// const { termConstants } = require('./term')

const PREPARATORY_EDU_LEVEL = 'PREPARATORY'
const BASIC_EDU_LEVEL = 'BASIC'
const ADVANCED_EDU_LEVEL = 'ADVANCED'
const RESEARCH_EDU_LEVEL = 'RESEARCH'

const CLIENT_EDU_LEVELS = ['0', '1', '2', '3']

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

const translateEducationalLevelType = ladok => {
  switch (ladok) {
    case 'FUPKURS':
      return PREPARATORY_EDU_LEVEL
    case '2007GKURS':
      return BASIC_EDU_LEVEL
    case '2007AKURS':
      return ADVANCED_EDU_LEVEL
    case '2007FKURS':
      return RESEARCH_EDU_LEVEL
    default:
      return ''
  }
}

module.exports = {
  CLIENT_EDU_LEVELS,
  educationalLevel,
  translateEducationalLevelType,
}
