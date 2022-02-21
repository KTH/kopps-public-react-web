'use strict'

const log = require('@kth/log')
const redis = require('kth-node-redis')
const connections = require('@kth/api-call').Connections
const config = require('../configuration').server
const { setErrorKoppsCallingUri, setErrorInProgramVersion } = require('../utils/errors')

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

const searchFovCourses = async searchOptions => {
  const { client } = koppsApi.koppsApi
  const queryParams = reduceToQueryParamString(searchOptions)
  const uri = `${slashEndedKoppsBase}courses/courserounds${queryParams}`
  try {
    const course = await client.getAsync({ uri, useCache: true })

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
    const data = await client.getAsync({ uri, useCache: true })
    const noMainSubjectOption = data.body.find(mfs => mfs.code === ' _')
    if (noMainSubjectOption) {
      noMainSubjectOption.titleSv = 'Ej inom KTHs huvudområden'
    }
    return data.body
  } catch (error) {
    log.error('Exception calling from koppsAPI in koppsApi.listActiveMainFieldsOfStudy', { error })
    throw error
  }
}

const listProgrammes = async lang => {
  const { client } = koppsApi.koppsApi
  const uri = `${slashEndedKoppsBase}programmes/all${lang ? `?l=${lang}` : ''}`
  try {
    const response = await client.getAsync({ uri, useCache: true })
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

const listSchoolsWithDepartments = async ({ departmentCriteria, listForActiveCourses = false, lang = 'sv' }) => {
  const { client } = koppsApi.koppsApi
  const uri = `${slashEndedKoppsBase}schools/departments?department_criteria=${departmentCriteria}&listForActiveCourses=${listForActiveCourses}&l=${lang}`
  try {
    const { body, statusCode } = await client.getAsync({ uri, useCache: true })
    let errorMessage = null

    if (statusCode !== 200) {
      errorMessage = `Failed response calling ${uri}`

      log.debug(errorMessage)
    }
    if (body) log.info(`Successfully got data from`, { uri })

    return { schoolsWithDepartments: body, statusCode }
  } catch (error) {
    log.error('Exception ', { error })
    throw error
  }
}
// use react 404
const getCourses = async ({ departmentCode, lang = 'sv' }) => {
  const { client } = koppsApi.koppsApi
  const uri = `${slashEndedKoppsBase}courses/${departmentCode}.json?l=${lang}`
  try {
    const { body, statusCode } = await client.getAsync({ uri, useCache: true })
    let errorMessage = null

    if (statusCode !== 200) {
      errorMessage = `Failed response from KOPPS API calling ${uri} with ${departmentCode}`

      log.debug(errorMessage)
    }
    if (body) log.info(`Successfully got data from`, { uri })

    return { departmentCourses: body, errorMessage, statusCode }
  } catch (error) {
    log.error('Exception koppsApi.getCourses', { error })
    throw error
  }
}

const getProgramme = async (programmeCode, lang) => {
  const { client } = koppsApi.koppsApi
  const uri = `${slashEndedKoppsBase}programme/${programmeCode}?l=${lang}`
  log.info(`Fetching ${uri}`)
  try {
    const { body, statusCode } = await client.getAsync({ uri, useCache: true })
    const errorMessage = statusCode !== 200 ? setErrorKoppsCallingUri(uri) : null

    if (body) log.info(`Successfully got data from`, { uri })

    return { programme: body, errorMessage, statusCode }
  } catch (error) {
    log.error('Exception in koppsApi.getProgramme', { error })
    throw error
  }
}

const getSearchResults = async (searchParamsStr, lang) => {
  const { client } = koppsApi.koppsApi
  // const uri = `${slashEndedKoppsBase}courses/search?${searchParams}&l=${lang}`
  const uri = `${slashEndedKoppsBase}courses/search?${searchParamsStr}&l=${lang}`

  try {
    const response = await client.getAsync({ uri, useCache: true })
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
    const { body, statusCode } = await client.getAsync({ uri, useCache: true })
    const errorMessage = statusCode !== 200 ? setErrorInProgramVersion() : null

    if (body) log.info(`Successfully got data from`, { uri })

    return { studyProgramme: body, errorMessage, statusCode }
  } catch (error) {
    log.error('Exception in koppsApi.getStudyProgrammeVersion', { error })
    throw error
  }
}

const listCurriculums = async (studyProgrammeVersionId, lang) => {
  const { client } = koppsApi.koppsApi
  const uri = `${slashEndedKoppsBase}studyprogramme/${studyProgrammeVersionId}/curriculums?l=${lang}`
  try {
    const { body, statusCode } = await client.getAsync({ uri, useCache: true })
    const errorMessage = statusCode !== 200 ? setErrorKoppsCallingUri(uri) : null

    if (body) log.info(`Successfully got data from`, { uri })
    return { curriculums: body, errorMessage, statusCode }
  } catch (error) {
    log.error('Exception in koppsApi.listCurriculums', { error })
    throw error
  }
}

const listCourseRoundsInYearPlan = async ({
  programmeCode,
  specializationCode,
  academicYearStartTerm,
  studyYearNumber,
  lang,
}) => {
  const { client } = koppsApi.koppsApi
  const uri = `${slashEndedKoppsBase}academicyearplan/${programmeCode}/${
    specializationCode ? `${specializationCode}/` : ''
  }${academicYearStartTerm}/${studyYearNumber}?l=${lang}`
  try {
    const response = await client.getAsync({ uri, useCache: true })
    return response.body
  } catch (error) {
    log.error('Exception calling KOPPS API in koppsApi.listCourseRoundsInYearPlan', { error })
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
  searchFovCourses,
  listActiveMainFieldsOfStudy,
  listProgrammes,
  DEPARTMENT_CRITERIA,
  listSchools,
  listSchoolsWithDepartments,
  getCourses,
  getProgramme,
  getSearchResults,
  getStudyProgrammeVersion,
  listCurriculums,
  listCourseRoundsInYearPlan,
  literatureForCourse,
}
