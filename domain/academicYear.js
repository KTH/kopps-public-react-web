const { getNextTerm, splitTerm, add } = require('./term')

function calculateStartTerm(startTerm, studyYear) {
  return add(startTerm, studyYear - 1)
}
function academicYearStartAndEnd(startTerm) {
  const [startYear] = splitTerm(startTerm)

  const endTerm = getNextTerm(startTerm)
  const [endYear] = splitTerm(endTerm)

  return { startYear, endYear }
}

function formatAcademicYear(startTerm) {
  const { startYear, endYear } = academicYearStartAndEnd(startTerm)
  return `${startYear}/${endYear}`
}

module.exports = {
  academicYearStartAndEnd,
  calculateStartTerm,
  formatAcademicYear,
}
