import i18n from '../../../../i18n'

function getHelpText(langIndex, nameOfInstruction, instructionKeys) {
  /**
   * Retrieves a list of translated instructional texts based on the given language index,
   * the name of the instruction set, and the specific instruction keys.
   */

  const messages = i18n.messages[langIndex]
  const instructions = messages[nameOfInstruction]
  // instructions is an object containing all the instructions for the specified language and instruction set.

  const instructionsTexts = instructionKeys.map(s => instructions[s])
  // instructionsTexts is the list of translated instructions based on the provided instructionKeys.

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
