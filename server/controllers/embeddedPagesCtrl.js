'use strict'

const { searchFovCourses, listActiveMainFieldsOfStudy } = require('../kopps/koppsApi')
const {
  convertUserOptionsToKoppsApiParams,
  constants,
  searchOptionsTerms,
  searchOptionStudyPaces,
} = require('../../domain/fovsearch')

async function _fovSearch(req, res, next) {
  const { COURSE_TYPES, STUDY_PACES } = constants

  const { query: queryParams } = req
  queryParams.l = queryParams.l || 'sv-SE'
  queryParams.type = queryParams.type || 'ALL'
  queryParams.start = queryParams.start || ''
  queryParams.mainsubject = queryParams.mainsubject || ''
  queryParams.studypace = queryParams.studypace || ''

  const fovCoursesResults = await searchFovCourses(convertUserOptionsToKoppsApiParams(queryParams))
  fovCoursesResults.sort((e1, e2) => e1.code.localeCompare(e2.code))
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
