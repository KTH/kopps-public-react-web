'use strict'

const { createApiClient } = require('om-kursen-ladok-client')
const serverConfig = require('../configuration').server

async function searchCourses(pattern, lang) {
  const client = createApiClient(serverConfig.ladokMellanlagerApi)
  const courses = await client.searchCourses(pattern, lang)
  return courses
}

async function getUtbildningsplan(uid, lang) {
  const client = createApiClient(serverConfig.ladokMellanlagerApi)
  const plan = await client.getUtbildningsPlan(uid, lang)
  return plan
}

module.exports = {
  searchCourses,
  getUtbildningsplan,
}
