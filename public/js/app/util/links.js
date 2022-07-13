import { departmentLink, pageLink, programmeLink, thirdCycleDepartmentLink } from '../../../../domain/links'

function parentLink(language) {
  return pageLink(`/student/`, language)
}

function parentStudyLink(language) {
  return pageLink(`/utbildning/`, language)
}

function parentThirdCycleStudyLink(language) {
  return language === 'en'
    ? pageLink(`/en/studies/phd/`, language)
    : pageLink(`/utbildning/forskarutbildning/`, language)
}

function courseLink(courseCode, language, { periods = undefined, term = undefined } = {}) {
  const startSign = (term !== undefined && term !== '') || periods !== undefined ? '?' : ''
  const bindSign = term !== undefined && term !== '' && periods !== undefined ? '&' : ''
  const startTerm = term !== undefined && term !== '' ? `startterm=${term}` : ''
  const period = periods !== undefined ? `periods=${periods}` : ''
  return pageLink(`/student/kurser/kurs/${courseCode}${startSign}${period}${bindSign}${startTerm}`, language) // outside link
}

function programLinkYear1(programmeCode, term, language) {
  return pageLink(`/student/kurser/program/${programmeCode}/${term}/arskurs1`, language)
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
    : 'https://www.kth.se/studievagledning'
}

function koppsEmail() {
  return 'mailto:kopps@kth.se'
}

function literatureListLink(schoolCode, term, lang) {
  return pageLink(`/student/kurser/lit/${term}/${schoolCode}`, lang)
}

function thirdCycleStudyCatalogLink(language) {
  return pageLink(`/utbildning/forskarutbildning/kurser/avdelning`, language)
}

function replaceSiteLink(siteName, siteUrl) {
  const siteNameElement = document.querySelector('.block.siteName a')
  if (siteNameElement) {
    siteNameElement.textContent = siteName
    siteNameElement.href = siteUrl
  }
}

function replaceSiteLinkForThirdCyclePages(siteName, language) {
  const siteUrl = thirdCycleStudyCatalogLink(language)
  return replaceSiteLink(siteName, siteUrl)
}

export {
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
  programLinkYear1,
  replaceSiteLink,
  replaceSiteLinkForThirdCyclePages,
}
