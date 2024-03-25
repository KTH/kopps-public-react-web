// Logic is based on old Breadcrumb component in kth-reactstrap: https://github.com/KTH/kth-reactstrap/blob/master/src/components/utbildningsinfo/Breadcrumbs.js
// Be aware that some parts of file (generic createBreadcrumbs()) is replicated in multiple apps,
// so changes here should probably be synced to the other apps.
// Specific breadcrumbs ( createProgrammeBreadcrumbs, createDepartmentBreadcrumbs, createThirdCycleBreadcrumbs, createLiteratureBreadcrumbs)
// are unique to kopps-public-react-web
// See https://confluence.sys.kth.se/confluence/x/6wYJDQ for more information.

const commonSettings = require('../../config/commonSettings')
const {
  pageLink,
  programmeLink,
  departmentLink,
  thirdCycleDepartmentLink,
  literatureListLink,
} = require('../../domain/links')
const translate = require('../../domain/translate')
const i18n = require('../../i18n')

const baseItems = {
  university: {
    en: { url: '/en', label: 'KTH' },
    sv: { url: '/', label: 'KTH' },
  },
  student: {
    en: { url: '/en/student', label: 'Student at KTH' },
    sv: { url: '/student', label: 'Student på KTH' },
  },
  directory: {
    en: { url: '/student/kurser/kurser-inom-program?l=en', label: 'Course and programme directory' },
    sv: { url: '/student/kurser/kurser-inom-program', label: 'Kurs- och programkatalogen' },
  },
}

function createAboutCourseItem(language, courseCode) {
  const label = language === 'en' ? 'About course' : 'Om kursen'
  return {
    label: `${label} ${courseCode}`,
    url: `/student/kurser/kurs/${courseCode.toUpperCase()}?l=${language}`,
  }
}

function createBreadcrumbs(language, courseCode) {
  const items = [baseItems.university[language], baseItems.student[language], baseItems.directory[language]]
  if (courseCode) {
    items.push(createAboutCourseItem(language, courseCode))
  }
  return items
}

function createProgrammeBreadcrumbs(language, programmeName, programmeCode) {
  const items = createBreadcrumbs(language)
  const programmeCodeUpperCase = programmeCode?.toUpperCase()
  items.push({
    url: programmeLink(programmeCodeUpperCase, language),
    label: programmeName,
  })
  return items
}

function createDepartmentItem(language, departmentName, departmentCode, studyLevel) {
  return {
    url:
      studyLevel === 'third-cycle'
        ? thirdCycleDepartmentLink(departmentCode, language)
        : departmentLink(departmentCode, language),
    label: departmentName,
  }
}
function createDepartmentBreadcrumbs(language, departmentName, departmentCode) {
  const items = createBreadcrumbs(language)
  const departmentItem = createDepartmentItem(language, departmentName, departmentCode, 'all')
  items.push(departmentItem)
  return items
}

function createThirdCycleBreadcrumbs(language, departmentName, departmentCode) {
  const t = translate(language)
  const { thirdCycleRoot } = commonSettings.redirectProxyPath
  const items = [
    baseItems.university[language],
    {
      url: pageLink(`/utbildning/`, language),
      label: t('main_menu_study_at_kth'),
    },
    {
      url:
        language === 'en'
          ? pageLink(`/en/studies/phd/`, language)
          : pageLink(`/utbildning/forskarutbildning/`, language),
      label: t('main_menu_third_cycle_studies'),
    },
    {
      url: pageLink(thirdCycleRoot, language),
      label: t('courses'),
    },
  ]

  if (departmentName && departmentCode) {
    const departmentItem = createDepartmentItem(language, departmentName, departmentCode, 'third-cycle')
    items.push(departmentItem)
  }

  return items
}

function createLiteratureBreadcrumbs(language, selectedSchoolCode, selectedTerm) {
  const langIndex = language === 'en' ? 0 : 1
  const { breadcrumb } = i18n.messages[langIndex].literatureList
  return [
    baseItems.university[language],
    baseItems.student[language],
    {
      url: literatureListLink(selectedSchoolCode, selectedTerm, language),
      label: breadcrumb,
    },
  ]
}

module.exports = {
  createBreadcrumbs,
  createProgrammeBreadcrumbs,
  createDepartmentBreadcrumbs,
  createThirdCycleBreadcrumbs,
  createLiteratureBreadcrumbs,
}
