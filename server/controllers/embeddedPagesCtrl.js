'use strict'

const { searchFovCourses } = require('../koppsApi/setupKoppsApi')
const language = require('kth-node-web-common/lib/language')

function _convertUserOptionsToKoppsApiParams({ type, start }) {
  const koppsApiParams = {
    category: 'VU',
    exludedTypes: 'SAP',
    lang: 'sv', // TODO: use lang from user of embedded html api.
  }
  if (!start || start === 'current') {
    koppsApiParams.date = new Date().toISOString() // TODO: not accurate to current KP behaviour.
  } else {
    koppsApiParams.term = parseInt(start)
  }
  switch (type) {
    case 'ALL':
    default:
      break
    case 'DISTANCE':
      koppsApiParams.tutoringForm = 'DST'
      break
    case 'ENGLISH':
      koppsApiParams.inEnglish = true
      break
    case 'EVENING':
      koppsApiParams.tutoringTime = 'KVÄ'
      break
    case 'ITDISTANCE':
      koppsApiParams.tutoringForm = 'ITD'
      break
    case 'SUMMER':
      koppsApiParams.category = null
      koppsApiParams.types = asList('SFV', 'SN\u00C4')
      break
    case 'TEACHER':
      koppsApiParams.teachersFurtherEdu = true
      break
  }

  return koppsApiParams
}

async function _fovSearch(req, res, next) {
  const lang = language.getLanguage(res)
  const fovCoursesResults = await searchFovCourses(_convertUserOptionsToKoppsApiParams(req.query))
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
