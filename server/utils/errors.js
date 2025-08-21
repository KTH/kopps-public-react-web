const log = require('@kth/log')

function setErrorKoppsCallingUri(uri, statusCode) {
  const error = new Error(`Failed KOPPS calling ${uri}, error ${statusCode}`)
  log.error(error)
  return error
}

module.exports = {
  setErrorKoppsCallingUri,
}
