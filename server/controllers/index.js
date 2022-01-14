'use strict'

/**
 * Declares all of our different controllers and exposes them
 * with some sweet names.
 */
module.exports = {
  Appendix1: require('./appendix1Ctrl'),
  Appendix2: require('./appendix2Ctrl'),
  Curriculum: require('./curriculumCtrl'),
  Department: require('./departmentCtrl'),
  Eligibility: require('./eligibilityCtrl'),
  EmbeddedPage: require('./embeddedPagesCtrl'),
  Extent: require('./extentCtrl'),
  Implementation: require('./implementationCtrl'),
  LiteratureList: require('./literatureListCtrl'),
  Objectives: require('./objectivesCtrl'),
  Programme: require('./programmeCtrl'),
  ProgrammesList: require('./programmesListCtrl'),
  Public: require('./publicSiteCtrl'),
  Sample: require('./sampleCtrl'),
  SchoolsList: require('./schoolsListCtrl'),
  Search: require('./searchCtrl'),
  StudyHandBook: require('./studyHandBookCtrl'),
  System: require('./systemCtrl'),
  ThirdCycleStudySchoolsList: require('./thirdCycleStudySchoolsListCtrl'),
  ThirdCycleStudyDepartment: require('./thirdCycleStudyDepartmentCtrl'),
}
