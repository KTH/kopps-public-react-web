/**
 *
 *     Common settings for server and browser
 *
 * **************************************************
 * * WARNING! Never access any secrets in this file *
 * **************************************************
 *
 */
const { getEnv, devDefaults } = require('kth-node-configuration')

module.exports = {
  // The proxy prefix path if the application is proxied. E.g /places
  proxyPrefixPath: {
    uri: '/student/kurser',
    department: '/student/kurser/org',
    programme: '/student/kurser/program',
    programmesList: '/student/kurser/kurser-inom-program',
    schoolsList: '/student/kurser/program',
    courseSearch: '/student/kurser/sokkurs',
    studyHandbook: '/student/program/shb',
    studentRoot: '/student/kurser',
    thirdCycleCourseSearch: '/utbildning/forskarutbildning/kurser/sok',
    thirdCycleSchoolsAndDepartments: '/utbildning/forskarutbildning/kurser/avdelning',
    thirdCycleCoursesPerDepartment: '/utbildning/forskarutbildning/kurser/org',
    thirdCycleRoot: '/utbildning/forskarutbildning/kurser', // Don't contain any content, is just immedately redirected.
    programmeLiteratureList: '/student/kurser/lit',
  },
}
