const translate = require('../../../../domain/translate')

function parentLink(language) {
  const languageParam = language === 'en' ? '?l=en' : ''
  return `/student/kurser/kurser-inom-program${languageParam}`
}

function pageLinks(pageId) {
  return `/kopps-public/${pageId}`
}

function getMenuDataExample(applicationStore) {
  const { language } = applicationStore
  const t = translate(language)
  return {
    ariaLabel: t('main_menu_aria_label'),
    parentLink: {
      text: t('main_menu_studies'),
      url: parentLink(language),
    },
    title: t('main_menu_directory'),
    navList: {
      type: 'expandable',
      items: [
        {
          id: 'example',
          type: 'leaf',
          text: t('main_menu_page_example'),
          url: pageLinks('example'),
        },
      ],
    },
  }
}

export default getMenuDataExample
