'use strict'

const { createApiClient } = require('@kth/om-kursen-ladok-client')
const serverConfig = require('../configuration').server

async function searchCourseInstances(pattern, lang) {
  const client = createApiClient(serverConfig.ladokMellanlagerApi)
  const courses = await client.Search.searchCourses(pattern, lang)
  return courses
}

async function searchCourseVersions(pattern, lang) {
  const client = createApiClient(serverConfig.ladokMellanlagerApi)
  const courses = await client.Search.searchCourseVersions(pattern, lang)
  return courses
}

async function getProgramVersion(programCode, semester, lang) {
  const client = createApiClient(serverConfig.ladokMellanlagerApi)
  const programVersion = await client.getProgramVersion(programCode, semester, lang)
  return programVersion
}

async function getProgramCurriculums(programCode, semester, lang) {
  const client = createApiClient(serverConfig.ladokMellanlagerApi)
  const programCurriculums = await client.getProgramCurriculums(programCode, semester, lang)

  return programCurriculums
}

module.exports = {
  searchCourseInstances,
  searchCourseVersions,
  getProgramCurriculums,
  getProgramVersion,
}
