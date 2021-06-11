'use strict'

/**
 * Declares all of our different controllers and exposes them
 * with some sweet names.
 */
module.exports = {
  Search: require('./searchCtrl'),
  StudyHandBook: require('./studyHandBookCtrl'),
  System: require('./systemCtrl'),
  Sample: require('./sampleCtrl'),
  ThirdCycleStudy: require('./thirdCycleStudyCtrl'),
  Public: require('./publicSiteCtrl'),
  EmbeddedPage: require('./embeddedPagesCtrl'),
  ProgrammesList: require('./programmesListCtrl'),
  SchoolsList: require('./schoolsListCtrl'),
  Department: require('./departmentCtrl'),
  Programme: require('./programmeCtrl'),
  Curriculum: require('./curriculumCtrl'),
  Objectives: require('./objectivesCtrl'),
  Extent: require('./extentCtrl'),
  Eligibility: require('./eligibilityCtrl'),
  Implementation: require('./implementationCtrl'),
  Appendix1: require('./appendix1Ctrl'),
}
