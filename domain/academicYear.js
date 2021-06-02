const { getNextTerm, splitTerm, add } = require('./term')

function calculate(startTerm, studyYear) {
  return add(startTerm, studyYear - 1)
}

function format(startTerm) {
  const [startYear] = splitTerm(startTerm)
  const endTerm = getNextTerm(startTerm)
  const [endYear] = splitTerm(endTerm)
  return `${startYear}/${endYear}`
}

module.exports = {
  calculate,
  format,
}
