'use strict'

const { createApiClient, EducationalLevelCode } = require('@kth/om-kursen-ladok-client')
const serverConfig = require('../configuration').server
const client = createApiClient(serverConfig.ladokMellanlagerApi)

async function searchCourseInstances(pattern, lang) {
  const courses = await client.Search.searchCoursesInstances(pattern, lang)
  return courses
}

async function searchCourseVersions(pattern, lang) {
  const courses = await client.Search.searchCourseVersions(pattern, lang)
  return courses
}

async function getProgramVersion(programCode, semester, lang) {
  const programVersion = await client.getProgrammeVersion(programCode, semester, lang)
  return programVersion
}

async function getProgramCurriculum(programCode, semester, lang) {
  const programCurriculum = await client.getProgrammeCurriculum(programCode, semester, lang)

  return programCurriculum
}

async function getProgramSyllabus(programCode, semester, lang) {
  const programSyllabus = await client.getProgrammeSyllabus(programCode, semester, lang)

  return programSyllabus
}

async function getSchoolsList(lang, deprecated = false) {
  const departmentList = await client.Support.createDepartmentList(lang, deprecated)

  return departmentList
}

async function getDepartmentWithCourseList(departmentCode, lang, onlyThirdCycle = false) {
  const utbildningsniva = onlyThirdCycle ? [EducationalLevelCode.Research] : undefined

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
  const departmentList = await client.Support.getCurrentAndDeprecatedSchoolsAndDepartmentsWithAtLeastOneCourse(params)
  return departmentList
}
async function getAllProgrammeVersions(lang, avvecklad = true) {
  const programmes = await client.Programme.getAllProgrammeVersions(lang, avvecklad)

  return programmes
}

module.exports = {
  searchCourseInstances,
  searchCourseVersions,
  getProgrammeCurriculum: getProgramCurriculum,
  getProgrammeVersion: getProgramVersion,
  getProgramSyllabus,
  getSchoolsList,
  getSchoolsListForCoursesPerSchool,
  getDepartmentWithCourseList,
  getAllProgrammeVersions,
}
