// @ts-check

const log = require('kth-node-log')
const language = require('kth-node-web-common/lib/language')

const { browser: browserConfig, server: serverConfig } = require('../configuration')
const i18n = require('../../i18n')

const koppsApi = require('../kopps/koppsApi')
const { curriculumInfo, setFirstSpec } = require('../../domain/curriculum')
const { calculate: calculateStartTerm } = require('../../domain/academicYear')

const { getServerSideFunctions } = require('../utils/serverSideRendering')

// TODO: There’s also links on the client side. Refactor?
function programmeLink(proxyPrefixPath, programmeCode, lang) {
  const languageParam = lang === 'en' ? '?l=en' : ''
  return `${proxyPrefixPath}/student/kurser/program/${programmeCode}${languageParam}`
}

async function _getCourseRounds(curriculum, programmeCode, term, studyYear, lang) {
  const specializationCode = curriculum.programmeSpecialization
    ? curriculum.programmeSpecialization.programmeSpecializationCode
    : null
  const academicYearStartTerm = calculateStartTerm(term, studyYear)
  return koppsApi.listCourseRoundsInYearPlan({
    programmeCode,
    specializationCode,
    academicYearStartTerm,
    studyYearNumber: studyYear,
    lang,
  })
}

async function _addCourseRounds(curriculums, programmeCode, term, studyYear, lang) {
  const curriculumsWithCourseRounds = []
  await Promise.all(
    curriculums.map(async curriculum => {
      const courseRounds = await _getCourseRounds(curriculum, programmeCode, term, studyYear, lang)
      const curriculumWithCourseRounds = curriculum
      curriculumWithCourseRounds.courseRounds = courseRounds
      curriculumsWithCourseRounds.push(curriculumWithCourseRounds)
    })
  )
  return curriculumsWithCourseRounds
}

function _setError(applicationStore, statusCode) {
  if (statusCode === 404) {
    applicationStore.setMissingAdmission()
  } else {
    const error = new Error('Exception calling KOPPS API in koppsApi.getStudyProgrammeVersion')
    error.statusCode = statusCode
    throw error
  }
}

function _compareCurriculum(a, b) {
  if (!a) return -1
  if (!b) return 1
  if (a.code < b.code) {
    return -1
  }
  if (a.code > b.code) {
    return 1
  }
  return 0
}

async function _fillApplicationStoreOnServerSide({ applicationStore, lang, programmeCode, term, studyYear }) {
  applicationStore.setLanguage(lang)
  applicationStore.setBrowserConfig(browserConfig)
  applicationStore.setProgrammeCode(programmeCode)
  applicationStore.setTerm(term)
  applicationStore.setStudyYear(studyYear)

  const programme = await koppsApi.getProgramme(programmeCode, lang)
  const { title: programmeName, owningSchoolCode } = programme

  applicationStore.setProgrammeName(programmeName)
  applicationStore.setOwningSchoolCode(owningSchoolCode)

  const response = await koppsApi.getStudyProgrammeVersion(programmeCode, term, lang)
  if (response.statusCode !== 200) {
    _setError(applicationStore, response.statusCode)
    return
  }
  const studyProgramme = response.body
  const { id: studyProgrammeId } = studyProgramme

  const curriculums = await koppsApi.listCurriculums(studyProgrammeId, lang)
  const curriculumsWithCourseRounds = await _addCourseRounds(curriculums, programmeCode, term, studyYear, lang)
  applicationStore.setCurriculums(curriculumsWithCourseRounds)
  const curriculumInfos = curriculumsWithCourseRounds
    .map(curriculum => curriculumInfo({ programmeTermYear: { studyYear }, curriculum }))
    .filter(ci => ci.hasInfo)
  curriculumInfos.sort(_compareCurriculum)
  setFirstSpec(curriculumInfos)
  applicationStore.setCurriculumInfos(curriculumInfos)

  let lastStudyYearWithCourses = 0
  curriculumsWithCourseRounds.forEach(curriculum => {
    const { studyYears } = curriculum
    studyYears.forEach(year => {
      const { yearNumber, courses } = year
      if (Array.isArray(courses) && courses.length && yearNumber > lastStudyYearWithCourses) {
        lastStudyYearWithCourses = yearNumber
      }
    })
  })
  applicationStore.setLastStudyYear(lastStudyYearWithCourses)

  const departmentBreadCrumbItem = {
    url: programmeLink(browserConfig.proxyPrefixPath.uri, programmeCode, lang),
    label: programmeName,
  }
  applicationStore.setBreadcrumbsDynamicItems([departmentBreadCrumbItem])
}

async function getIndex(req, res, next) {
  try {
    const lang = language.getLanguage(res)
    const { programmeCode, term, studyYear } = req.params

    const { createStore, getCompressedStoreCode, renderStaticPage } = getServerSideFunctions()

    const applicationStore = createStore('curriculum')
    await _fillApplicationStoreOnServerSide({ applicationStore, lang, programmeCode, term, studyYear })
    const compressedStoreCode = getCompressedStoreCode(applicationStore)

    const proxyPrefix = serverConfig.proxyPrefixPath.programme
    const html = renderStaticPage({ applicationStore, location: req.url })
    const title = i18n.message('site_name', lang)

    res.render('app/index', {
      html,
      title,
      compressedStoreCode,
      description: title,
      lang,
      proxyPrefix,
    })
  } catch (err) {
    log.error('Error in getIndex', { error: err })
    next(err)
  }
}

module.exports = {
  getIndex,
}
