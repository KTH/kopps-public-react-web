const axios = require('axios')
const log = require('@kth/log')
const serverSettings = require('../../config/serverSettings')

const getPDFContent = async body => {
  const { uri } = serverSettings.programSyllabusForPDF
  const { key } = serverSettings.programSyallbusKeyForPDF
  try {
    const response = await axios.post(uri, body, {
      headers: {
        'Ocp-Apim-Subscription-Key': key,
        'Content-Type': 'application/json',
      },
      responseType: 'arraybuffer',
    })
    const { data } = response
    return data
  } catch (error) {
    log.error('Exception calling Azure Function for PDF in pdfApi.getPDFContent', { error })
    log.info('Exception calling Azure Function for PDF in pdfApi.getPDFContent', { error })
    throw error
  }
}

module.exports = {
  getPDFContent,
}
