const convertToLadokSearchParams = ({ pattern }) => {
  return {
    kodEllerBenamning: pattern,
  }
}
// eduLevel -> educationalLevel

module.exports = {
  convertToLadokSearchParams,
}
