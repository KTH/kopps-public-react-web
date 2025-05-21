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

async function getActiveProgramInstance(programCode, semester, lang) {
  const client = createApiClient(serverConfig.ladokMellanlagerApi)
  const program = await client.getActiveProgramInstance(programCode, semester, lang)
  return program
}

async function getProgramVersion(programCode, semester, lang) {
  const client = createApiClient(serverConfig.ladokMellanlagerApi)
  const programVersion = await client.getProgramVersion(programCode, semester, lang)
  return programVersion
}

async function getProgramStructure(programCode, lang) {
  const client = createApiClient(serverConfig.ladokMellanlagerApi)
  const programStructure = await client.getUtbildningstilfalleStructure(programCode, lang)
  return programStructure
}

module.exports = {
  searchCourseInstances,
  searchCourseVersions,
  getProgramStructure,
  getActiveProgramInstance,
  getProgramVersion,
}
