'use strict'

const { createApiClient } = require('@kth/om-kursen-ladok-client')
const serverConfig = require('../configuration').server

async function searchCourses(pattern, lang) {
  const client = createApiClient(serverConfig.ladokMellanlagerApi)
  const courses = await client.searchCourses(pattern, lang)
  return courses
}

async function getActiveProgramTillfalle(programCode, startPeriod, lang) {
  const client = createApiClient(serverConfig.ladokMellanlagerApi)
  const program = await client.getActiveProgramTillfalle(programCode, startPeriod, lang)
  return program
}

async function getProgramVersion(programCode, startPeriod, lang) {
  const client = createApiClient(serverConfig.ladokMellanlagerApi)
  const programVersion = await client.getProgramVersion(programCode, startPeriod, lang)
  return programVersion
}

async function getProgramStructure(programCode, lang) {
  const client = createApiClient(serverConfig.ladokMellanlagerApi)
  const programStructure = await client.getUtbildningstilfalleStructure(programCode, lang)
  return programStructure
}

module.exports = {
  searchCourses,
  getProgramStructure,
  getActiveProgramTillfalle,
  getProgramVersion,
}
