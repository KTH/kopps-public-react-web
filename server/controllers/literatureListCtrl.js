// @ts-check

const log = require('kth-node-log')
const language = require('kth-node-web-common/lib/language')

const { browser: browserConfig, server: serverConfig } = require('../configuration')
const i18n = require('../../i18n')

const koppsApi = require('../kopps/koppsApi')

const { getServerSideFunctions } = require('../utils/serverSideRendering')
const { compareSchools, filterOutDeprecatedSchools } = require('../utils/schools')

async function _fillApplicationStoreOnServerSide({ applicationStore, lang, term, school}) {
  applicationStore.setLanguage(lang)
  applicationStore.setBrowserConfig(browserConfig)

  applicationStore.setSelectedSchoolCode(school)
  applicationStore.setSelectedTerm(term)

  const schools = await koppsApi.listSchools({lang})
  schools.sort(compareSchools)
  applicationStore.setSchools(schools);

  const literature = await koppsApi.literatureForCourse({school, term, lang})
  literature.sort((a, b) => {
    if (a.courseCode < b.courseCode) {
      return -1
    } else if (a.courseCode > b.courseCode)  {
      return 1
    } else {
      return 0
    }
  })
  applicationStore.setLiterature(literature)
}

async function getLiteratureList(req, res, next) {
  try {
    const lang = language.getLanguage(res)

    const { createStore, getCompressedStoreCode, renderStaticPage } = getServerSideFunctions()

    const applicationStore = createStore('literatureList')
    await _fillApplicationStoreOnServerSide({ applicationStore, lang, ...req.params })
    const compressedStoreCode = getCompressedStoreCode(applicationStore)

    const proxyPrefix = serverConfig.proxyPrefixPath.literatureList
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
  getLiteratureList,
}
