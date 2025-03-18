'use strict'

const { createApiClient } = require('om-kursen-ladok-client')
const serverConfig = require('../configuration').server

async function searchCourses(pattern, lang) {
  const client = createApiClient(serverConfig.ladokMellanlagerApi)
  const courses = await client.searchCourses(pattern, lang)
  return courses
}

async function getSyllabus(courseCode, semester, lang) {
  const client = createApiClient(serverConfig.ladokMellanlagerApi)
  const syllabus = await client.getProgramSyllabus(courseCode, semester, lang)
  return syllabus
}

module.exports = {
  searchCourses,
  getSyllabus,
}
