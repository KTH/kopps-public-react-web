const OLD_PROGRAMME_TYPES = ['1993PRG']
function isOldProgramme(programType) {
  return OLD_PROGRAMME_TYPES.includes(programType)
}
module.exports = {
  OLD_PROGRAMME_TYPES,
  isOldProgramme,
}
