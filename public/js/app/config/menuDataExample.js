/* eslint-disable camelcase */
const i18n = require('../../../../i18n')
const translate = require('../util/translate')

function parentLink(language) {
  const languageParam = language === 'en' ? '?l=en' : ''
  return `/student/kurser/kurser-inom-program${languageParam}`
}

function pageLinks(pageId) {
  return `/kopps-public/${pageId}`
}

function getMenuData(language) {
  const t = translate(i18n, language)
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

export default getMenuData
