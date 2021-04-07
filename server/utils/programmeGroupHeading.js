const _programmeGroupHeading = {
  TARKU: 'TARKU',
  CING: 'CING',
  YHOGE: 'YHOGE',
  GKAND: 'GKAND',
  HOGSK: 'HOGSK',
  TMAST: 'TMAST',
  GMAGB: 'GMAGB',
  TBAS: 'TBAS',
  OVRIGA: 'OVRIGA',
  default: 'OVRIGA',
}

const preparatoryEducationalLevel = 'PREPARATORY'

function _find(programme, degree = {}) {
  if (degree.code) {
    return _programmeGroupHeading[degree.code] ? _programmeGroupHeading[degree.code] : _programmeGroupHeading.default
  }
  if (programme.educationalLevel === preparatoryEducationalLevel) {
    return _programmeGroupHeading.TBAS
  }
  return _programmeGroupHeading.default
}

module.exports = {
  preparatoryEducationalLevel,
  _programmeGroupHeading,
  find: _find,
}
