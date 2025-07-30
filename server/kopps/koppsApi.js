'use strict'

const log = require('@kth/log')
const redis = require('kth-node-redis')
const connections = require('@kth/api-call').Connections
const config = require('../configuration').server

// http client setup
// TODO: timeout setting here seems to be ignored, and defaults to 5 seconds.
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
if (process.env.TEST_TYPE && process.env.TEST_TYPE === 'performance') config.koppsApi.host = 'http://mock-api:3000'

const koppsConfig = {
  koppsApi: config.koppsApi,
}

const koppsApi = connections.setup(koppsConfig, koppsConfig, koppsOpts)

const slashEndedKoppsBase = config.koppsApi.basePath.endsWith('/')
  ? config.koppsApi.basePath
  : config.koppsApi.basePath.concat('/')

function reduceToQueryParamString(params) {
  const queryParam = Object.entries(params).reduce((currentQueryParam, [key, value]) => {
    if (Array.isArray(value)) {
      return currentQueryParam + value.map(e => `${key}=${encodeURIComponent(e)}&`).join('')
    }
    if (value === undefined || value === null) {
      return currentQueryParam
    }
    return currentQueryParam + `${key}=${encodeURIComponent(value)}&`
  }, '?')
  return queryParam.slice(0, -1) // Remove either '?' or '&'
}

const DEPARTMENT_CRITERIA = {
  HAS_COURSES: 'has_courses',
  HAS_THIRD_CYCLE_COURSES: 'has_third_cycle_courses',
}

const listSchools = async ({ lang = 'sv' }) => {
  const { client } = koppsApi.koppsApi
  const uri = `${slashEndedKoppsBase}schools${reduceToQueryParamString({ l: lang })}`
  try {
    const response = await client.getAsync({ uri, useCache: true })
    return response.body
  } catch (error) {
    log.error('Exception calling KOPPS API in koppsApi.listSchools', { error })
    throw error
  }
}

const literatureForCourse = async ({ term, school, lang }) => {
  const { client } = koppsApi.koppsApi
  const uri = `${slashEndedKoppsBase}schools/${school}/courses/${term}/literature${reduceToQueryParamString({
    l: lang,
  })}`
  try {
    const response = await client.getAsync({ uri, useCache: true, timeout: 20000 })
    return response.body
  } catch (error) {
    log.error('Exception calling KOPPS API in koppsApi.literatureForCourse', { error })
    throw error
  }
}

module.exports = {
  DEPARTMENT_CRITERIA,
  listSchools,
  literatureForCourse,
}
