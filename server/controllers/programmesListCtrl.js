// @ts-check

const log = require('kth-node-log')
const language = require('kth-node-web-common/lib/language')

const i18n = require('../../i18n')

const koppsApi = require('../kopps/koppsApi')
const serverConfig = require('../configuration').server

const { getServerSideFunctions } = require('../utils/serverSideRendering')

function _compareProgrammes(a, b) {
  if (a.title < b.title) {
    return -1
  }
  if (a.title > b.title) {
    return 1
  }
  if (a.firstAdmissionTerm < b.firstAdmissionTerm) {
    return -1
  }
  if (a.firstAdmissionTerm > b.firstAdmissionTerm) {
    return 1
  }
  if (a.programmeCode < b.programmeCode) {
    return -1
  }
  if (a.programmeCode > b.programmeCode) {
    return 1
  }
  return 0
}

function _sortProgrammes(programmes) {
  programmes.sort(_compareProgrammes)
  return programmes
}

async function _fillApplicationStoreOnServerSide({ applicationStore, lang }) {
  applicationStore.setLanguage(lang)
  const programmes = await koppsApi.listProgrammes(lang)
  const sortedProgrammes = _sortProgrammes(programmes)
  applicationStore.setProgrammes(sortedProgrammes)
}

async function getProgrammesList(req, res, next) {
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
  getProgrammesList,
  _sortProgrammes,
}
