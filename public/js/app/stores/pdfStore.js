function setProgrammeNameInOtherLanguage(programmeNameInOtherLanguage) {
  this.programmeNameInOtherLanguage = programmeNameInOtherLanguage
}

function setCredits(credits) {
  this.credits = credits
}

function setPdfFunctionURL(pdfFunctionURL) {
  this.pdfFunctionURL = pdfFunctionURL
}

function createPdfStore() {
  const pdfStore = {
    /**
     * @property {string} pdfFunctionURL
     */
    pdfFunctionURL: null,
    /**
     * @method
     * @param {string} setPdfFunctionURL
     */
    setPdfFunctionURL,
    /**
     * @property {string} programmeNameInOtherLanguage
     */
    programmeNameInOtherLanguage: null,
    /**
     * @method
     * @param {string} setProgrammeNameInOtherLanguage
     */
    setProgrammeNameInOtherLanguage,
    /**
     * @property {string} credits
     */
    credits: 0,
    /**
     * @method
     * @param {number} setCredits
     */
    setCredits,
  }
  return pdfStore
}

export default createPdfStore
