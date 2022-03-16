function setSpecializations(specializations) {
  this.specializations = specializations
}
function createAppendix2Store() {
  const appendix2Store = {
    /**
     * @property {[]} specializations
     */
    specializations: [],
    /**
     * @method
     * @param {[]} specializations
     */
    setSpecializations,
  }
  return appendix2Store
}

export default createAppendix2Store
