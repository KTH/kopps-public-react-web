import config from '../../../../../config/commonSettings'
// const studentRoot = '/student/kurser'
// const thirdCycleRoot = '/utbildning/forskarutbildning/kurser'

const commonSettings = config

// const commonSettings = {
//   // The proxy prefix path if the application is proxied. E.g /places
//   proxyPrefixPath: {
//     uri: studentRoot,
//     courseSearch: `${studentRoot}/sokkurs`,
//     courseSearchInternApi: `${studentRoot}/intern-api/sok`,
//     department: `${studentRoot}/org`,
//     programme: `${studentRoot}/program`,
//     programmesList: `${studentRoot}/kurser-inom-program`,
//     schoolsList: `${studentRoot}/program`,
//     studyHandbook: '/student/program/shb',
//     thirdCycleCourseSearch: `${thirdCycleRoot}/sok`,
//     thirdCycleSchoolsAndDepartments: `${thirdCycleRoot}/avdelning`,
//     thirdCycleCoursesPerDepartment: `${thirdCycleRoot}/org`,
//     literatureList: `${studentRoot}/lit`,
//   },
//   // Don't contain any content
//   // is just immedately redirected.
//   redirectProxyPath: {
//     studentRoot,
//     thirdCycleRoot,
//     coursesPerDepartment: `${studentRoot}/kurser-per-avdelning`,
//     departmentCourses: `${studentRoot}/avdelning/:departmentCode/kurser/`,
//   },
// }
export default commonSettings
