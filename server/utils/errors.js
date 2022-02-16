const log = require('@kth/log')

function setErrorKoppsCallingUri(uri) {
  const error = new Error(`Failed KOPPS calling ${uri}`)
  log.debug(error)
  return error
}

function setErrorInProgramVersion() {
  const error = new Error('Exception calling KOPPS API in koppsApi.getStudyProgrammeVersion')
  log.debug(error)
  return error
}
module.exports = {
  setErrorInProgramVersion,
  setErrorKoppsCallingUri,
}
