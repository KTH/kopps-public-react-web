const log = require('@kth/log')

function setErrorKoppsCallingUri(uri, statusCode) {
  const error = new Error(`Failed KOPPS calling ${uri}, error ${statusCode}`)
  log.error(error)
  return error
}

function setErrorInProgramVersion() {
  const error = new Error('Exception calling KOPPS API in koppsApi.getStudyProgrammeVersion')
  log.error(error)
  return error
}
module.exports = {
  setErrorInProgramVersion,
  setErrorKoppsCallingUri,
}
