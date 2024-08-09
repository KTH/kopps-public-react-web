// Importing fetch
// Note: fetch is natively available in modern browsers and Node.js (with a fetch polyfill if needed).

export interface KoppsCourseSearchParams {
  [key: string]: any // Allowing any key-value pair as params
}

export interface KoppsCourseSearchResult {
  searchHits?: {
    searchHitInterval?: any
    course: any
  }[]
  errorCode?: string
}

export async function koppsCourseSearch(
  language: string,
  proxyUrl: string,
  params: KoppsCourseSearchParams
): Promise<KoppsCourseSearchResult | string> {
  try {
    // Constructing the URL with query parameters
    const baseUrl = new URL(proxyUrl, window.location.origin).href
    const url = new URL(`${baseUrl}/intern-api/sok/${language}`)
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
      return 'ERROR-koppsCourseSearch-' + response.status
    }

    const data: KoppsCourseSearchResult | string = await response.json()
    return data
  } catch (error: any) {
    if (error instanceof Error) {
      throw new Error('Unexpected error from koppsCourseSearch-' + error.message)
    }
    throw error
  }
}
