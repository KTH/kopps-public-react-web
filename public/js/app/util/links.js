import { pageLink, programmeLink } from '../../../../domain/links'

function parentLink(language) {
  return pageLink(`/student/`, language)
}

function parentStudyLink(language) {
  return pageLink(`/utbildning/`, language)
}

function parentThirdCycleStudyLink(language) {
  return pageLink(`/utbildning/forskarutbildning/`, language)
}

function departmentLink(departmentCode, language) {
  return pageLink(`/student/kurser/org/${departmentCode}`, language)
}

function thirdCycleDepartmentLink(departmentCode, language) {
  return pageLink(`/utbildning/forskarutbildning/kurser/org/${departmentCode}`, language)
}

function courseLink(courseCode, language) {
  return pageLink(`/student/kurser/kurs/${courseCode}`, language) // outside link
}

function programTermLink(programmeCode, term, studyYear, language) {
  return pageLink(`/student/kurser/program/${programmeCode}/${term}/${studyYear}`, language)
}

function programSyllabusLink(programmeCode, term, language) {
  return pageLink(`/student/kurser/program/${programmeCode}-${term}.pdf`, language)
}

function programmeWebLink(programmeCode, language) {
  return pageLink(`/social/program/${programmeCode}`, language)
}

function appendix1Link(programmeCode, term) {
  return `/student/kurser/program/${programmeCode}/${term}/kurslista`
}

function centralStudyCounselingUrl(language) {
  return language === 'en'
    ? 'https://www.kth.se/en/studies/master/general-study-counselling-1.621634'
    : 'https://www.kth.se/utbildning/traffakth/studievagledning'
}

function koppsEmail() {
  return 'mailto:kopps@kth.se'
}

function literatureListLink(schoolCode, term, lang) {
  return pageLink(`/student/kurser/lit/${term}/${schoolCode}`, lang)
}

module.exports = {
  parentLink,
  pageLink,
  programmeLink,
  departmentLink,
  courseLink,
  centralStudyCounselingUrl,
  koppsEmail,
  parentStudyLink,
  parentThirdCycleStudyLink,
  programTermLink,
  programSyllabusLink,
  programmeWebLink,
  thirdCycleDepartmentLink,
  appendix1Link,
  literatureListLink,
}
