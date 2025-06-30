'use strict'

const { createApiClient, EducationalLevelCode } = require('@kth/om-kursen-ladok-client')
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

async function getSchoolsList(lang, deprecated = false) {
  const client = createApiClient(serverConfig.ladokMellanlagerApi)
  const departmentList = await client.Support.createDepartmentList(lang, deprecated)

  return departmentList
}

async function getDepartmentWithCourseList(departmentCode, lang, onlyThirdCycle = false) {
  const utbildningsniva = onlyThirdCycle ? [EducationalLevelCode.Research] : undefined

  const client = createApiClient(serverConfig.ladokMellanlagerApi)
  const departmentWithCourses = await client.Search.getDepartmentWithCourseList(
    { organisation: departmentCode, utbildningsniva },
    lang
  )

  return departmentWithCourses
}

/**
 *
 * @param {lang?: Language, onlyThirdCycle?: boolean} params
 * @returns
 */
async function getSchoolsListForCoursesPerSchool(params) {
  const client = createApiClient(serverConfig.ladokMellanlagerApi)
  const departmentList = await client.Support.getCurrentAndDeprecatedSchoolsAndDepartmentsWithAtLeastOneCourse(params)
  return departmentList
}
async function getAllProgrammeVersions(lang, avvecklad = true) {
  const client = createApiClient(serverConfig.ladokMellanlagerApi)
  const programmes = await client.Programme.getAllProgrammeVersions(lang, avvecklad)

  return programmes
}

module.exports = {
  searchCourseInstances,
  searchCourseVersions,
  getProgramCurriculum,
  getProgramVersion,
  getProgramSyllabus,
  getSchoolsList,
  getSchoolsListForCoursesPerSchool,
  getDepartmentWithCourseList,
  getAllProgrammeVersions,
}
