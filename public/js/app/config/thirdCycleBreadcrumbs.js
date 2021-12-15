const translate = require('../../../../domain/translate')
const { parentThirdCycleStudyLink, pageLink, parentStudyLink } = require('../util/links')

function getThirdCycleBreadcrumbs(applicationStore) {
  const { language, browserConfig } = applicationStore
  const t = translate(language)
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
      url: pageLink(browserConfig.redirectProxyPath.thirdCycleRoot, language),
      label: t('courses'),
    },
  ]
}

export default getThirdCycleBreadcrumbs
