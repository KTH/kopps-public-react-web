export const OLD_PROGRAMME_TYPES = ['1993PRG']

export function isOldProgramme(programType) {
  return OLD_PROGRAMME_TYPES.includes(programType)
}
