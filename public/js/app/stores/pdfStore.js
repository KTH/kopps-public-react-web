function setProgrammeNameInOtherLanguage(programmeNameInOtherLanguage) {
  this.programmeNameInOtherLanguage = programmeNameInOtherLanguage
}

function setCredits(credits) {
  this.credits = credits
}

function setEducationalLevel(educationalLevel) {
  this.educationalLevel = educationalLevel
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
    /**
     * @property {string} credits
     */
    educationalLevel: null,
    /**
     * @method
     * @param {string} setEducationalLevel
     */
    setEducationalLevel,
  }
  return pdfStore
}

export default createPdfStore
