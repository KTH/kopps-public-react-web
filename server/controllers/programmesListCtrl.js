const log = require('@kth/log')
const language = require('@kth/kth-node-web-common/lib/language')

const { browser: browserConfig, server: serverConfig } = require('../configuration')
const i18n = require('../../i18n')

const ladokApi = require('../ladok/ladokApi')

const { createBreadcrumbs } = require('../utils/breadcrumbUtil')
const { getServerSideFunctions } = require('../utils/serverSideRendering')
const { programmeGroupHeadings, findProgrammeGroupHeading } = require('../../domain/programmeGroupHeading')
const { isOldProgramme } = require('../../domain/oldProgrammes')

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

  if (programme.lastAdmissionTerm || isOldProgramme(programme.programType)) {
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

function _createProgrammeDisplayData(programme) {
  return {
    programmeCode: programme.kod,
    title: programme.benamning,
    titleOtherLanguage: programme.benamningOther,
    credits: Number(programme.omfattning?.number),
    formattedCredits: programme.omfattning?.formattedWithUnit,
    creditUnitAbbr: programme.creditUnitAbbr,
    educationalLevel: programme.eduLevel?.name,
    firstAdmissionTerm: programme.firstAdmissionSemester?.toKTHSemesterString(),
    lastAdmissionTerm: programme.sistaAntagningstermin?.toKTHSemesterString(),
    programType: programme.utbildningstyp?.code,
    degrees: programme.degrees,
  }
}

async function _fillApplicationStoreOnServerSide({ applicationStore, lang }) {
  applicationStore.setLanguage(lang)
  applicationStore.setBrowserConfig(browserConfig)
  log.info('Fetching programmes from KOPPs API')

  let programmes

  try {
    programmes = await ladokApi.getAllProgrammeVersions(lang)
    if (!programmes || !programmes.length) throw new Error('failed to fetch all programmes')
  } catch (error) {
    log.info('Failed to fetch programmes')
    return
  }
  applicationStore.setStatusCode(200)
  log.info('Successfully fetched programmes')

  programmes = programmes.map(_createProgrammeDisplayData)
  const programmesByDegree = _categorizeProgrammes(programmes)
  applicationStore.setProgrammes(programmesByDegree)
}

async function getProgrammesList(req, res, next) {
  try {
    const lang = language.getLanguage(res)

    let klaroAnalyticsConsentCookie = false
    if (req.cookies.klaro) {
      const consentCookiesArray = req.cookies.klaro.slice(1, -1).split(',')
      // eslint-disable-next-line prefer-destructuring
      const analyticsConsentCookieString = consentCookiesArray
        .find(cookie => cookie.includes('analytics-consent'))
        .split(':')[1]
      // eslint-disable-next-line no-const-assign
      klaroAnalyticsConsentCookie = analyticsConsentCookieString === 'true'
    }

    const { createStore, getCompressedStoreCode, renderStaticPage } = getServerSideFunctions()

    log.info(`Creating a default application store for programmesList controller`)

    const applicationStore = createStore()
    log.debug(`Starting to fill a default application store, for programmesList controller`)

    await _fillApplicationStoreOnServerSide({ applicationStore, lang })
    const compressedStoreCode = getCompressedStoreCode(applicationStore)
    log.info('Default store was filled in and compressed on server side, for programmesList controller')

    const { programmesList: basename, uri: proxyPrefix } = serverConfig.proxyPrefixPath
    const view = renderStaticPage({ applicationStore, location: req.url, basename: basename })
    const title = i18n.message('courses_of_program', lang)
    const description = i18n.message('programmes_list_lead', lang)
    const breadcrumbsList = createBreadcrumbs(lang)

    res.render('app/index', {
      html: view,
      title,
      compressedStoreCode,
      description,
      lang,
      proxyPrefix,
      toolbarUrl: serverConfig.toolbar.url,
      studentWeb: true,
      theme: 'student-web',
      klaroAnalyticsConsentCookie,
      breadcrumbsList,
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
