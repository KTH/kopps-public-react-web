'use strict'

/**
 * Declares all of our different controllers and exposes them
 * with some sweet names.
 */

module.exports = {
  StudyHandBook: require('./studyHandBookCtrl'),
  System: require('./systemCtrl'),
  Sample: require('./sampleCtrl'),
  ThirdCycleStudy: require('./thirdCycleStudyCtrl'),
  Public: require('./publicSiteCtrl'),
  EmbeddedPage: require('./embeddedPagesCtrl'),
  ProgrammesList: require('./programmesListCtrl'),
  SchoolsList: require('./schoolsListCtrl'),
  Department: require('./departmentCtrl'),
}
