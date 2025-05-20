'use strict'

const { createApiClient } = require('@kth/om-kursen-ladok-client')
const serverConfig = require('../configuration').server

async function searchCourses(pattern, lang) {
  const client = createApiClient(serverConfig.ladokMellanlagerApi)
  const courses = await client.searchCourses(pattern, lang)
  return courses
}

async function getProgramVersion(programCode, semester, lang) {
  const client = createApiClient(serverConfig.ladokMellanlagerApi)
  const programVersion = await client.getProgramVersion(programCode, semester, lang)
  return programVersion
}

async function getProgramCurriculum(programCode, semester, lang) {
  const client = createApiClient(serverConfig.ladokMellanlagerApi)
  const programCurriculum = await client.getProgramCurriculum(programCode, semester, lang)

  return programCurriculum
}

async function getProgramSyllabus(programCode, semester, lang) {
  const client = createApiClient(serverConfig.ladokMellanlagerApi)
  const programSyllabus = await client.getProgramSyllabus(programCode, semester, lang)

  return programSyllabus
}

module.exports = {
  searchCourses,
  getProgramCurriculum,
  getProgramVersion,
  getProgramSyllabus,
}
