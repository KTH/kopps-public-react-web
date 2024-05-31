import i18n from '../../../../i18n'

function getHelpText(langIndex, nameOfInstruction, instructionKeys) {
  const messages = i18n.messages[langIndex]
  const instructions = messages[nameOfInstruction]

  const instructionsTexts = instructionKeys.map(s => instructions[s])

  return instructionsTexts
}

function hasValue(param) {
  if (!param || param === null || param === '') return false
  if (typeof param === 'object' && param.length === 0) return false
  if (typeof param === 'string' && param.trim().length === 0) return false
  return true
}

function openOptionsInCollapse(hasChosenOptions) {
  if (Object.values(hasChosenOptions).length === 0) return false
  return true
}

export { getHelpText, hasValue, openOptionsInCollapse }
