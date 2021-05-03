/* eslint-disable camelcase */
const translate = require('../../../../domain/translate')

function parentLink(language) {
  const languageParam = language === 'en' ? '?l=en' : ''
  return `/student/kurser/kurser-inom-program${languageParam}`
}

function pageLinks(pageId) {
  return `/kopps-public/${pageId}`
}

function getMenuDataExample(language) {
  const t = translate(language)
  return {
    ariaLabel: t('main_menu_aria_label'),
    parentLink: {
      text: t('main_menu_student'),
      url: parentLink(language),
    },
    navList: {
      type: 'expandable',
      items: [
        {
          id: 'directory',
          type: 'ancestor',
          text: t('main_menu_directory'),
        },
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
