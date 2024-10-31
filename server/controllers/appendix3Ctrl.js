const log = require('@kth/log')
const language = require('@kth/kth-node-web-common/lib/language')
const marked = require('marked')

const { server: serverConfig } = require('../configuration')

const { createProgrammeBreadcrumbs } = require('../utils/breadcrumbUtil')
const { getServerSideFunctions } = require('../utils/serverSideRendering')
const { getUtbildningsplan } = require('../ladok/ladokApi')

const { fillStoreWithQueryParams } = require('../stores/programmeStoreSSR')

/**
 * Appendix 3 is a temporary page for PoC of showing migrated course lists from Ladok.
 *
 * This only work to few programmes (see constants below) that have been migrated manually.
 *
 * This is basically a copy and the simplified version of Appendix 1.
 */

const pocPlans = [
  { semester: '20192', code: 'CDATE', uid: 'e9e65959-96bc-11ef-94d8-21d0ded04312' },
  { semester: '20192', code: 'CLGYM', uid: 'dd518e50-96d3-11ef-94d8-21d0ded04312' },
  { semester: '20192', code: 'TINNM', uid: '0dcb126b-96d4-11ef-94d8-21d0ded04312' },
  { semester: '20212', code: 'CDATE', uid: '2bec9abf-9757-11ef-a63a-d1969a1f4db0' },
  { semester: '20212', code: 'CLGYM', uid: '9a442d48-9758-11ef-a63a-d1969a1f4db0' },
  { semester: '20212', code: 'TINNM', uid: '969d1d84-9758-11ef-a63a-d1969a1f4db0' },
  { semester: '20242', code: 'CDATE', uid: '9d8f1249-9758-11ef-a63a-d1969a1f4db0' },
  { semester: '20242', code: 'CLGYM', uid: 'e875b8a0-9758-11ef-a63a-d1969a1f4db0' },
  { semester: '20242', code: 'TINNM', uid: 'f0ad7414-9758-11ef-a63a-d1969a1f4db0' },
]

const insertCourseLinks = markdown =>
  (markdown || '').replaceAll(/\\n| ([A-Z0-9]{6}) \|/g, '[$1](/student/kurser/kurs/$1) |')

async function getIndex(req, res, next) {
  try {
    const lang = language.getLanguage(res)
    const { programmeCode, term } = req.params
    const programmeName = ''

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
    const storeId = 'appendix3'
    log.info(`Creating an application store ${storeId}`)

    const applicationStore = createStore(storeId)
    const options = { applicationStore, lang, programmeCode, term }
    const pocPlanInfo = pocPlans.find(x => x.code === programmeCode && x.semester === term)

    if (pocPlanInfo) {
      const uid = pocPlanInfo.uid

      marked.setOptions({ gfm: true })

      const plan = await getUtbildningsplan(uid, 'sv')

      applicationStore.setCourseListLadok({
        info: plan.courseList.info,
        year1: marked.parse(insertCourseLinks(plan.courseList.year1)),
        year2: marked.parse(insertCourseLinks(plan.courseList.year2)),
        year3: marked.parse(insertCourseLinks(plan.courseList.year3)),
        year4: marked.parse(insertCourseLinks(plan.courseList.year4)),
        year5: marked.parse(insertCourseLinks(plan.courseList.year5)),
      })
    } else {
      applicationStore.setCourseListLadok({
        info: 'Koppling till kurslista i ladok saknas',
      })
    }

    fillStoreWithQueryParams(options)

    const compressedStoreCode = getCompressedStoreCode(applicationStore)
    // const { programmeName } = await fetchAndFillProgrammeDetails(options, storeId)

    const { programme: basename, uri: proxyPrefix } = serverConfig.proxyPrefixPath
    const view = renderStaticPage({ applicationStore, location: req.url, basename: basename })

    const breadcrumbsList = createProgrammeBreadcrumbs(lang, programmeName, programmeCode)

    res.render('app/index', {
      html: view,
      title: 'title',
      description: 'description',
      compressedStoreCode,
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
  getIndex,
}
