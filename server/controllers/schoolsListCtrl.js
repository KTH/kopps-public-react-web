// @ts-check

const log = require('kth-node-log')
const language = require('kth-node-web-common/lib/language')

const { browser: browserConfig, server: serverConfig } = require('../configuration')
const i18n = require('../../i18n')

const koppsApi = require('../kopps/koppsApi')

const { getServerSideFunctions } = require('../utils/serverSideRendering')
const { compareSchools, filterOutDeprecatedSchools } = require('../utils/schools')

async function _fillApplicationStoreOnServerSide({ applicationStore, lang }) {
  applicationStore.setLanguage(lang)
  applicationStore.setBrowserConfig(browserConfig)
  const listForActiveCourses = true
  const params = { departmentCriteria: koppsApi.DEPARTMENT_CRITERIA.HAS_COURSES, listForActiveCourses, lang }
  const schoolsWithDepartments = await koppsApi.listSchoolsWithDepartments(params)
  const { currentSchoolsWithDepartments, deprecatedSchoolsWithDepartments } = filterOutDeprecatedSchools(
    schoolsWithDepartments,
    lang
  )
  deprecatedSchoolsWithDepartments.sort(compareSchools)
  currentSchoolsWithDepartments.sort(compareSchools)
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

    const proxyPrefix = serverConfig.proxyPrefixPath.schoolsList
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
    log.error('Error in getSchoolsList', { error: err })
    next(err)
  }
}

module.exports = {
  getSchoolsList,
}
