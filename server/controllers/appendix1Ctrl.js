// @ts-check

const log = require('kth-node-log')
const language = require('kth-node-web-common/lib/language')

const { browser: browserConfig, server: serverConfig } = require('../configuration')
const i18n = require('../../i18n')

const koppsApi = require('../kopps/koppsApi')
const { getServerSideFunctions } = require('../utils/serverSideRendering')
const { programmeLink } = require('../../domain/links')
const { formatLongTerm } = require('../../domain/term')

function parseCurriculums(applicationStore, curriculums) {
  curriculums.forEach(curriculum => {
    if (curriculum.programmeSpecialization) {
      // Specialization
      const { programmeSpecialization, studyYears } = curriculum
      const { programmeSpecializationCode: code, title } = programmeSpecialization
      applicationStore.addSpecialization({
        code,
        title,
        studyYears: studyYears.reduce((years, studyYear) => {
          if (studyYear.courses.length) {
            years.push(studyYear.yearNumber)
          }
          if (studyYear.supplementaryInfo) {
            applicationStore.addSupplementaryInfo(studyYear.supplementaryInfo, studyYear.yearNumber, code)
          }
          if (studyYear.conditionallyElectiveCoursesInfo) {
            applicationStore.addConditionallyElectiveCoursesInfo(
              studyYear.conditionallyElectiveCoursesInfo,
              studyYear.yearNumber,
              code
            )
          }
          studyYear.courses.forEach(course => {
            const {
              courseCode,
              title: name,
              comment,
              credits,
              creditUnitAbbr: creditAbbr,
              educationalLevel: level,
              electiveCondition,
            } = course
            applicationStore.addElectiveConditionCourse(
              {
                code: courseCode,
                name,
                comment,
                credits,
                creditAbbr,
                level,
              },
              electiveCondition,
              studyYear.yearNumber,
              code
            )
          })
          return years
        }, []),
      })
    } else {
      // Common
      const { studyYears } = curriculum
      studyYears.forEach(studyYear => {
        if (studyYear.courses.length) {
          applicationStore.addStudyYear(studyYear.yearNumber)
        }
        if (studyYear.supplementaryInfo) {
          applicationStore.addSupplementaryInfo(studyYear.supplementaryInfo, studyYear.yearNumber, 'Common')
        }
        if (studyYear.conditionallyElectiveCoursesInfo) {
          applicationStore.addConditionallyElectiveCoursesInfo(
            studyYear.conditionallyElectiveCoursesInfo,
            studyYear.yearNumber,
            'Common'
          )
        }
        studyYear.courses.forEach(course => {
          const {
            courseCode: code,
            title: name,
            comment,
            credits,
            creditUnitAbbr: creditAbbr,
            educationalLevel: level,
            electiveCondition,
          } = course
          applicationStore.addElectiveConditionCourse(
            {
              code,
              name,
              comment,
              credits,
              creditAbbr,
              level,
            },
            electiveCondition,
            studyYear.yearNumber,
            'Common'
          )
        })
      })
    }
  })
}
function _fillBasicPageConfig(applicationStore, lang, programmeCode, term) {
  applicationStore.setLanguage(lang)
  applicationStore.setBrowserConfig(browserConfig)
  applicationStore.setProgrammeCode(programmeCode)
  applicationStore.setTerm(term)
  return
}

async function _fetchAndFillProgrammeProps(applicationStore, lang, programmeCode, term) {
  const { programme, statusCode } = await koppsApi.getProgramme(programmeCode, lang)
  applicationStore.setStatusCode(statusCode)
  if (statusCode !== 200) return // react NotFound

  const { title: programmeName, lengthInStudyYears, creditUnitAbbr } = programme
  applicationStore.setProgrammeName(programmeName)
  applicationStore.setLengthInStudyYears(lengthInStudyYears)
  applicationStore.setCreditUnitAbbr(creditUnitAbbr)

  return programmeName
}

async function _fetchAndFillStudyProgrammeVersion(applicationStore, lang, programmeCode, term) {
  const { studyProgramme, statusCode: secondStatusCode } = await koppsApi.getStudyProgrammeVersion(
    programmeCode,
    term,
    lang
  )

  applicationStore.setStatusCode(secondStatusCode)
  if (secondStatusCode !== 200) return // react NotFound

  applicationStore.setStudyProgramme(studyProgramme)

  const { id: studyProgrammeId } = studyProgramme

  return studyProgrammeId
}

async function __fetchAndFillCurriculumList(applicationStore, lang, studyProgrammeId) {
  if (!studyProgrammeId) return
  const { curriculums, statusCode: thirdStatusCode } = await koppsApi.listCurriculums(studyProgrammeId, lang)
  applicationStore.setStatusCode(thirdStatusCode)
  if (thirdStatusCode !== 200) return // react NotFound
  parseCurriculums(applicationStore, curriculums)
  return
}

function _fillBreadcrumbsDynamicItems(applicationStore, programmeCode, programmeName, lang) {
  const departmentBreadCrumbItem = {
    url: programmeLink(programmeCode, lang), // browserConfig.proxyPrefixPath.uri,
    label: programmeName,
  }
  applicationStore.setBreadcrumbsDynamicItems([departmentBreadCrumbItem])
}

function metaTitleAndDescription(lang, programmeCode, programmeName, term) {
  // i18n.message('site_name', lang)
  const metaTitle = `${programmeName} (${programmeCode}), ${i18n.message(
    'programme_admitted_year',
    lang
  )} ${formatLongTerm(term, lang)}, ${i18n.message('programme_appendix1', lang)}`

  return { metaTitle, metaDescription: '' }
}

async function getIndex(req, res, next) {
  try {
    const lang = language.getLanguage(res)
    const { programmeCode, term } = req.params

    const { createStore, getCompressedStoreCode, renderStaticPage } = getServerSideFunctions()

    const applicationStore = createStore('appendix1')
    await _fillBasicPageConfig(applicationStore, lang, programmeCode, term)
    const programmeName = await _fetchAndFillProgrammeProps(applicationStore, lang, programmeCode, term)
    _fillBreadcrumbsDynamicItems(applicationStore, programmeCode, programmeName, lang)
    const studyProgrammeId = await _fetchAndFillStudyProgrammeVersion(applicationStore, lang, programmeCode, term)
    await __fetchAndFillCurriculumList(applicationStore, lang, studyProgrammeId)
    const compressedStoreCode = getCompressedStoreCode(applicationStore)

    const { programme: proxyPrefix } = serverConfig.proxyPrefixPath
    const html = renderStaticPage({ applicationStore, location: req.url, basename: proxyPrefix })
    const { metaTitle, metaDescription } = metaTitleAndDescription(lang, programmeCode, programmeName, term)
    //i18n.message('site_name', lang)

    res.render('app/index', {
      html,
      title: metaTitle,
      compressedStoreCode,
      description: metaDescription,
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
