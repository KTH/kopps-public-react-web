// @ts-check

const log = require('@kth/log')
const language = require('@kth/kth-node-web-common/lib/language')

const { server: serverConfig } = require('../configuration')
const i18n = require('../../i18n')

const koppsApi = require('../kopps/koppsApi')

const { getServerSideFunctions } = require('../utils/serverSideRendering')
const { fillStoreWithBasicConfig, fetchAndFillSchoolsList } = require('../stores/schoolsListStoreSSR')

/**
 * @param {object} options.applicationStore
 * @param {string} options.lang
 */
async function _fillApplicationStoreOnServerSide({ applicationStore, lang }) {
  fillStoreWithBasicConfig({ applicationStore, lang })

  const listForActiveCourses = true
  const params = { departmentCriteria: koppsApi.DEPARTMENT_CRITERIA.HAS_COURSES, listForActiveCourses, lang }
  await fetchAndFillSchoolsList(applicationStore, params)
}

async function getSchoolsList(req, res, next) {
  try {
    const lang = language.getLanguage(res)

    const { createStore, getCompressedStoreCode, renderStaticPage } = getServerSideFunctions()
    log.info(`Creating a default application store for schools with all-type courses`)

    const applicationStore = createStore()
    log.debug(`Starting to fill a default application store with all schools with any type of courses`)

    await _fillApplicationStoreOnServerSide({ applicationStore, lang })
    const compressedStoreCode = getCompressedStoreCode(applicationStore)
    log.info(`Default store was filled in and compressed on server side, for schools with all-type courses`)

    const { schoolsList: proxyPrefix } = serverConfig.proxyPrefixPath
    const html = renderStaticPage({ applicationStore, location: req.url, basename: proxyPrefix })
    const title = i18n.message('courses_by_school', lang)
    const description = i18n.message('departments_list_lead', lang)

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
    log.error('Error in getSchoolsList', { error: err })
    next(err)
  }
}

module.exports = {
  getSchoolsList,
}
