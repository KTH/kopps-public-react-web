// @ts-check

const log = require('@kth/log')
const language = require('@kth/kth-node-web-common/lib/language')

const { server: serverConfig } = require('../configuration')
const i18n = require('../../i18n')

const koppsApi = require('../kopps/koppsApi')
const { curriculumInfo, setFirstSpec } = require('../../domain/curriculum')
const { calculate: calculateStartTerm } = require('../../domain/academicYear')

const { getServerSideFunctions } = require('../utils/serverSideRendering')
const { programmeFullName } = require('../utils/programmeFullName')

const { programmeLink } = require('../../domain/links')
const {
  fillStoreWithQueryParams,
  fetchAndFillProgrammeDetails,
  fillBreadcrumbsDynamicItems,
  fetchAndFillStudyProgrammeVersion,
} = require('../stores/programmeStoreSSR')

/**
 *
 * @param {object} curriculum
 * @param {string} programmeCode
 * @param {string} term
 * @param {string} studyYear
 * @param {string} lang
 */
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

function _setErrorMissingAdmission(applicationStore, statusCode) {
  if (statusCode === 404) {
    applicationStore.setMissingAdmission()
  }
  return
}

function _compareCurriculum(a, b) {
  if (a.code < b.code) {
    return -1
  }
  if (a.code > b.code) {
    return 1
  }
  return 0
}

/**
 * Curriculum
 *
 * @param {object} options.applicationStore
 * @param {string} options.lang
 * @param {string} options.programmeCode
 * @param {string} options.term
 * @param {string} storeId
 */
async function _fetchAndFillCurriculumByStudyYear(options, storeId) {
  const { applicationStore, lang, programmeCode, studyYear, term } = options
  const { studyProgrammeId, statusCode } = await fetchAndFillStudyProgrammeVersion({ ...options, storeId })
  if (!studyProgrammeId) {
    _setErrorMissingAdmission(applicationStore, statusCode)
    return
  } // react NotFound
  const { curriculums, statusCode: secondStatusCode } = await koppsApi.listCurriculums(studyProgrammeId, lang)
  applicationStore.setStatusCode(secondStatusCode)
  if (secondStatusCode !== 200) return // react NotFound

  const curriculumsWithCourseRounds = await _addCourseRounds(curriculums, programmeCode, term, studyYear, lang)
  applicationStore.setCurriculums(curriculumsWithCourseRounds)
  const curriculumInfos = curriculumsWithCourseRounds
    .map(curriculum => curriculumInfo({ programmeTermYear: { studyYear }, curriculum }))
    .filter(ci => ci.hasInfo)
  curriculumInfos.sort(_compareCurriculum)
  setFirstSpec(curriculumInfos)
  applicationStore.setCurriculumInfos(curriculumInfos)
  return
}

function metaTitleAndDescription(lang, programmeCode, programmeName, studyYear, term) {
  const metaTitle = `${programmeFullName(lang, programmeCode, programmeName, term)}, ${i18n.message(
    'study_year',
    lang
  )} ${studyYear}`

  return { metaTitle, metaDescription: '' }
}

async function getIndex(req, res, next) {
  try {
    const lang = language.getLanguage(res)
    const { programmeCode, term, studyYear } = req.params

    const { createStore, getCompressedStoreCode, renderStaticPage } = getServerSideFunctions()
    const storeId = 'curriculum'
    log.info(`Creating an application store ${storeId} on server side`, { programmeCode })

    const applicationStore = createStore(storeId)
    const options = { applicationStore, lang, programmeCode, term, studyYear }

    log.info(`Starting to fill in application store ${storeId} on server side `, { programmeCode })
    const { programmeName } = await fetchAndFillProgrammeDetails(options, storeId)

    fillStoreWithQueryParams(options)
    fillBreadcrumbsDynamicItems(options, programmeName)
    await _fetchAndFillCurriculumByStudyYear(options, storeId)

    const compressedStoreCode = getCompressedStoreCode(applicationStore)
    log.info(`${storeId} store was filled in and compressed`, { programmeCode })

    const { programme: proxyPrefix } = serverConfig.proxyPrefixPath
    log.debug({ applicationStore })

    const html = renderStaticPage({ applicationStore, location: req.url, basename: proxyPrefix })
    const { metaTitle: title, metaDescription: description } = metaTitleAndDescription(
      lang,
      programmeCode,
      programmeName,
      studyYear,
      term
    )
    res.render('app/index', {
      html,
      title,
      compressedStoreCode,
      description,
      lang,
      proxyPrefix,
      studentWeb: true,
    })
  } catch (err) {
    log.error('Error', { error: err })
    next(err)
  }
}

module.exports = {
  getIndex,
}
