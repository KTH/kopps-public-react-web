// @ts-check

const log = require('kth-node-log')
const language = require('kth-node-web-common/lib/language')

const i18n = require('../../i18n')

const koppsApi = require('../kopps/koppsApi')
const serverConfig = require('../configuration').server

const { getServerSideFunctions } = require('../utils/serverSideRendering')
const { find: findProgrammeGroupHeading } = require('../utils/programmeGroupHeading')

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

function _validProgramme(programme) {
  return programme && Object.keys(programme).length !== 0
}

function _addCategorizedProgramme(c, programme, degree) {
  const categorized = c
  const heading = findProgrammeGroupHeading(programme, degree)
  if (!categorized[heading]) {
    categorized[heading] = { first: [], second: [] }
  }
  if (programme.lastAdmissionTerm) {
    categorized[heading].second.push(programme)
  } else {
    categorized[heading].first.push(programme)
  }
  return categorized
}

function _sortCategorizedProgrammes(categorized) {
  Object.values(categorized).forEach(({ first, second }) => {
    _sortProgrammes(first)
    _sortProgrammes(second)
  })
}

function _categorizeProgrammes(programmes) {
  let categorized = {}
  programmes.forEach(programme => {
    if (!_validProgramme(programme)) return
    const { degrees } = programme
    if (Array.isArray(degrees)) {
      degrees.forEach(degree => {
        categorized = _addCategorizedProgramme(categorized, programme, degree)
      })
    } else {
      categorized = _addCategorizedProgramme(categorized, programme)
    }
  })
  _sortCategorizedProgrammes(categorized)
  return categorized
}

async function _fillApplicationStoreOnServerSide({ applicationStore, lang }) {
  applicationStore.setLanguage(lang)
  const programmes = await koppsApi.listProgrammes(lang)
  const programmesByDegree = _categorizeProgrammes(programmes)
  applicationStore.setProgrammes(programmesByDegree)
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
  _categorizeProgrammes,
  _sortProgrammes,
}
