// Logic is based on old Breadcrumb component in kth-reactstrap: https://github.com/KTH/kth-reactstrap/blob/master/src/components/utbildningsinfo/Breadcrumbs.js
// Be aware that some parts of file (generic createBreadcrumbs()) is replicated in multiple apps,
// so changes here should probably be synced to the other apps.
// Specific breadcrumbs ( createProgrammeBreadcrumbs, createDepartmentBreadcrumbs, createThirdCycleBreadcrumbs, createLiteratureBreadcrumbs)
// are unique to kopps-public-react-web
// See https://confluence.sys.kth.se/confluence/x/6wYJDQ for more information.

const commonSettings = require('../../config/commonSettings')
const { pageLink, programmeLink, departmentLink, thirdCycleDepartmentLink } = require('../../domain/links')
const translate = require('../../domain/translate')
const i18n = require('../../i18n')

const createBaseItems = language => {
  const langIndex = language === 'en' ? 0 : 1
  const { breadCrumbs } = i18n.messages[langIndex]

  return {
    university: {
      url: `/${language === 'en' ? 'en' : ''}`,
      label: breadCrumbs.university,
    },
    student: {
      url: `${language === 'en' ? '/en' : ''}/student`,
      label: breadCrumbs.student,
    },
    studies: {
      url: `${language === 'en' ? '/en' : ''}/student/studier`,
      label: breadCrumbs.studies,
    },
    directory: {
      url: `/student/kurser/kurser-inom-program${language === 'en' ? '?l=en' : ''}`,
      label: breadCrumbs.directory,
    },
  }
}

function createAboutCourseItem(language, courseCode) {
  const label = language === 'en' ? 'About course' : 'Om kursen'
  return {
    label: `${label} ${courseCode}`,
    url: `/student/kurser/kurs/${courseCode.toUpperCase()}?l=${language}`,
  }
}

function createBreadcrumbs(language, courseCode) {
  const baseItems = createBaseItems(language)
  const items = [baseItems.student, baseItems.studies, baseItems.directory]
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
  const baseItems = createBaseItems(language)
  const items = [
    baseItems.university,
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

module.exports = {
  createBreadcrumbs,
  createProgrammeBreadcrumbs,
  createDepartmentBreadcrumbs,
  createThirdCycleBreadcrumbs,
}
