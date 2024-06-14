const log = require('@kth/log')

const { stringifyKoppsSearchParams } = require('../../domain/searchParams')
const { searchCourses } = require('../api/ladok')

async function performCourseSearch(req, res, next) {
  const { lang } = req.params

  const { query } = req
  // Example: `text_pattern=${pattern}`
  const searchParamsStr = stringifyKoppsSearchParams(query)

  const { pattern } = query

  try {
    log.debug(` trying to perform a search of courses with ${searchParamsStr} transformed from parameters: `, { query })

    const apiResponse = await searchCourses(pattern, lang)

    // const apiResponse = {
    //   searchHits: [
    //     {
    //       courseCode: 'SF1689',
    //       title: 'Basic Course in Mathematics',
    //       credits: 6,
    //       creditUnitLabel: 'Credits',
    //       creditUnitAbbr: 'hp',
    //       educationalLevel: 'BASIC',
    //     },
    //   ]
    // }

    // const apiResponse = await koppsApi.getSearchResults(searchParamsStr, lang)
    log.debug(` performCourseSearch with ${searchParamsStr} response: `, apiResponse)
    return res.json(apiResponse)
  } catch (error) {
    log.error(` Exception from performCourseSearch with ${searchParamsStr}`, { error })
    next(error)
  }
}

module.exports = {
  performCourseSearch,
}
