const { server: serverConfig } = require('../configuration')

/**
 * Middleware that adds "noindex" robots header if server host and the host
 * used for the request doesn't match. This is done to prevent Google from
 * indexing app.kth.se/[...] when we want the user to use www.kth.se/[...]
 *
 * The "server host" (SERVER_HOST_URL) is the primary host we expected the
 * app to be hosted on (ie https://www.kth.se) and the "forwarded host" is
 * the host actually used.
 *
 * The request host is *.azurewebsites.net when reaching our app in our
 * hosting envirnment, so we look at forwarded host ('x-forwarded-host')
 * to get the original host.
 *
 * TODO(karl): Vad ska vara default om x-forwarded-host in är satt?
 */
module.exports = function (req, res, next) {
  const forwardedHost = req.header('x-forwarded-host')
  if (forwardedHost) {
    const serverHostUrl = new URL(serverConfig.hostUrl)
    const serverHost = serverHostUrl.host
    if (serverHost !== forwardedHost) {
      res.set('x-robots-tag', 'noindex')
    }
  }
  next()
}
