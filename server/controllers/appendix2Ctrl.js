// @ts-check

const log = require('kth-node-log')
const language = require('kth-node-web-common/lib/language')

const { browser: browserConfig, server: serverConfig } = require('../configuration')
const i18n = require('../../i18n')

const koppsApi = require('../kopps/koppsApi')
const { getServerSideFunctions } = require('../utils/serverSideRendering')

const { programmeLink } = require('../../domain/links')

function parseSpecializations(curriculums) {
  return curriculums
    .filter(curriculum => curriculum.programmeSpecialization)
    .map(curriculum => {
      const { programmeSpecialization } = curriculum
      const { programmeSpecializationCode: code, title } = programmeSpecialization
      const description = programmeSpecialization.description || null
      const specialization = {
        code,
        title,
        description,
      }
      return specialization
    })
}

async function _fillApplicationStoreOnServerSide({ applicationStore, lang, programmeCode, term }) {
  applicationStore.setLanguage(lang)
  applicationStore.setBrowserConfig(browserConfig)
  applicationStore.setProgrammeCode(programmeCode)
  applicationStore.setTerm(term)

  const { programme, statusCode } = await koppsApi.getProgramme(programmeCode, lang)
  applicationStore.setStatusCode(statusCode)
  if (statusCode !== 200) return // react NotFound

  const { title: programmeName, lengthInStudyYears } = programme
  applicationStore.setProgrammeName(programmeName)
  applicationStore.setLengthInStudyYears(lengthInStudyYears)

  const { studyProgramme, statusCode: secondStatusCode } = await koppsApi.getStudyProgrammeVersion(
    programmeCode,
    term,
    lang
  )

  applicationStore.setStatusCode(secondStatusCode)
  if (secondStatusCode !== 200) return // react NotFound

  const { id: studyProgrammeId } = studyProgramme
  const { curriculums, statusCode: thirdStatusCode } = await koppsApi.listCurriculums(studyProgrammeId, lang)
  applicationStore.setStatusCode(thirdStatusCode)
  if (thirdStatusCode !== 200) return // react NotFound

  const specializations = parseSpecializations(curriculums)
  applicationStore.setSpecializations(specializations)

  const departmentBreadCrumbItem = {
    url: programmeLink(programmeCode, lang),
    label: programmeName,
  }
  applicationStore.setBreadcrumbsDynamicItems([departmentBreadCrumbItem])
}

async function getIndex(req, res, next) {
  try {
    const lang = language.getLanguage(res)
    const { programmeCode, term } = req.params

    const { createStore, getCompressedStoreCode, renderStaticPage } = getServerSideFunctions()

    const applicationStore = createStore('appendix2')
    await _fillApplicationStoreOnServerSide({ applicationStore, lang, programmeCode, term })
    const compressedStoreCode = getCompressedStoreCode(applicationStore)

    const proxyPrefix = serverConfig.proxyPrefixPath.programme
    const html = renderStaticPage({ applicationStore, location: req.url, basename: proxyPrefix })
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
