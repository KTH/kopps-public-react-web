const programmeGroupHeadings = ['TARKU', 'CING', 'YHOGE', 'GKAND', 'HOGSK', 'TMAST', 'GMAGB', 'TBAS', 'OVRIGA']
const defaultProgrammeGroupHeading = 'OVRIGA'
const preparatoryEducationalLevel = 'PREPARATORY'
const preparatoryProgrammeGroupHeading = 'TBAS'

function findProgrammeGroupHeading(programme, degree = {}) {
  if (programmeGroupHeadings.includes(degree.code)) {
    return degree.code
  }
  if (programme.educationalLevel === preparatoryEducationalLevel) {
    return preparatoryProgrammeGroupHeading
  }
  return defaultProgrammeGroupHeading
}

module.exports = {
  programmeGroupHeadings,
  defaultProgrammeGroupHeading,
  preparatoryEducationalLevel,
  findProgrammeGroupHeading,
}
