function mockGetMenuData(language) {
  const mockMenuData = {
    en: {
      ariaLabel: 'Sub menu',
      parentLink: {
        text: 'Student at KTH',
        url: '/student/?l=en',
      },
      navList: {
        type: 'expandable',
        items: [
          {
            id: 'directory',
            type: 'ancestor',
            text: 'Course and programme directory',
          },
          {
            id: 'programmesList',
            type: 'leaf',
            text: 'Courses Part of Programme',
            url: '/student/kurser/kurser-inom-program',
          },
          {
            id: 'searchAllCourses',
            text: 'Search course',
            type: 'leaf',
            url: '/student/kurser/sokkurs',
          },
          {
            id: 'departmentsList',
            type: 'leaf',
            text: 'Courses by school',
            url: '/student/kurser/org',
          },
          {
            id: 'shb',
            type: 'leaf',
            text: 'Study Handbook 00/01 to 07/08',
            url: '/student/program/shb',
          },
        ],
      },
    },
    sv: {
      ariaLabel: 'Undermeny',
      parentLink: {
        text: 'Student på KTH',
        url: '/student/',
      },
      navList: {
        type: 'expandable',
        items: [
          {
            id: 'directory',
            type: 'ancestor',
            text: 'Kurs- och programkatalogen',
          },
          {
            id: 'programmesList',
            type: 'leaf',
            text: 'Kurser inom program',
            url: '/student/kurser/kurser-inom-program',
          },
          {
            id: 'searchAllCourses',
            text: 'Sök kurs',
            type: 'leaf',
            url: '/student/kurser/sokkurs',
          },
          {
            id: 'departmentsList',
            type: 'leaf',
            text: 'Kurser per skola',
            url: '/student/kurser/org',
          },
          {
            id: 'shb',
            type: 'leaf',
            text: 'Studiehandboken 00/01 tom 07/08',
            url: '/student/program/shb',
          },
        ],
      },
    },
  }
  return mockMenuData[language]
}

export default mockGetMenuData
