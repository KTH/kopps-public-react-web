// @ts-check

const log = require('kth-node-log')
const language = require('kth-node-web-common/lib/language')

const { browser: browserConfig, server: serverConfig } = require('../configuration')
const i18n = require('../../i18n')

const koppsApi = require('../kopps/koppsApi')

const { getServerSideFunctions } = require('../utils/serverSideRendering')

const { departmentLink } = require('../../domain/links')

/**
 * @param {string} departmentName
 * @param {string} lang
 * @returns {object}
 */
function _metaTitleAndDescription(departmentName, lang) {
  const metaTitle = `${i18n.message('courses', lang)} ${departmentName}`

  return { metaTitle, metaDescription: '' }
}

/**
 * @param {object} options.applicationStore
 * @param {string} options.lang
 * @param {string} options.departmentCode
 * @param {string} departmentName
 */
function _fillBreadcrumbsDynamicItems({ applicationStore, lang, departmentCode }, departmentName) {
  const departmentBreadCrumbItem = {
    url: departmentLink(departmentCode, lang),
    label: departmentName,
  }
  applicationStore.setBreadcrumbsDynamicItems([departmentBreadCrumbItem])
}

/**
 * @param {object} options.applicationStore
 * @param {string} options.lang
 */
function _fillStoreWithBasicConfig({ applicationStore, lang }) {
  applicationStore.setLanguage(lang)
  applicationStore.setBrowserConfig(browserConfig)
}

/**
 * @param {object} options.applicationStore
 * @param {string} options.lang
 * @param {string} options.departmentCode
 * @returns {string}
 */
async function _fetchAndFillDepartmentCourses({ applicationStore, lang, departmentCode }) {
  log.info('Fetching department courses from KOPPs API', { departmentCode })

  const { departmentCourses, statusCode } = await koppsApi.getCourses({ departmentCode, lang })
  applicationStore.setStatusCode(statusCode)
  if (statusCode !== 200) {
    log.debug('Failed to fetch department courses from KOPPs api', { departmentCode })
    return
  }
  log.info('Successfully fetched department courses from KOPPs API', { departmentCode })

  const { department: departmentName = '', courses } = departmentCourses
  applicationStore.setDepartmentName(departmentName)
  applicationStore.setDepartmentCourses(courses)
  return departmentName
}

async function getIndex(req, res, next) {
  try {
    const lang = language.getLanguage(res)
    const { departmentCode } = req.params

    const { createStore, getCompressedStoreCode, renderStaticPage } = getServerSideFunctions()

    log.info(`Creating a default application store for department controller`, { departmentCode })

    const applicationStore = createStore()

    const options = { applicationStore, lang, departmentCode }
    log.debug(`Starting to fill a default application store, for department controller`, { departmentCode })
    const departmentName = await _fetchAndFillDepartmentCourses(options)
    await _fillStoreWithBasicConfig(options)
    await _fillBreadcrumbsDynamicItems(options, departmentName)

    const compressedStoreCode = getCompressedStoreCode(applicationStore)
    log.info(`Default store was filled in and compressed on server side`, { departmentCode })

    const { department: proxyPrefix } = serverConfig.proxyPrefixPath
    const html = renderStaticPage({ applicationStore, location: req.url, basename: proxyPrefix })
    const { metaTitle: title, metaDescription: description } = _metaTitleAndDescription(departmentName, lang)
    res.render('app/index', {
      html,
      title,
      compressedStoreCode,
      description,
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
