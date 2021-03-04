'use strict'
const log = require('kth-node-log')
const config = require('../configuration').server
const redis = require('kth-node-redis')
const connections = require('kth-node-api-call').Connections

// http client setup
const koppsOpts = {
  log,
  https: true,
  redis,
  cache: config.cache,
  timeout: 5000,
  defaultTimeout: config.koppsApi.defaultTimeout,
  retryOnESOCKETTIMEDOUT: true,
  useApiKey: false,
}

config.koppsApi.doNotCallPathsEndpoint = true // skip checking _paths, because kopps doesnt have it
config.koppsApi.connected = true

const koppsConfig = {
  koppsApi: config.koppsApi,
}

const koppsApi = connections.setup(koppsConfig, koppsConfig, koppsOpts)

function reduceToQueryParamString(params) {
  const queryParam = Object.entries(params).reduce((currentQueryParam, [key, value]) => {
    return currentQueryParam + `${key}=${value}&`
  }, '?')
  return queryParam.slice(0, -1) // Remove either '?' or '&'
}

// Resolve kopps basepath only here since it's fixed, and export only the subset of kopps api we need.
const searchFovCourses = async searchOptions => {
  const { client } = koppsApi.koppsApi
  const koppsBase = config.koppsApi.basePath
  const slashEndedKoppsBase = koppsBase.endsWith('/') ? koppsBase : koppsBase.concat('/')
  const queryParams = reduceToQueryParamString(searchOptions)
  const uri = `${slashEndedKoppsBase}courses/courserounds${queryParams}`
  try {
    const course = await client.getAsync({ uri, useCache: false })

    return course.body
  } catch (error) {
    log.error('Exception calling from koppsAPI in koppsApi.rawKoppsCourseData', { error })
    throw error
  }
}

module.exports = {
  searchFovCourses,
}
