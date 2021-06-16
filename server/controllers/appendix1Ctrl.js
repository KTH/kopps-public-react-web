// @ts-check

const log = require('kth-node-log')
const language = require('kth-node-web-common/lib/language')

const { browser: browserConfig, server: serverConfig } = require('../configuration')
const i18n = require('../../i18n')

const koppsApi = require('../kopps/koppsApi')
const { getServerSideFunctions } = require('../utils/serverSideRendering')

// TODO: There’s also links on the client side. Refactor?
function programmeLink(proxyPrefixPath, programmeCode, lang) {
  const languageParam = lang === 'en' ? '?l=en' : ''
  return `${proxyPrefixPath}/student/kurser/program/${programmeCode}${languageParam}`
}

function _setError(applicationStore, statusCode) {
  const error = new Error('Exception calling KOPPS API in koppsApi.getStudyProgrammeVersion')
  error.statusCode = statusCode
  throw error
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
    _setError(applicationStore, response.statusCode)
    return
  }
  const studyProgramme = response.body
  applicationStore.setStudyProgramme(studyProgramme)

  const { id: studyProgrammeId } = studyProgramme
  await koppsApi.listCurriculums(studyProgrammeId, lang)
  // applicationStore.setCurriculums(curriculums)

  const mandatoryCourse = {
    code: 'M2021',
    name: lang === 'en' ? 'Test manadatory course, year 1' : 'Test obligatorisk kurs, år 1',
    credits: 7.5,
    creditAbbr: 'hp',
    level: lang === 'en' ? 'First cycle' : 'Grundnivå',
  }
  const conditionallyElectiveCourse = {
    code: 'M2021',
    name: lang === 'en' ? 'Test elective course, year 1' : 'Test villkorligt valfri kurs, år 1',
    credits: 7.5,
    creditAbbr: 'hp',
    level: lang === 'en' ? 'First cycle' : 'Grundnivå',
  }
  const supplementaryInfo =
    lang === 'en'
      ? '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu varius tortor. In vel lacus dapibus, sagittis nulla et, congue quam. Quisque at lorem velit. Etiam dignissim et neque a efficitur. Nunc quis leo sit amet diam ultrices pellentesque. Etiam vel posuere tellus. Nulla sagittis mollis viverra. Maecenas feugiat suscipit congue. Ut varius, turpis nec dapibus congue, urna turpis malesuada sapien, sit amet porta mauris dui non dui. Aliquam sagittis augue tortor, vel molestie augue luctus quis. Sed malesuada velit purus, vel viverra magna tincidunt ut. In ex arcu, porttitor eget ex vel, finibus tristique nunc. Aliquam eu maximus nulla.</p>'
      : '<p>Löksås ipsum icke i vidsträckt blivit regn rot det tid, denna omfångsrik åker därmed och enligt vemod blivit träutensilierna, det sjö där stora hans vi bra ser. Själv omfångsrik del det sax nya blev både ska det äng strand tre, mjuka hwila för annan har och färdväg det göras sitt. Inom stig groda sorgliga söka åker sorgliga dock, precis tiden sorgliga genom tid smultron, hela jäst det genom gamla för.</p>'

  const conditionallyElectiveCoursesInfo =
    lang === 'en'
      ? '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu varius tortor. In vel lacus dapibus, sagittis nulla et, congue quam. Quisque at lorem velit. Etiam dignissim et neque a efficitur. Nunc quis leo sit amet diam ultrices pellentesque. Etiam vel posuere tellus. Nulla sagittis mollis viverra. Maecenas feugiat suscipit congue. Ut varius, turpis nec dapibus congue, urna turpis malesuada sapien, sit amet porta mauris dui non dui. Aliquam sagittis augue tortor, vel molestie augue luctus quis. Sed malesuada velit purus, vel viverra magna tincidunt ut. In ex arcu, porttitor eget ex vel, finibus tristique nunc. Aliquam eu maximus nulla.</p>'
      : '<p>Löksås ipsum icke i vidsträckt blivit regn rot det tid, denna omfångsrik åker därmed och enligt vemod blivit träutensilierna, det sjö där stora hans vi bra ser. Själv omfångsrik del det sax nya blev både ska det äng strand tre, mjuka hwila för annan har och färdväg det göras sitt. Inom stig groda sorgliga söka åker sorgliga dock, precis tiden sorgliga genom tid smultron, hela jäst det genom gamla för.</p>'

  applicationStore.setElectiveConditionCourse(mandatoryCourse, 'O', 1, 'Common')
  applicationStore.setElectiveConditionCourse(conditionallyElectiveCourse, 'VV', 1, 'Common')
  applicationStore.setSupplementaryInfo(supplementaryInfo, 1, 'Common')
  applicationStore.setConditionallyElectiveCoursesInfo(conditionallyElectiveCoursesInfo, 1, 'Common')
  applicationStore.setElectiveConditionCourse(mandatoryCourse, 'O', 1, 'MAFY')
  applicationStore.setElectiveConditionCourse(conditionallyElectiveCourse, 'VV', 1, 'MAFY')
  applicationStore.setSupplementaryInfo(supplementaryInfo, 1, 'MAFY')
  applicationStore.setConditionallyElectiveCoursesInfo(conditionallyElectiveCoursesInfo, 1, 'MAFY')
  applicationStore.addStudyYear(1)
  applicationStore.setElectiveConditionCourse(mandatoryCourse, 'O', 1, 'MAKE')
  applicationStore.setSupplementaryInfo(supplementaryInfo, 1, 'MAKE')
  applicationStore.setElectiveConditionCourse(mandatoryCourse, 'O', 2, 'MAKE')
  applicationStore.setSupplementaryInfo(supplementaryInfo, 2, 'MAKE')
  applicationStore.setConditionallyElectiveCoursesInfo(conditionallyElectiveCoursesInfo, 2, 'MAKE')
  applicationStore.setSpecializations([
    { code: 'MAFY', title: 'Mathematics and Physics', studyYears: [1] },
    { code: 'MAKE', title: 'Mathematics and Chemistry', studyYears: [1, 2] },
  ])

  const departmentBreadCrumbItem = {
    url: programmeLink(browserConfig.proxyPrefixPath.uri, programmeCode, lang),
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
