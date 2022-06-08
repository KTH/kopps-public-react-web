import axios from 'axios'

// eslint-disable-next-line consistent-return
async function generateProgramSyllabus(url, listOfHtmls, programmeCode, term, baseURl) {
  try {
    const requestBody = {
      pages: listOfHtmls,
      baseUrl: baseURl,
      course: programmeCode + '-' + term + '.pdf | KTH',
    }
    const result = await axios.post(url, requestBody, {
      responseType: 'blob',
    })
    if (result) {
      if (result.status >= 400) {
        return 'ERROR-PDF-' + result.status
      }
      const { data } = result
      return data
    }
  } catch (error) {
    if (error.response) {
      throw new Error('Unexpected error from PDF Azure Function ' + error.message)
    }
    throw error
  }
}

export default generateProgramSyllabus
