'use strict'

const { searchFovCourses } = require('../koppsApi/setupKoppsApi')
const language = require('kth-node-web-common/lib/language')

async function _fovSearch(req, res, next) {
  const lang = language.getLanguage(res)
  const paramString = '' //TODO: hard coded for testing. Need to read query parameters and remap them to kopps api parameters.
  let searchOptions
  if (paramString) {
    searchOptions = paramString
      .split('&')
      .map(paramPairString => {
        const [, key, value] = /([a-zA-Z]+)=([a-zA-Z]+)/.exec(paramPairString)
        return { key, value }
      })
      .reduce((currentParams, { key, value }) => {
        currentParams[key] = value
        return currentParams
      }, {})
  } else {
    searchOptions = {}
  }
  const fovCoursesResults = await searchFovCourses(searchOptions)
  res.render('embedded/fovsearch', {
    title: 'TODO',
    description: 'TODO',
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
