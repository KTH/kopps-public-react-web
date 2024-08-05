import axios, { AxiosResponse } from 'axios'

export interface KoppsCourseSearchParams {
  [key: string]: any // Allowing any key-value pair as params
}

export interface KoppsCourseSearchResult {
  searchHits?: Array<{ [key: string]: any }>
  errorCode?: string
}

export async function koppsCourseSearch(
  language: string,
  proxyUrl: string,
  params: KoppsCourseSearchParams
): Promise<KoppsCourseSearchResult | string> {
  try {
    const result: AxiosResponse<KoppsCourseSearchResult | string> = await axios.get(`${proxyUrl}/intern-api/sok/${language}`, {
      params,
    })

    if (result.status >= 400) {
      return 'ERROR-koppsCourseSearch-' + result.status
    }

    return result.data
  } catch (error: any) {
    if (error.response) {
      throw new Error('Unexpected error from koppsCourseSearch-' + error.message)
    }
    throw error
  }
}