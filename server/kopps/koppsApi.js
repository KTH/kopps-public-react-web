'use strict'

const log = require('kth-node-log')
const redis = require('kth-node-redis')
const connections = require('kth-node-api-call').Connections
const config = require('../configuration').server

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

const slashEndedKoppsBase = config.koppsApi.basePath.endsWith('/')
  ? config.koppsApi.basePath
  : config.koppsApi.basePath.concat('/')

function reduceToQueryParamString(params) {
  const queryParam = Object.entries(params).reduce(
    (currentQueryParam, [key, value]) => currentQueryParam + `${key}=${encodeURIComponent(value)}&`,
    '?'
  )
  return queryParam.slice(0, -1) // Remove either '?' or '&'
}

const searchFovCourses = async searchOptions => {
  const { client } = koppsApi.koppsApi
  const queryParams = reduceToQueryParamString(searchOptions)
  const uri = `${slashEndedKoppsBase}courses/courserounds${queryParams}`
  try {
    const course = await client.getAsync({ uri, useCache: false })

    return course.body
  } catch (error) {
    log.error('Exception calling from koppsAPI in koppsApi.searchFovCourses', { error })
    throw error
  }
}

const listActiveMainFieldsOfStudy = async () => {
  const { client } = koppsApi.koppsApi
  const uri = `${slashEndedKoppsBase}utils/mainsubjects/current`
  try {
    const data = await client.getAsync({ uri, useCache: false })
    const noMainSubjectOption = data.body.find(mfs => mfs.code === ' _')
    if (noMainSubjectOption) {
      noMainSubjectOption.titleSv = 'Ej inom KTHs huvudområden'
    }
    return data
  } catch (error) {
    log.error('Exception calling from koppsAPI in koppsApi.listActiveMainFieldsOfStudy', { error })
    throw error
  }
}

const listProgrammes = async lang => {
  const { client } = koppsApi.koppsApi
  const uri = `${slashEndedKoppsBase}programmes/all${lang ? `?l=${lang}` : ''}`
  try {
    const response = await client.getAsync({ uri, useCache: false })
    return response.body
  } catch (error) {
    log.error('Exception calling KOPPS API in koppsApi.listProgrammes', { error })
    throw error
  }
}

const DEPARTMENT_CRITERIA = {
  HAS_COURSES: 'has_courses',
  HAS_THIRD_CYCLE_COURSES: 'has_third_cycle_courses',
}

const listSchoolsWithDepartments = async ({ departmentCriteria, listForActiveCourses = false, lang = 'sv' }) => {
  const { client } = koppsApi.koppsApi
  const uri = `${slashEndedKoppsBase}schools/departments?department_criteria=${departmentCriteria}&listForActiveCourses=${listForActiveCourses}&l=${lang}`
  try {
    const response = await client.getAsync({ uri, useCache: false })
    return response.body
  } catch (error) {
    log.error('Exception calling KOPPS API in koppsApi.listSchoolsWithDepartments', { error })
    throw error
  }
}

const getCourses = async ({ departmentCode, lang = 'sv' }) => {
  const { client } = koppsApi.koppsApi
  const uri = `${slashEndedKoppsBase}courses/${departmentCode}.json?l=${lang}`
  try {
    const response = await client.getAsync({ uri, useCache: false })
    if (response.statusCode !== 200) {
      const error = new Error(
        `Response from KOPPS API calling /api/kopps/v2/courses/{departmentCode}.{format} with ${departmentCode}`
      )
      error.statusCode = response.statusCode
      throw error
    }
    return response.body
  } catch (error) {
    log.error('Exception calling KOPPS API in koppsApi.getCourses', { error })
    throw error
  }
}

const getProgramme = async (programmeCode, lang) => {
  const { client } = koppsApi.koppsApi
  const uri = `${slashEndedKoppsBase}programme/${programmeCode}?l=${lang}`
  try {
    const response = await client.getAsync({ uri, useCache: false })
    return response.body
  } catch (error) {
    log.error('Exception calling KOPPS API in koppsApi.getProgramme', { error })
    throw error
  }
}

const getSearchResults = async (searchParams, lang) => {
  const { client } = koppsApi.koppsApi

  const uri = `${slashEndedKoppsBase}courses/search?${searchParams}&l=${lang}`
  try {
    const response = await client.getAsync({ uri, useCache: false })
    return response.body
  } catch (error) {
    log.error('Exception calling KOPPS API in koppsApi.getSearchResults', { error })
    throw error
  }
}

const getStudyProgrammeVersion = async (programmeCode, validFromTerm, lang) => {
  const { client } = koppsApi.koppsApi
  const uri = `${slashEndedKoppsBase}programmes/${programmeCode}/studyprogramme/version/${validFromTerm}?l=${lang}`
  try {
    const response = await client.getAsync({ uri, useCache: false })
    return response.body
  } catch (error) {
    log.error('Exception calling KOPPS API in koppsApi.getStudyProgrammeVersion', { error })
    throw error
  }
}

const listCurriculums = async (studyProgrammeVersionId, lang) => {
  const { client } = koppsApi.koppsApi
  const uri = `${slashEndedKoppsBase}studyprogramme/${studyProgrammeVersionId}/curriculums?l=${lang}`
  try {
    const response = await client.getAsync({ uri, useCache: false })
    return response.body
  } catch (error) {
    log.error('Exception calling KOPPS API in koppsApi.listCurriculums', { error })
    throw error
  }
}

module.exports = {
  searchFovCourses,
  listActiveMainFieldsOfStudy,
  listProgrammes,
  DEPARTMENT_CRITERIA,
  listSchoolsWithDepartments,
  getCourses,
  getProgramme,
  getSearchResults,
  getStudyProgrammeVersion,
  listCurriculums,
}
