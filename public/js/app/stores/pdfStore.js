function setProgrammeNameInOtherLanguage(programmeNameInOtherLanguage) {
  this.programmeNameInOtherLanguage = programmeNameInOtherLanguage
}

function setCredits(credits) {
  this.credits = credits
}

function createPdfStore() {
  const pdfStore = {
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
