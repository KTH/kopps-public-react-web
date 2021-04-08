const programmeGroupHeadings = ['TARKU', 'CING', 'YHOGE', 'GKAND', 'HOGSK', 'TMAST', 'GMAGB', 'TBAS', 'OVRIGA']
const defaultProgrammeGroupHeading = 'OVRIGA'
const preparatoryEducationalLevel = 'PREPARATORY'
const preparatoryProgrammeGroupHeading = 'TBAS'

function find(programme, degree = {}) {
  if (degree.code) {
    return programmeGroupHeadings.includes(degree.code) ? degree.code : defaultProgrammeGroupHeading
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
  find,
}
