const EDUCATION_LEVEL_MAP = {
  FUPKURS: 'PREPARATORY',
  '2007GKURS': 'BASIC',
  '2007AKURS': 'ADVANCED',
  '2007FKURS': 'RESEARCH',
}

const CLIENT_EDU_LEVELS = Object.keys(EDUCATION_LEVEL_MAP)

function educationalLevel(levelCode) {
  if (typeof levelCode !== 'string') {
    throw new Error(`Invalid type for education level code: ${levelCode} (type: ${typeof levelCode})`)
  }

  const level = EDUCATION_LEVEL_MAP[levelCode]

  if (!level) {
    throw new Error(`Unknown education level code: ${levelCode}. Allowed values: ${CLIENT_EDU_LEVELS.join(', ')}`)
  }

  return level
}

module.exports = {
  CLIENT_EDU_LEVELS,
  educationalLevel,
}
