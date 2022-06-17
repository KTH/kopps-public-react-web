const axios = require('axios')
const log = require('@kth/log')
const { server: serverConfig } = require('../configuration')

const getPDFContent = async body => {
  const { uri } = serverConfig.programSyllabusForPDF
  const { key } = serverConfig.programSyallbusKeyForPDF
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
    throw error
  }
}

module.exports = {
  getPDFContent,
}
