const programmeGroupHeadings = {
  TARKU: 'TARKU',
  CING: 'CING',
  YHOGE: 'YHOGE',
  GKAND: 'GKAND',
  HOGSK: 'HOGSK',
  TMAST: 'TMAST',
  GMAGB: 'GMAGB',
  TBAS: 'TBAS',
  OVRIGA: 'OVRIGA',
}
const defaultProgrammeGroupHeading = 'OVRIGA'

const preparatoryEducationalLevel = 'PREPARATORY'

function find(programme, degree = {}) {
  if (degree.code) {
    return programmeGroupHeadings[degree.code] ? programmeGroupHeadings[degree.code] : defaultProgrammeGroupHeading
  }
  if (programme.educationalLevel === preparatoryEducationalLevel) {
    return programmeGroupHeadings.TBAS
  }
  return defaultProgrammeGroupHeading
}

module.exports = {
  programmeGroupHeadings,
  defaultProgrammeGroupHeading,
  preparatoryEducationalLevel,
  find,
}
