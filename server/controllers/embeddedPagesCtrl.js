'use strict'

const { searchFovCourses } = require('../kopps/koppsApi')
const language = require('kth-node-web-common/lib/language')
const { convertUserOptionsToKoppsApiParams } = require('../../domain/fovsearch')

async function _fovSearch(req, res, next) {
  const lang = language.getLanguage(res)
  const fovCoursesResults = await searchFovCourses(convertUserOptionsToKoppsApiParams(req.query))
  res.render('embedded/fovsearch', {
    layout: false, // No kth menu, no breadcrumbs, etc.
    title: 'fovsearch',
    description: '',
    breadcrumbsPath: [],
    lang,
    fovCoursesResults,
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
