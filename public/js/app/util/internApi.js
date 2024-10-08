import axios from 'axios'

// eslint-disable-next-line consistent-return
async function koppsCourseSearch(language, proxyUrl, params) {
  try {
    const result = await axios.get(`${proxyUrl}/intern-api/sok/${language}`, {
      params,
    })
    if (result) {
      if (result.status >= 400) {
        return 'ERROR-courseSearch-' + result.status
      }
      const { data } = result
      return data
    }
  } catch (error) {
    if (error.response) {
      throw new Error('Unexpected error from courseSearch-' + error.message)
    }
    throw error
  }
}

export default koppsCourseSearch
