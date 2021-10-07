// TODO: should we use constants from commonSettings here?

function getLanguageParam(language) {
  return language === 'en' ? '?l=en' : ''
}

function parentLink(language) {
  const languageParam = getLanguageParam(language)
  return `/student/${languageParam}`
}

function parentStudyLink(language) {
  return `/utbildning/${getLanguageParam(language)}`
}

function parentThirdCycleStudyLink(language) {
  return `/utbildning/forskarutbildning/${getLanguageParam(language)}`
}

function pageLink(pageId, language) {
  const languageParam = getLanguageParam(language)
  return `${pageId}${languageParam}`
}

function programmeLink(programmeCode, language) {
  const languageParam = getLanguageParam(language)
  return `/student/kurser/program/${programmeCode}${languageParam}`
}

function departmentLink(departmentCode, language) {
  const languageParam = getLanguageParam(language)
  return `/student/kurser/org/${departmentCode}${languageParam}`
}

function thirdCycleDepartmentLink(departmentCode, language) {
  const languageParam = getLanguageParam(language)
  return `/utbildning/forskarutbildning/kurser/org/${departmentCode}${languageParam}`
}

function courseLink(courseCode, language) {
  const languageParam = getLanguageParam(language)
  return `/student/kurser/kurs/${courseCode}${languageParam}` // outside link
}

function programTermLink(programmeCode, term, studyYear, language) {
  const languageParam = language === 'en' ? '?l=en' : ''
  return `/student/kurser/program/${programmeCode}/${term}/${studyYear}${languageParam}`
}

function programSyllabusLink(programmeCode, term, language) {
  const languageParam = language === 'en' ? '?l=en' : ''
  return `/student/kurser/program/${programmeCode}-${term}.pdf${languageParam}`
}

function programmeWebLink(programmeCode, language) {
  const languageParam = language === 'en' ? '?l=en' : ''
  return `/social/program/${programmeCode}${languageParam}`
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
  literatureListLink: literatureListLink,
}
