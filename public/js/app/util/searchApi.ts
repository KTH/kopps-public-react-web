// Importing fetch
// Note: fetch is natively available in modern browsers and Node.js (with a fetch polyfill if needed).

import { CourseSearchParams, CourseSearchResult } from "./types/SearchApiTypes"

export async function courseSearch(
  language: string,
  proxyUrl: string,
  params: CourseSearchParams
): Promise<CourseSearchResult | string> {
  try {
    // Constructing the URL with query parameters
    const baseUrl = new URL(proxyUrl, window.location.origin).href
    const url = new URL(`${baseUrl}/intern-api/sokBeta/${language}`)
    Object.keys(params).forEach(key => {
      if (Array.isArray(params[key])) {
        params[key].forEach((item: any) => url.searchParams.append(`${key}[]`, item))
      } else {
        url.searchParams.append(key, params[key])
      }
    })

    // Making the request using fetch
    const response = await fetch(url.toString())

    if (!response.ok) {
      return 'ERROR-courseSearch-' + response.status
    }

    const data: CourseSearchResult | string = await response.json()
    return data
  } catch (error: any) {
    if (error instanceof Error) {
      throw new Error('Unexpected error from courseSearch-' + error.message)
    }
    throw error
  }
}
