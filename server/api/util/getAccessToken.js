const log = require('@kth/log')

const GRANT_TYPE = 'client_credentials'
const CONTENT_TYPE = 'application/x-www-form-urlencoded'

const JWT_PAYLOAD_INDEX = 1

// token attribute to store to avoid recalling authentication call if it's not expired
let token = null

/**
 * @returns false if there is a currently valid token. True otherwise.
 */
const isTokenExpired = () => {
  if (token) {
    const expirationTimestamp = getExpirationTimestamp(token)
    const expirationDate = new Date(expirationTimestamp * 1000)
    log.debug(
      `Token expiring at ${expirationDate.toISOString()}, i.e. in ${expirationTimestamp - getCurrentTimestampInSeconds()}s`
    )

    return getCurrentTimestampInSeconds() > getExpirationTimestamp(token)
  }

  return true
}

const getCurrentTimestampInSeconds = () => {
  return Math.floor(Date.now() / 1000)
}

/**
 * Decodes and returns the payload of the given JWT as JSON object according to https://jwt.io/
 * @param {string} accessToken
 * @returns JSON representation of the JWT's payload
 */
const decodeJWTokenPayload = accessToken => {
  const tokenParts = accessToken.split('.')
  return JSON.parse(Buffer.from(tokenParts[JWT_PAYLOAD_INDEX], 'base64').toString())
}

const getExpirationTimestamp = accessToken => {
  const { exp } = decodeJWTokenPayload(accessToken)
  return exp
}

const getNewToken = async ({ tokenUrl, clientId, clientSecret, scope }) => {
  const data = {
    grant_type: GRANT_TYPE,
    client_id: clientId,
    client_secret: clientSecret,
    scope,
  }

  const urlEncodedData = new URLSearchParams(Object.entries(data)).toString()
  const jwtTokenResponse = await fetch(tokenUrl, {
    method: 'POST',
    body: urlEncodedData,
    headers: {
      'Content-Type': CONTENT_TYPE,
    },
  })

  const result = await jwtTokenResponse.json()

  return result.access_token
}

const getAccessToken = async tokenConfig => {
  log.debug('token', token)
  if (isTokenExpired()) {
    log.debug('Token expired. Requesting new token.')
    token = await getNewToken(tokenConfig)
  }

  return token
}

module.exports = {
  getAccessToken,
}
