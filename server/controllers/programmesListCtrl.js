// @ts-check

const log = require('@kth/log')
const language = require('@kth/kth-node-web-common/lib/language')

const { browser: browserConfig, server: serverConfig } = require('../configuration')
const i18n = require('../../i18n')

const koppsApi = require('../kopps/koppsApi')

const { getServerSideFunctions } = require('../utils/serverSideRendering')
const { programmeGroupHeadings, find: findProgrammeGroupHeading } = require('../../domain/programmeGroupHeading')

function _compareProgrammes(a, b) {
  if (a.title.toLowerCase() < b.title.toLowerCase()) {
    return -1
  }
  if (a.title.toLowerCase() > b.title.toLowerCase()) {
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
  const categorized = new Map(c)
  const heading = findProgrammeGroupHeading(programme, degree)
  if (!categorized.has(heading)) return categorized
  if (programme.lastAdmissionTerm) {
    // Program utan nyantagning
    categorized.get(heading).second.push(programme)
  } else {
    categorized.get(heading).first.push(programme)
  }
  return categorized
}

function _sortCategorizedProgrammes(categorized) {
  for (const { first, second } of categorized.values()) {
    _sortProgrammes(first)
    _sortProgrammes(second)
  }
}

function _initCategorized() {
  const categorized = new Map()
  programmeGroupHeadings.forEach(heading => {
    categorized.set(heading, { first: [], second: [] })
  })
  return categorized
}

function _categorizeProgrammes(programmes) {
  let categorized = _initCategorized()
  programmes.forEach(programme => {
    if (!_validProgramme(programme)) return
    const { degrees } = programme
    if (Array.isArray(degrees) && degrees.length) {
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
  applicationStore.setBrowserConfig(browserConfig)
  log.info('Fetching programmes from KOPPs API')

  const { programmes, statusCode } = await koppsApi.listProgrammes(lang)
  applicationStore.setStatusCode(statusCode)

  if (statusCode !== 200) {
    log.info('Failed to fetch programmes')
    return
  }
  log.info('Successfully fetched programmes')

  const programmesByDegree = _categorizeProgrammes(programmes)
  applicationStore.setProgrammes(programmesByDegree)
}

async function getProgrammesList(req, res, next) {
  try {
    const lang = language.getLanguage(res)

    const { createStore, getCompressedStoreCode, renderStaticPage } = getServerSideFunctions()

    log.info(`Creating a default application store for programmesList controller`)

    const applicationStore = createStore()
    log.debug(`Starting to fill a default application store, for programmesList controller`)

    await _fillApplicationStoreOnServerSide({ applicationStore, lang })
    const compressedStoreCode = getCompressedStoreCode(applicationStore)
    log.info('Default store was filled in and compressed on server side, for programmesList controller')

    const { programmesList: proxyPrefix } = serverConfig.proxyPrefixPath
    const html = renderStaticPage({ applicationStore, location: req.url, basename: proxyPrefix })
    const title = i18n.message('courses_of_program', lang)
    const description = i18n.message('programmes_list_lead', lang)

    res.render('app/index', {
      instrumentationKey: serverConfig?.appInsights?.instrumentationKey,
      html,
      title,
      compressedStoreCode,
      description,
      lang,
      proxyPrefix,
      studentWeb: true,
    })
  } catch (err) {
    log.error('Error', { error: err })
    next(err)
  }
}

module.exports = {
  getProgrammesList,
  _categorizeProgrammes,
  _sortProgrammes,
}
