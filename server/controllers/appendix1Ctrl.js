// @ts-check

const log = require('kth-node-log')
const language = require('kth-node-web-common/lib/language')

const { browser: browserConfig, server: serverConfig } = require('../configuration')
const i18n = require('../../i18n')

const koppsApi = require('../kopps/koppsApi')
const { getServerSideFunctions } = require('../utils/serverSideRendering')
const { programmeLink } = require('../../domain/links')
const { setErrorInProgramVersion } = require('../utils/errors')

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

async function _fillApplicationStoreOnServerSide({ applicationStore, lang, programmeCode, term }) {
  applicationStore.setLanguage(lang)
  applicationStore.setBrowserConfig(browserConfig)
  applicationStore.setProgrammeCode(programmeCode)
  applicationStore.setTerm(term)

  const programme = await koppsApi.getProgramme(programmeCode, lang)
  const { title: programmeName, lengthInStudyYears, creditUnitAbbr } = programme
  applicationStore.setProgrammeName(programmeName)
  applicationStore.setLengthInStudyYears(lengthInStudyYears)
  applicationStore.setCreditUnitAbbr(creditUnitAbbr)

  const response = await koppsApi.getStudyProgrammeVersion(programmeCode, term, lang)
  if (response.statusCode !== 200) {
    setErrorInProgramVersion(applicationStore, response.statusCode)
    return
  }
  const studyProgramme = response.body
  applicationStore.setStudyProgramme(studyProgramme)

  const { id: studyProgrammeId } = studyProgramme
  const curriculums = await koppsApi.listCurriculums(studyProgrammeId, lang)
  parseCurriculums(applicationStore, curriculums)

  const departmentBreadCrumbItem = {
    url: programmeLink(programmeCode, lang), // browserConfig.proxyPrefixPath.uri,
    label: programmeName,
  }
  applicationStore.setBreadcrumbsDynamicItems([departmentBreadCrumbItem])
}

async function getIndex(req, res, next) {
  try {
    const lang = language.getLanguage(res)
    const { programmeCode, term } = req.params

    const { createStore, getCompressedStoreCode, renderStaticPage } = getServerSideFunctions()

    const applicationStore = createStore('appendix1')
    await _fillApplicationStoreOnServerSide({ applicationStore, lang, programmeCode, term })
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
