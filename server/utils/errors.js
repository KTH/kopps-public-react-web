function setErrorInProgramVersion(applicationStore, statusCode) {
  const error = new Error('Exception calling KOPPS API in koppsApi.getStudyProgrammeVersion')
  error.statusCode = statusCode
  throw error
}
module.exports = {
  setErrorInProgramVersion,
}
