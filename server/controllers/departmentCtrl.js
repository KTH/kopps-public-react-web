// @ts-check

const log = require('kth-node-log')
const language = require('kth-node-web-common/lib/language')

const { browser: browserConfig, server: serverConfig } = require('../configuration')
const i18n = require('../../i18n')

const koppsApi = require('../kopps/koppsApi')

const { getServerSideFunctions } = require('../utils/serverSideRendering')

const { departmentLink } = require('../../domain/links')

async function _fillApplicationStoreOnServerSide({ applicationStore, lang, departmentCode }) {
  applicationStore.setLanguage(lang)
  applicationStore.setBrowserConfig(browserConfig)

  const departmentCourses = await koppsApi.getCourses({ departmentCode, lang })
  const { department: departmentName, courses } = departmentCourses
  applicationStore.setDepartmentName(departmentName)
  applicationStore.setDepartmentCourses(courses)

  const departmentBreadCrumbItem = {
    url: departmentLink(departmentCode, lang),
    label: departmentName,
  }
  applicationStore.setBreadcrumbsDynamicItems([departmentBreadCrumbItem])
}

async function getIndex(req, res, next) {
  try {
    const lang = language.getLanguage(res)
    const { departmentCode } = req.params

    const { createStore, getCompressedStoreCode, renderStaticPage } = getServerSideFunctions()

    const applicationStore = createStore()
    await _fillApplicationStoreOnServerSide({ applicationStore, lang, departmentCode })
    const compressedStoreCode = getCompressedStoreCode(applicationStore)

    const proxyPrefix = serverConfig.proxyPrefixPath.department
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
