system paths (5)

| PathName | URI                       |
| -------- | ------------------------- |
| monitor  | /student/kurser/\_monitor |
| about    | /student/kurser/\_about   |
| paths    | /student/kurser/\_paths   |
| robots   | /robots.txt               |
| ready    | /student/kurser/\_ready   |

api paths (2)

| PathName             | URI                                          |
| -------------------- | -------------------------------------------- |
| programmeSyllabusPDF | /student/kurser/intern-api/PDFRenderFunction |
| searchCourses        | /student/kurser/intern-api/sok/:lang         |

public paths (17)

| PathName                       | URI                                                                                  |
| ------------------------------ | ------------------------------------------------------------------------------------ |
| studyhandbook                  | /student/program/shb                                                                 |
| departmentsListThirdCycleStudy | /utbildning/forskarutbildning/kurser/avdelning                                       |
| departmentThirdCycleStudy      | /utbildning/forskarutbildning/kurser/org/:departmentCode                             |
| searchThirdCycleCourses        | /utbildning/forskarutbildning/kurser/sok                                             |
| searchAllCourses               | /student/kurser/sokkurs                                                              |
| programmesList                 | /student/kurser/kurser-inom-program                                                  |
| departmentsList                | /student/kurser/org                                                                  |
| department                     | /student/kurser/org/:departmentCode                                                  |
| programme                      | /student/kurser/program/:programmeCode                                               |
| objectives_five_digit          | /student/kurser/program/:programmeCode/:term([0-9]{4}[1-2])/mal                      |
| extent_five_digit              | /student/kurser/program/:programmeCode/:term([0-9]{4}[1-2])/omfattning               |
| eligibility_five_digit         | /student/kurser/program/:programmeCode/:term([0-9]{4}[1-2])/behorighet               |
| implementation_five_digit      | /student/kurser/program/:programmeCode/:term([0-9]{4}[1-2])/genomforande             |
| appendix1_five_digit           | /student/kurser/program/:programmeCode/:term([0-9]{4}[1-2])/kurslista                |
| appendix2_five_digit           | /student/kurser/program/:programmeCode/:term([0-9]{4}[1-2])/inriktningar             |
| curriculumRoot_five_digit      | /student/kurser/program/:programmeCode/:term([0-9]{4}[1-2])/arskurs:studyYear([1-5]) |
| programme_literature_list      | /student/kurser/lit/:term([0-9]{4}[1-2])/:school([A-Z]+)                             |

redirect paths (15)

| PathName                       | URI                                                                                       |
| ------------------------------ | ----------------------------------------------------------------------------------------- |
| pdf_program_plan               | /student/kurser/program/:programmeCodeAndTerm.pdf                                         |
| departmentsListThirdCycleStudy | /utbildning/forskarutbildning/kurser                                                      |
| kurser-per-avdelning           | /student/kurser/kurser-per-avdelning                                                      |
| avdelning-kurser               | /student/kurser/avdelning/:departmentCode/kurser/                                         |
| kurser                         | /student/kurser                                                                           |
| program                        | /student/kurser/program                                                                   |
| objectives_Ht_Vt               | /student/kurser/program/:programmeCode/:term([VvHh][Tt][0-9]{2})/mal                      |
| extent_Ht_Vt                   | /student/kurser/program/:programmeCode/:term([VvHh][Tt][0-9]{2})/omfattning               |
| eligibility_Ht_Vt              | /student/kurser/program/:programmeCode/:term([VvHh][Tt][0-9]{2})/behorighet               |
| implementation_Ht_Vt           | /student/kurser/program/:programmeCode/:term([VvHh][Tt][0-9]{2})/genomforande             |
| appendix1_Ht_Vt                | /student/kurser/program/:programmeCode/:term([VvHh][Tt][0-9]{2})/kurslista                |
| appendix2_Ht_Vt                | /student/kurser/program/:programmeCode/:term([VvHh][Tt][0-9]{2})/inriktningar             |
| curriculumRoot_five_digit      | /student/kurser/program/:programmeCode/:term([0-9]{4}[1-2])                               |
| curriculumRoot_Ht_Vt           | /student/kurser/program/:programmeCode/:term([VvHh][Tt][0-9]{2})                          |
| curriculum_Ht_Vt               | /student/kurser/program/:programmeCode/:term([VvHh][Tt][0-9]{2})/arskurs:studyYear([1-5]) |

Challenge 1: serve correct URLs
Challenge 2: link to correct URLs
Challenge 3: OK with downtime?

- domain
- path
- NOT: student.kth.se/student/kurser
  - better: www.kth.se/student/kurser
  - best: student.kth.se/kurser
