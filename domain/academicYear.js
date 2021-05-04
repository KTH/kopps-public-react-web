const { getNextTerm, splitTerm } = require('./term')

function format(startTerm) {
  const [startYear] = splitTerm(startTerm)
  const endTerm = getNextTerm(startTerm)
  const [endYear] = splitTerm(endTerm)
  return `${startYear}/${endYear}`
}

module.exports = {
  format,
}
