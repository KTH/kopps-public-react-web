/* eslint-disable camelcase */
const i18n = require('../../../../i18n')

function parentLink(language) {
  const languageParam = language === 'en' ? '?l=en' : ''
  return `/student/kurser/kurser-inom-program${languageParam}`
}

function pageLinks(pageId) {
  return `/kopps-public/${pageId}/test`
}

function translate(language) {
  return function t(key) {
    return i18n.message(key, language)
  }
}

function getMenuData(language) {
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
          id: 'pageOne',
          type: 'leaf',
          text: t('main_menu_page_one'),
          url: pageLinks('one'),
        },
        {
          id: 'pageTwo',
          type: 'leaf',
          text: t('main_menu_page_two'),
          url: pageLinks('two'),
        },
        {
          id: 'pageThree',
          type: 'leaf',
          text: t('main_menu_page_three'),
          url: pageLinks('three'),
        },
      ],
    },
  }
}

export default getMenuData
