import i18n from '../../../../i18n'
import { GetHelpText } from './types/SearchHelperTypes'

export const getHelpText: GetHelpText = (langIndex, nameOfInstruction, instructionKeys) => {
  /**
   * Retrieves a list of translated instructional texts based on the given language index,
   * the name of the instruction set, and the specific instruction keys.
   */

  const messages = i18n.messages[langIndex]
  const instructions = messages[nameOfInstruction] as Record<string, string>
  // instructions is an object containing all the instructions for the specified language and instruction set.

  const instructionsTexts = instructionKeys.map(key => instructions[key])
  // instructionsTexts is the list of translated instructions based on the provided instructionKeys.

  return instructionsTexts
}
