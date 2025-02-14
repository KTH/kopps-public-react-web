'use strict'

const { createApiClient } = require('om-kursen-ladok-client')
const serverConfig = require('../configuration').server

async function searchCourses(pattern, lang) {
  const client = createApiClient(serverConfig.ladokMellanlagerApi)
  const courses = await client.searchCourses(pattern, lang)
  return courses
}

async function getActiveProgramTillfalle(programCode, startPeriod, lang) {
  const client = createApiClient(serverConfig.ladokMellanlagerApi)
  const courses = await client.getActiveProgramTillfalle(programCode, startPeriod, lang)
  return courses
}

async function getProgramStructure(programCode, startPeriod, lang) {
  const client = createApiClient(serverConfig.ladokMellanlagerApi)
  const courses = await client.getUtbildningstilfalleStructure(programCode, lang)
  return courses
}

module.exports = {
  searchCourses,
  getProgramStructure,
  getActiveProgramTillfalle,
}
