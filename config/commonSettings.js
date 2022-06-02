/**
 *
 *     Common settings for server and browser
 *
 * **************************************************
 * * WARNING! Never access any secrets in this file *
 * **************************************************
 *
 */

const studentRoot = '/student/kurser'
const thirdCycleRoot = '/utbildning/forskarutbildning/kurser'

module.exports = {
  // The proxy prefix path if the application is proxied. E.g /places
  proxyPrefixPath: {
    uri: studentRoot,
    courseSearch: `${studentRoot}/sokkurs`,
    courseSearchInternApi: `${studentRoot}/intern-api/sok`,
    department: `${studentRoot}/org`,
    programme: `${studentRoot}/program`,
    programmesList: `${studentRoot}/kurser-inom-program`,
    schoolsList: `${studentRoot}/program`,
    studyHandbook: '/student/program/shb',
    thirdCycleCourseSearch: `${thirdCycleRoot}/sok`,
    thirdCycleSchoolsAndDepartments: `${thirdCycleRoot}/avdelning`,
    thirdCycleCoursesPerDepartment: `${thirdCycleRoot}/org`,
    literatureList: `${studentRoot}/lit`,
    exportPDF: '/student/program/pdf',
  },
  // Don't contain any content
  // is just immedately redirected.
  redirectProxyPath: {
    studentRoot,
    thirdCycleRoot,
    coursesPerDepartment: `${studentRoot}/kurser-per-avdelning`,
    departmentCourses: `${studentRoot}/avdelning/:departmentCode/kurser/`,
  },
}
