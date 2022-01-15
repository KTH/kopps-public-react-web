// @ts-check

const log = require('kth-node-log')
const language = require('kth-node-web-common/lib/language')

const { server: serverConfig } = require('../configuration')
const i18n = require('../../i18n')

const koppsApi = require('../kopps/koppsApi')

const { getServerSideFunctions } = require('../utils/serverSideRendering')
const { compareSchools } = require('../../domain/schools')
const { fillStoreWithBasicConfig, fetchAndFillSchoolsList } = require('../stores/schoolsListStoreSSR')

/**
 * @param {object} options.applicationStore
 * @param {string} options.lang
 * @param {string} options.term
 * @param {string} options.school
 */
async function _fillApplicationStoreOnServerSide({ applicationStore, lang, term, school }) {
  fillStoreWithBasicConfig({ applicationStore, lang })

  applicationStore.setSelectedSchoolCode(school)
  applicationStore.setSelectedTerm(term)

  const schools = await koppsApi.listSchools({ lang })
  schools.sort(compareSchools)
  applicationStore.setSchools(schools)

  const literature = await koppsApi.literatureForCourse({ school, term, lang })
  literature.sort((a, b) => {
    if (a.courseCode < b.courseCode) {
      return -1
    }

    if (a.courseCode > b.courseCode) {
      return 1
    }

    return 0
  })
  applicationStore.setLiterature(literature)
}

async function getLiteratureList(req, res, next) {
  try {
    const lang = language.getLanguage(res)

    const { createStore, getCompressedStoreCode, renderStaticPage } = getServerSideFunctions()
    const { term, school } = req.params

    const storeId = 'literatureList'

    log.info(`Creating an application store ${storeId} on server side`, { term, school })

    const applicationStore = createStore(storeId)
    log.info(`Starting to fill in application store ${storeId} on server side `, { term, school })

    await _fillApplicationStoreOnServerSide({ applicationStore, lang, term, school })
    const compressedStoreCode = getCompressedStoreCode(applicationStore)

    const { literatureList: proxyPrefix } = serverConfig.proxyPrefixPath
    const html = renderStaticPage({ applicationStore, location: req.url, basename: proxyPrefix })

    const { heading, subHeading, intro, missing } = i18n.messages[lang === 'en' ? 0 : 1].literatureList

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
  getLiteratureList,
}
