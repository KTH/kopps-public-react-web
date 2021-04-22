const _deprecatedSchools = {
  sv: [
    'Datavetenskap och kommunikation',
    'Elektro- och systemteknik',
    'Informations- och kommunikationsteknik',
    'Kemivetenskap',
    'Teknik och hälsa',
    'Teknikvetenskaplig kommunikation och lärande',
  ],
  en: [
    'Chemical Science and Engineering',
    'Computer Science and Communication',
    'Education and Communication in Engineering Science',
    'Electrical Engineering',
    'Information and Communication Technology',
    'Technology and Health',
  ],
}

function _compareSchools(a, b) {
  if (a.name < b.name) {
    return -1
  }
  if (a.name > b.name) {
    return 1
  }
  return 0
}

function _filterOutDeprecatedSchools(schoolsWithDepartments, lang) {
  const deprecatedSchoolsWithDepartments = schoolsWithDepartments.filter(school =>
    _deprecatedSchools[lang].includes(school.name)
  )
  const currentSchoolsWithDepartments = schoolsWithDepartments.filter(
    school => !_deprecatedSchools[lang].includes(school.name)
  )
  return {
    deprecatedSchoolsWithDepartments,
    currentSchoolsWithDepartments,
  }
}

module.exports = {
  deprecatedSchools: _deprecatedSchools,
  compareSchools: _compareSchools,
  filterOutDeprecatedSchools: _filterOutDeprecatedSchools,
}
