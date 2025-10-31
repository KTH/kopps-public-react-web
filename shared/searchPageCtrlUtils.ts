import type { SearchParams, OmKursenLadokApiClient } from '@kth/om-kursen-ladok-client'
import { convertSummerToPeriods } from './periodSearchUtils'
import log from '@kth/log'
import { ResultType } from './ResultType'
import { SearchResponse } from './SearchTypes'

export const performCourseSearchTS = async (
  req,
  res,
  next,
  searchCourseInstances: OmKursenLadokApiClient['Search']['searchCourseInstances'],
  searchCourseVersions: OmKursenLadokApiClient['Search']['searchCourseVersions']
) => {
  const { lang } = req.params
  const { query } = req

  const semesterKthPeriods = query.period && convertSummerToPeriods(query.period)

  const searchParams: SearchParams = {
    kodEllerBenamning: query.pattern ? query.pattern : undefined,
    organisation: query.department ? query.department : undefined,
    sprak: query.showOptions?.includes('onlyEnglish') ? 'ENG' : undefined,
    avvecklad: query.showOptions?.includes('showCancelled') ? 'true' : undefined,
    utbildningsniva: query.eduLevel ?? undefined,
    onlyMHU: query.showOptions?.includes('onlyMHU') ? true : undefined,
    semesterKthPeriods,
  }

  try {
    log.debug(` trying to perform a search of courses with ${searchParams} transformed from parameters: `, { query })

    // TODO we should be able to return "no query restriction was specified" error already here (or even better in the client)

    let type: ResultType
    let apiResponse

    if (searchParams.sprak || searchParams.semesterKthPeriods) {
      apiResponse = await searchCourseInstances(searchParams, lang)
      type = ResultType.INSTANCE
    } else {
      apiResponse = await searchCourseVersions(searchParams, lang)
      type = ResultType.VERSION
    }

    log.debug(` performCourseSearch to '${type}' with searchParams:`, searchParams)

    const searchResponse: SearchResponse = {
      searchData: {
        results: apiResponse.searchHits,
        type,
      },
      errorCode: apiResponse.errorCode,
    }

    return res.json(searchResponse)
  } catch (error) {
    log.error(` Exception from performCourseSearch with ${searchParams}`, { error })
    return next(error)
  }
}
