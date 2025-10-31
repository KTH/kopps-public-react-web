import { SearchResponse } from 'kopps-public-react-web/shared/SearchTypes'
import { ERROR_ASYNC } from '../hooks/types/UseCourseSearchTypes'
import { CourseSearchParams } from '../pages/types/searchPageTypes'

export async function courseSearch(
  language: string,
  proxyUrl: string,
  params: CourseSearchParams
): Promise<SearchResponse> {
  try {
    // Constructing the URL with query parameters
    const baseUrl = new URL(proxyUrl, window.location.origin).href
    const url = new URL(`${baseUrl}/intern-api/sok/${language}`)

    for (const [key, value] of Object.entries(params)) {
      if (Array.isArray(value)) {
        value.forEach((item: any) => url.searchParams.append(`${key}[]`, item))
      } else {
        url.searchParams.append(key, value)
      }
    }

    // Making the request using fetch
    const response = await fetch(url.toString())

    if (!response.ok) {
      return {
        errorCode: ERROR_ASYNC.rejected,
        // errorCode: 'ERROR-courseSearch-' + response.status, // TODO Benni fix this properly useCourseSearch.ts
      }
    }

    const jsonResponse: SearchResponse = await response.json()

    return jsonResponse
  } catch (error: any) {
    if (error instanceof Error) {
      throw new Error('Unexpected error from courseSearch-' + error.message)
    }
    throw error
  }
}
