const log = require('@kth/log')
const language = require('@kth/kth-node-web-common/lib/language')

const { server: serverConfig } = require('../configuration')
const i18n = require('../../i18n')

const koppsApi = require('../kopps/koppsApi')
const { curriculumInfo, setFirstSpec } = require('../../domain/curriculum')
const { calculateStartTerm } = require('../../domain/academicYear')

const { createProgrammeBreadcrumbs } = require('../utils/breadcrumbUtil')
const { getServerSideFunctions } = require('../utils/serverSideRendering')
const { programmeFullName } = require('../utils/programmeFullName')

const { getProgramCurriculum } = require('../ladok/ladokApi')

const {
  fillStoreWithQueryParams,
  fetchAndFillProgrammeDetails,
  fetchAndFillStudyProgrammeVersion,
} = require('../stores/programmeStoreSSR')

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

  let curriculumData

  const convertedSemester = `${term.endsWith('1') ? 'VT' : 'HT'}${term.slice(0, 4)}`

  try {
    curriculumData = await getProgramCurriculum(programmeCode, convertedSemester, lang)
  } catch (error) {
    applicationStore.setStatusCode(503)
    return
  }

  applicationStore.setCurriculums(curriculumData)
  const curriculumInfos = curriculumData
    .map(curriculum => {
      return curriculumInfo({ programmeTermYear: { programStartTerm: term, studyYear }, curriculum })
    })
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

    let klaroAnalyticsConsentCookie = false
    if (req.cookies.klaro) {
      const consentCookiesArray = req.cookies.klaro.slice(1, -1).split(',')
      // eslint-disable-next-line prefer-destructuring
      const analyticsConsentCookieString = consentCookiesArray
        .find(cookie => cookie.includes('analytics-consent'))
        .split(':')[1]
      // eslint-disable-next-line no-const-assign
      klaroAnalyticsConsentCookie = analyticsConsentCookieString === 'true'
    }

    const { createStore, getCompressedStoreCode, renderStaticPage } = getServerSideFunctions()
    const storeId = 'curriculum'
    log.info(`Creating an application store ${storeId} on server side`, { programmeCode })

    const applicationStore = createStore(storeId)
    const options = { applicationStore, lang, programmeCode, term, studyYear }

    log.info(`Starting to fill in application store ${storeId} on server side `, { programmeCode })

    const { programmeName } = await fetchAndFillProgrammeDetails(options, storeId)

    fillStoreWithQueryParams(options)
    await _fetchAndFillCurriculumByStudyYear(options, storeId)

    const compressedStoreCode = getCompressedStoreCode(applicationStore)
    log.info(`${storeId} store was filled in and compressed`, { programmeCode })

    const { programme: basename, uri: proxyPrefix } = serverConfig.proxyPrefixPath

    const view = renderStaticPage({ applicationStore, location: req.url, basename: basename })
    const { metaTitle: title, metaDescription: description } = metaTitleAndDescription(
      lang,
      programmeCode,
      programmeName,
      studyYear,
      term
    )
    const breadcrumbsList = createProgrammeBreadcrumbs(lang, programmeName, programmeCode)

    res.render('app/index', {
      html: view,
      title,
      compressedStoreCode,
      description,
      lang,
      proxyPrefix,
      toolbarUrl: serverConfig.toolbar.url,
      studentWeb: true,
      theme: 'student-web',
      klaroAnalyticsConsentCookie,
      breadcrumbsList,
    })
  } catch (err) {
    log.error('Error', { error: err })
    next(err)
  }
}

module.exports = {
  getIndex,
}
