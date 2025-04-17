const PREPARATORY_EDU_LEVEL = 'PREPARATORY'
const BASIC_EDU_LEVEL = 'BASIC'
const ADVANCED_EDU_LEVEL = 'ADVANCED'
const RESEARCH_EDU_LEVEL = 'RESEARCH'

const CLIENT_EDU_LEVELS = ['FUPKURS', '2007GKURS', '2007AKURS', '2007FKURS']

const EDUCATION_LEVEL_MAP = {
  FUPKURS: PREPARATORY_EDU_LEVEL, // Education preparing for university studies
  '2007GKURS': BASIC_EDU_LEVEL, // Studies at university
  '2007AKURS': ADVANCED_EDU_LEVEL, // Doctoral studies
  '2007FKURS': RESEARCH_EDU_LEVEL, // Post-doc studies
}

function educationalLevel(levelCode) {
  if (typeof levelCode !== 'string') {
    throw new Error(`Invalid type for education level code: ${levelCode} (type: ${typeof levelCode})`)
  }

  const level = EDUCATION_LEVEL_MAP[levelCode]

  if (!level) {
    throw new Error(
      `Unknown education level code: ${levelCode}. Allowed values: ${Object.keys(EDUCATION_LEVEL_MAP).join(', ')}`
    )
  }

  return level
}

module.exports = {
  CLIENT_EDU_LEVELS,
  educationalLevel,
}
