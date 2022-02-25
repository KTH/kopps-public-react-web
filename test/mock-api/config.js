const {
  detailedInformation: detailedInformationResponse,
  departmentCourses: departmentCoursesResponse,
  listSchoolsWithDepartments: listSchoolsWithDepartmentsResponse,
  programmesList: programmesListResponse,
  programme: programmeResponse,
  programmeStudyVersion: programmeStudyVersionResponse,
} = require('./responses')

module.exports = {
  host: {
    address: '0.0.0.0',
    port: 3000,
  },
  paths: [
    {
      method: 'get',
      url: '/cm/*',
      response: '',
    },
    {
      method: 'get',
      url: '/kopps/course/*/detailedinformation',
      response: detailedInformationResponse,
    },
    {
      method: 'get',
      url: '/kopps/schools/departments?*',
      response: listSchoolsWithDepartmentsResponse,
    },
    {
      method: 'get',
      url: '/kopps/courses/*.json?l=*',
      response: departmentCoursesResponse,
    },
    {
      method: 'get',
      url: '/kopps/courses/ADD.json?l=en',
      response: departmentCoursesResponse,
    },
    {
      method: 'get',
      url: '/kopps/courses/ADD.json?l=sv',
      response: departmentCoursesResponse,
    },
    {
      method: 'get',
      url: '/cm/*',
      response: '',
    },
    /////////////////////////
    {
      method: 'get',
      url: '/kopps/programmes/all',
      response: programmesListResponse,
    },
    /////////////////////////
    {
      method: 'get',
      url: '/kopps/programme/*',
      response: programmeResponse,
    },
    {
      method: 'get',
      url: 'programmes/*/studyprogramme/version/*',
      response: programmeStudyVersionResponse,
    },
  ],
}
