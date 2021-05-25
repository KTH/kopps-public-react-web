const messages = {
  shortNames: ['en'],
  longNameSe: 'Engelska',
  longNameEn: 'English',
  messages: {
    // General stuff
    date_format_short: '%d-%b-%Y',

    // Error messages
    error_not_found: "Sorry, we can't find your requested page",
    error_generic: 'Something went wrong on the server, please try again later.',

    // Ready for test
    ready_paths: 'Ready for Test',
    redirect_paths: 'Redirect Paths',

    // Message keys
    service_name: 'Course and programme directory',

    example_message_key: 'This is an english translation of a label',

    button_label_example: 'Click me to send data to server!',

    field_text_example: 'Data to be sent to API',

    field_label_get_example: 'My modelData(Response from api call GET): ',
    field_label_post_example: 'My modelData(Response from api call POST): ',

    lang_block_id: '1.77273',
    locale_text: 'Course and programme directory in English',

    site_name: 'Course and programme directory',
    host_name: 'KTH',

    button_mobile_menu_label: 'Open/close the mobile menu',
    mobile_menu_aria_label: 'Mobile menu',

    skip_to_main_content: 'Skip to main content',
    back_to_top_label: 'To page top',

    template_app_works: 'You are up and running kth-node with React!',
    template_store_text: 'Message from applicationStore',
    template_try_me: 'Try me',
    template_button_works: 'Button works!',

    semester: {
      1: 'Spring',
      2: 'Autumn',
    },
    general_number_as_word: {
      0: 'zero',
      1: 'one',
      2: 'two',
      3: 'three',
      4: 'four',
      5: 'five',
      6: 'six',
      7: 'seven',
      8: 'eight',
      9: 'nine',
    },
    main_menu_aria_label: 'Sub menu',
    main_menu_student: 'Student at KTH',
    main_menu_study_at_kth: 'Study at KTH',
    main_menu_directory: 'Course and programme directory',
    main_menu_page_example: 'Example',
    main_menu_shb: 'Study Handbook 00/01 to 07/08',
    main_menu_search_all: 'Search course',
    main_menu_third_cycle_studies: 'PhD studies',
    main_menu_third_cycle_departments_list_header: 'Third-cycle courses by school',
    main_menu_third_cycle_courses_search: 'Search third-cycle courses',

    main_page_header_example: 'Example',
    main_page_article_lead_example:
      '“Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...”',
    main_page_article_header_example: 'Lorem Ipsum',
    main_page_article_first_paragraph_example:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam lacus metus, ultricies eget nibh a, dignissim mattis enim. Mauris vulputate arcu nulla, vitae cursus orci scelerisque sit amet. Proin suscipit congue orci non laoreet. Sed eu convallis quam, nec mattis nunc. Quisque vehicula erat ac facilisis gravida. Integer gravida tortor in massa iaculis, quis tristique leo sagittis. Vivamus risus tortor, gravida sit amet ex eget, porttitor mollis quam. Nam porttitor diam felis. Duis dignissim augue ac libero sagittis rhoncus. Mauris placerat, augue ac efficitur commodo, diam urna lobortis libero, sit amet mattis urna enim sit amet turpis.',
    main_page_article_second_paragraph_example:
      'Pellentesque hendrerit pellentesque blandit. Duis dictum metus quis sem egestas imperdiet. Proin a enim vitae mi dapibus vulputate id vel lectus. Nullam eu dolor vitae neque malesuada lacinia. Donec interdum ligula eget massa convallis, ac egestas eros sodales. In ac sem nibh. Pellentesque ut sodales elit.',
    main_page_footer_example:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',

    main_menu_programmes_list: 'Courses Part of Programme',
    programmes_list_header: 'Courses Part of Programme',
    programmes_list_lead:
      'Choose a programme below to get an overview of courses and study years forming the programme.',
    programme_type: {
      TARKU: 'Master of Architecture',
      CING: 'Master of Science in Engineering',
      YHOGE: 'Bachelor of Science in Engineering',
      GKAND: 'Bachelor of Science',
      HOGSK: 'University Diploma',
      TMAST: 'Master of Science (Two Years)',
      GMAGB: 'Master of Science (One Year)',
      TBAS: 'Technical Preparatory Education',
      OVRIGA: 'Other programmes',
    },
    programmes_admitted: 'admitted/batch',
    programmes_admitted_until: 'admitted/batch until',
    programmes_admitted_from: 'admitted/batch from',
    programmes_older: 'Programmes without new admission',
    main_menu_departments_list: 'Courses by school',
    departments_list_header: 'Courses by school',
    departments_list_lead:
      'All active courses on all educational levels given at KTH, listed according to the organization of each school.',
    departments_deprecated_schools: 'Older Schools',
    departments_deprecated_schools_collapsible: 'Courses older schools',
    department_courses: 'Courses',
    department_course_code: 'Course code',
    department_course_name: 'Course name',
    department_course_credits: 'Scope',
    department_course_educational_level: 'Educational level',
    department_period_abbr: 'Periods',
    third_cycle_department_courses: 'Third-cycle courses by school',
    programme_study_years: 'Programme Syllabuses',
    programme_study_years_explanation:
      'Choose programme syllabus. Batch most often equals first registration term at programme.',
    programme_admitted_year: 'Programme syllabus for studies starting in',
    curriculums_missing_admission: 'Programme syllabus missing',
    curriculums_missing_admission_text: school =>
      `The chosen programme syllabus could not be found. For further assistance, please contact the student office at the ${school} school.`,
    curriculums_admitted_year_long: 'Study year',
    curriculums_studyyear_explanation_1: studyYear =>
      `The following courses are part of study year ${messages.messages.general_number_as_word[studyYear]}.`,
    curriculums_studyyear_explanation_2: year =>
      `Observera att de eventuella anmälningskoder och perioder som anges är baserade på läsåret <strong>${year}</strong>. Läses denna årskurs vid ett senare tillfälle kan andra anmälningskoder och perioder komma att gälla.`,
    curriculums_common_courses: 'General Courses',
  },
  shb: {
    pageHeading: 'Study Handbook 00/01 to 07/08',
    content: 'Until the study year 2007/2008 the study handbook contained program and course information.',
  },
  thirdCycleSearch: {
    searchHeading: 'Search third-cycle courses',
    leadIntro:
      'This is the official information about postgraduate courses at KTH. The courses may be searched by course name, part of name or course code.',
    linkToUsualSearch:
      'At the Search course page you can search for all courses at KTH, including third cycle courses, by using search criteria.',
  },
  bigSearch: {
    searchHeading: 'Search course',
    leadIntro: `This is the official course information at KTH. 
    The courses may be searched by course name, part of name or course code. 
    Courses included in your programme are available using the menu on the left.`,
    eduLevel: 'Educational level:',
    PREPARATORY: 'Pre-university level',
    BASIC: 'First cycle',
    ADVANCED: 'Second cycle',
    RESEARCH: 'Third cycle',
    showOptions: 'Other options:',
    onlyEnglish: 'Courses taught in English',
    onlyMHU: 'Courses that deal with environment, environmental technology or sustainable development',
    showCancelled: 'Dormant/Terminated course',
    summer: 'summer',
    department: 'School, department, etc',
    departmentsAll: 'All schools',
    departmentsWithin: 'All within',
  },
  searchInstructions: {
    search_help_collapse_header: 'Instructions for searching',
    search_help_1:
      'You can search using part of the course name or code. Searching for "data" will return "Data Storage Paradigms" as well as "Database Techniques" and "Algorithms, Data Structures and Complexity".',
    search_help_2:
      'Searching for more than one word will return courses containing all of the words. Searching for "part 1" will return courses with both part and 1 in course name or code, for example "SI2610 Many Particle Physics" and "DD1343 Computer Science and Numerical Methods, part 1".',
    search_help_3:
      'Both the English and the Swedish course names are searched. Searching for "metod" will return the course "Computer Science Methods" with the Swedish name "Datalogisk metod".',
    search_help_4: 'At most 250 hits will be displayed. If you get too many hits, try to narrow the search conditions.',
    search_help_5: 'The search does not distinguish between upper and lower case characters.',
    search_help_6:
      'It is not possible to use special characters, like quotes, in the search. These characters will be removed before the search is performed.',
    search_help_7:
      'Your search may be restricted to courses starting in a specific term. By default, course are found without regard for when the course is offered.',
    search_help_8:
      'Your search may be restricted to courses taught in English. By default, courses are found without regard for tutoring language.',
    search_help_9:
      'You may select to show courses that are no longer offered or dormant at KTH (terminated courses). By default, these are not shown.',
    search_help_10:
      'If you have questions or feedback on the course search, please contact <a href="mailto:kopps@kth.se">kopps@kth.se</a>.',
  },
  thirdCycleSearchInstructions: {
    search_help_collapse_header: 'Instructions for searching',
    search_research_help_1:
      'You can search using part of the course name or code. Searching for "data" will return "Data Storage Paradigms" as well as "Database Techniques" and "Algorithms, Data Structures and Complexity".',
    search_research_help_2:
      'Searching for "part 1" will return courses with both part and 1 in course name or code, for example "SI2610 Many Particle Physics" and "DD1343 Computer Science and Numerical Methods, part 1".',
    search_research_help_3: 'Searching for more than one word will return courses containing all of the words.',
    search_research_help_4:
      'Both the English and the Swedish course names are searched. Searching for "metod" will return the course "Computer Science Methods" with the Swedish name "Datalogisk metod".',
    search_research_help_5:
      'At most 250 hits will be displayed. If you get too many hits, try to narrow the search conditions.',
    search_research_help_6: 'The search does not distinguish between upper and lower case characters.',
    search_research_help_7:
      'It is not possible to use special characters, like quotes, in the search. These characters will be removed before the search is performed.',
    search_research_help_8: 'Courses that are no longer offered or dormant at KTH are not shown.',
    search_research_help_9:
      'If you have questions or feedback on the course search, please contact <a href="mailto:kopps@kth.se">kopps@kth.se</a>.',
  },
  generalSearch: {
    collapseHeaderOtherSearchOptions: 'Choose from other search criteria',
    searchStartPeriodPrefix: 'Course Start',
    resultsHeading: 'Search results',
    searchLabel: 'Search by writing in a course code or course name:',
    searchText: 'Example of course code: SF1624',
    searchLoading: 'Searching ...',
    errorUnknown: 'An unknown error occurred - failed to retrieve course data.',
    errorEmpty: 'Your search returned no results.',
    errorOverflow: 'There were too many results.',
    noQueryProvided: 'No query restriction was specified',
  },
  searchAlarms: {
    errorUnknown: { text: 'An unknown error occurred - failed to retrieve course data' },
    errorEmpty: {
      header: 'Your search returned no results',
      help: 'For help, see the link below: Instructions for searching',
    },
    errorOverflow: {
      header: 'There were too many results',
      text:
        'There are too many courses that match your search critera. Please specify more characters/digits in the course name or course code (example of course code: SF1624).',
      help: 'For help, see the link below: Instructions for searching',
    },
    noQueryProvided: {
      text: 'No query restriction was specified',
    },
  },
  footerContent: {
    contentContact: 'Contact for questions regarding education at KTH',
    applicationContact: 'Contact regarding technical matters on this page',
    centralStudyCounseling: 'Central study counseling',
    koppsEmailText: 'kopps@kth.se',
  },
}

module.exports = messages
