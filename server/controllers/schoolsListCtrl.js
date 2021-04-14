// @ts-check

const log = require('kth-node-log')
const language = require('kth-node-web-common/lib/language')

const i18n = require('../../i18n')

const koppsApi = require('../kopps/koppsApi')
const serverConfig = require('../configuration').server

const { getServerSideFunctions } = require('../utils/serverSideRendering')

const _deprecatedSchools = {
  sv: [
    'Datavetenskap och kommunikation',
    'Elektro- och systemteknik',
    'Informations- och kommunikationsteknik',
    'Kemivetenskap',
    'Teknik och hälsa',
    'Teknikvetenskaplig kommunikation och lärande',
  ],
  en: [
    'Chemical Science and Engineering',
    'Computer Science and Communication',
    'Education and Communication in Engineering Science',
    'Electrical Engineering',
    'Information and Communication Technology',
    'Technology and Health',
  ],
}

function _compareSchools(a, b) {
  if (a.name < b.name) {
    return -1
  }
  if (a.name > b.name) {
    return 1
  }
  return 0
}

function _filterOutDeprecatedSchools(schoolsWithDepartments, lang) {
  const deprecatedSchoolsWithDepartments = schoolsWithDepartments.filter(school =>
    _deprecatedSchools[lang].includes(school.name)
  )
  const currentSchoolsWithDepartments = schoolsWithDepartments.filter(
    school => !_deprecatedSchools[lang].includes(school.name)
  )
  return {
    deprecatedSchoolsWithDepartments,
    currentSchoolsWithDepartments,
  }
}

async function _fillApplicationStoreOnServerSide({ applicationStore, lang }) {
  applicationStore.setLanguage(lang)
  const listForActiveCourses = true
  const params = { departmentCriteria: koppsApi.DEPARTMENT_CRITERIA.HAS_COURSES, listForActiveCourses, lang }
  const schoolsWithDepartments = await koppsApi.listSchoolsWithDepartments(params)
  const { currentSchoolsWithDepartments, deprecatedSchoolsWithDepartments } = _filterOutDeprecatedSchools(
    schoolsWithDepartments,
    lang
  )
  deprecatedSchoolsWithDepartments.sort(_compareSchools)
  currentSchoolsWithDepartments.sort(_compareSchools)
  applicationStore.setCurrentSchoolsWithDepartments(currentSchoolsWithDepartments)
  applicationStore.setDeprecatedSchoolsWithDepartments(deprecatedSchoolsWithDepartments)
}

async function getSchoolsList(req, res, next) {
  try {
    const lang = language.getLanguage(res)

    const { createStore, getCompressedStoreCode, renderStaticPage } = getServerSideFunctions()

    const applicationStore = createStore()
    await _fillApplicationStoreOnServerSide({ applicationStore, lang })
    const compressedStoreCode = getCompressedStoreCode(applicationStore)

    const { uri: proxyPrefix } = serverConfig.proxyPrefixPath
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
  getSchoolsList,
  _filterOutDeprecatedSchools,
  _deprecatedSchools,
}
