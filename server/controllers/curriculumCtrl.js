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

async function _fillApplicationStoreOnServerSide({ applicationStore, lang, programmeCode, term, studyYear }) {
  applicationStore.setLanguage(lang)
  applicationStore.setBrowserConfig(browserConfig)
  applicationStore.setProgrammeCode(programmeCode)
  applicationStore.setTerm(term)
  applicationStore.setStudyYear(studyYear)

  const programme = await koppsApi.getProgramme(programmeCode, lang)
  const { title: programmeName } = programme

  applicationStore.setProgrammeName(programmeName)

  const departmentBreadCrumbItem = {
    url: programmeLink(browserConfig.proxyPrefixPath.uri, programmeCode, lang),
    label: programmeName,
  }
  applicationStore.setBreadcrumbsDynamicItems([departmentBreadCrumbItem])
}

async function getIndex(req, res, next) {
  try {
    const lang = language.getLanguage(res)
    const { programmeCode, term, studyYear } = req.params

    const { createStore, getCompressedStoreCode, renderStaticPage } = getServerSideFunctions()

    const applicationStore = createStore('curriculum')
    await _fillApplicationStoreOnServerSide({ applicationStore, lang, programmeCode, term, studyYear })
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
  getIndex,
}