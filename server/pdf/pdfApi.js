const axios = require('axios')
const log = require('@kth/log')
const { server: serverConfig } = require('../configuration')

const getPDFContent = async body => {
  const { uri } = serverConfig.programSyllabusForPDF
  const { key } = serverConfig.programSyallbusKeyForPDF
  try {
    log.info('Going to call pdf function to convert syllabus htmls to blob data as PDF')
    log.info('PDF Server URL : ' + uri)
    const response = await axios.post(uri, body, {
      headers: {
        'Ocp-Apim-Subscription-Key': key,
        'Content-Type': 'application/json',
      },
      responseType: 'arraybuffer',
    })
    const { data } = response
    log.info('Successfully converted htmls to blob for PDF')
    return data
  } catch (error) {
    log.error('Exception calling Azure Function for PDF in pdfApi.getPDFContent', { error })
    throw error
  }
}

module.exports = {
  getPDFContent,
}
