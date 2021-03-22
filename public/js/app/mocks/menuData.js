const DUMMY = {
  ariaLabel: 'Sub menu',
  url: '#',
  parentLink: 'Parent Link',
  ancester: 'Ancester',
  leafLink: 'Leaf Link',
  leafSelected: 'Leaf Selected',
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
        type: 'ancestor',
        text: DUMMY.ancester,
        url: DUMMY.url,
      },
      {
        type: 'leaf',
        text: DUMMY.leafLink,
        url: DUMMY.url,
      },
      {
        type: 'leaf',
        text: DUMMY.leafSelected,
        selected: true,
      },
      {
        type: 'leaf',
        text: DUMMY.leafLink,
        url: DUMMY.url,
      },
    ],
  },
}

export default menuData
