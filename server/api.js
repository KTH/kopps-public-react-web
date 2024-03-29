'use strict'

const log = require('@kth/log')
const redis = require('kth-node-redis')
const connections = require('@kth/api-call').Connections
const config = require('./configuration').server

// const koppsOpts = {
//   log,
//   https: true,
//   redis,
//   cache: config.cache,
//   timeout: 5000,
//   defaultTimeout: config.koppsApi.defaultTimeout,
//   retryOnESOCKETTIMEDOUT: true,
//   useApiKey: false, // performs api-key checks against the apis, if a "required" check fails, the app will exit. Required apis are specified in the config
// }
const opts = {
  log,
  redis,
  timeout: 30000,
  retryOnESOCKETTIMEDOUT: false,
  useApiKey: false,
  checkAPIs: false, // performs api-key checks against the apis, if a "required" check fails, the app will exit. Required apis are specified in the config
}

// config.koppsApi.doNotCallPathsEndpoint = true // skip checking _paths, because kopps doesnt have it
// config.koppsApi.connected = true

// const koppsConfig = {
//   koppsApi: config.koppsApi,
// }

// module.exports = connections.setup(koppsConfig, koppsConfig, koppsOpts)
module.exports = connections.setup(config.nodeApi, config.apiKey, opts)
