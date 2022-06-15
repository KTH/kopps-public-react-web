import axios from 'axios'

// eslint-disable-next-line consistent-return
async function generateProgramSyllabus(proxyUrl, requestBody) {
  try {
    const result = await axios.post(`${proxyUrl}/student/kurser/intern-api/PDFRenderFunction`, requestBody, {
      responseType: 'arraybuffer',
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
