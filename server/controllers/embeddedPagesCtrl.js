'use strict'

const { searchFovCourses, listActiveMainFieldsOfStudy } = require('../kopps/koppsApi')
const { convertUserOptionsToKoppsApiParams, constants, searchOptionsTerms } = require('../../domain/fovsearch')

// eslint-disable-next-line no-unused-vars
async function _fovSearch(req, res, next) {
  const { COURSE_TYPES, STUDY_PACES } = constants

  const { query: queryParams } = req
  queryParams.l = queryParams.l || 'sv-SE'
  queryParams.type = queryParams.type || 'ALL'
  queryParams.start = queryParams.start || ''
  queryParams.mainsubject = queryParams.mainsubject || ''
  queryParams.studypace = queryParams.studypace || ''

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

  const fovCoursesResults = await searchFovCourses(convertUserOptionsToKoppsApiParams(queryParams))
  // Note that string sort is used for dates here. This should be ok since leading 0:oes on months or dates are never omitted.
  fovCoursesResults.sort((e1, e2) => e1.startDate.localeCompare(e2.startDate))
  const mfosOptions = await listActiveMainFieldsOfStudy()

  res.render('embedded/fovsearch', {
    layout: false, // No kth menu, no breadcrumbs, etc.
    title: 'fovsearch',
    description: '',
    fovCoursesResults,
    mfosOptions,
    courseTypes: COURSE_TYPES,
    termOptions: searchOptionsTerms(),
    studyPaceOptions: STUDY_PACES,
    queryParams,
    klaroAnalyticsConsentCookie,
  })
}

/*
 * ----------------------------------------------------------------
 * Publicly exported functions.
 * ----------------------------------------------------------------
 */

module.exports = {
  emptyFovSearch: _fovSearch,
  fovSearch: _fovSearch,
}
