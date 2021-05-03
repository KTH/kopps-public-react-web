/* eslint-disable camelcase */
const i18n = require('../../../../i18n')
const translate = require('../../../../domain/translate')
const { parentThirdCycleStudyLink, pageLink, parentStudyLink } = require('../util/links')

function getThirdCycleBreadcrumbs(language, proxyPrefixPath) {
  const t = translate(i18n, language)
  return [
    {
      url: parentStudyLink(language),
      label: t('main_menu_study_at_kth'),
    },
    {
      url: parentThirdCycleStudyLink(language),
      label: t('main_menu_third_cycle_studies'),
    },
    {
      url: pageLink(proxyPrefixPath, 'utbildning/forskarutbildning/kurser', language),
      label: t('department_courses'),
    },
  ]
}

export default getThirdCycleBreadcrumbs
