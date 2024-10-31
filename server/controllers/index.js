'use strict'

/**
 * Declares all of our different controllers and exposes them
 * with some sweet names.
 */
module.exports = {
  Appendix1: require('./appendix1Ctrl'),
  Appendix2: require('./appendix2Ctrl'),
  Appendix3: require('./appendix3Ctrl'),
  Curriculum: require('./curriculumCtrl'),
  Department: require('./departmentCtrl'),
  Eligibility: require('./eligibilityCtrl'),
  Extent: require('./extentCtrl'),
  Implementation: require('./implementationCtrl'),
  LiteratureList: require('./literatureListCtrl'),
  Objectives: require('./objectivesCtrl'),
  Programme: require('./programmeCtrl'),
  ProgrammesList: require('./programmesListCtrl'),
  SchoolsList: require('./schoolsListCtrl'),
  StudyHandBook: require('./studyHandBookCtrl'),
  System: require('./systemCtrl'),
  ThirdCycleStudySchoolsList: require('./thirdCycleStudySchoolsListCtrl'),
  ThirdCycleStudyDepartment: require('./thirdCycleStudyDepartmentCtrl'),
  PDFExport: require('./pdfCtrl'),
  SearchPage: require('./searchPageCtrl'),
}
