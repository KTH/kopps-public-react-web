const { EducationalLevelCode } = require('@kth/om-kursen-ladok-client')

const LEVEL_MAP = {
  [EducationalLevelCode.Preparatory]: 'PREPARATORY',
  [EducationalLevelCode.Basic]: 'BASIC',
  [EducationalLevelCode.Advanced]: 'ADVANCED',
  [EducationalLevelCode.Research]: 'RESEARCH',
}

const CLIENT_EDU_LEVELS = Object.values(EducationalLevelCode)

function educationalLevel(levelCode) {
  if (typeof levelCode !== 'string') {
    throw new Error(`Invalid type for education level code: ${levelCode} (type: ${typeof levelCode})`)
  }

  const level = LEVEL_MAP[levelCode]

  if (!level) {
    throw new Error(
      `Unknown education level number: ${levelCode}. Allowed types: ${Object.values(EducationalLevelCode).join(' , ')}]`
    )
  }

  return level
}

module.exports = {
  CLIENT_EDU_LEVELS,
  educationalLevel,
}
