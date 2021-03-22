const DUMMY = {
  ariaLabel: 'Sub menu',
  url: '#',
  parentLink: 'Parent Link',
  dirId: 'ancestor',
  pageOneId: 'pageOne',
  pageTwoId: 'pageTwo',
  pageThreeId: 'pageThree',
  dirText: 'Ancestor',
  pageOneText: 'Page One',
  pageTwoText: 'Page Two',
  pageThreeText: 'Page Three',
  pageOneUrl: '/kopps-public/one/test',
  pageTwoUrl: '/kopps-public/two/test',
  pageThreeUrl: '/kopps-public/three/test',
}

const menuData = {
  ariaLabel: DUMMY.ariaLabel,
  parentLink: {
    url: DUMMY.url,
    text: DUMMY.parentLink,
  },
  navList: {
    type: 'expandable',
    items: [
      {
        id: DUMMY.dirId,
        type: 'ancestor',
        text: DUMMY.dirText,
      },
      {
        id: DUMMY.pageOneId,
        type: 'leaf',
        text: DUMMY.pageOneText,
        url: DUMMY.pageOneUrl,
      },
      {
        id: DUMMY.pageTwoId,
        type: 'leaf',
        text: DUMMY.pageTwoText,
        url: DUMMY.pageTwoUrl,
      },
      {
        id: DUMMY.pageThreeId,
        type: 'leaf',
        text: DUMMY.pageThreeText,
        url: DUMMY.pageThreeUrl,
      },
    ],
  },
}

export default menuData
