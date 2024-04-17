/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'

import { MainMenu as SharedMainMenu } from '../components-shared/MainMenu'

function NavItem({ text, url, selected }) {
  return (
    <li>
      <a href={url} {...(selected ? { 'aria-current': 'page' } : {})}>
        {text}
      </a>
    </li>
  )
}

function MainMenu(props) {
  const { menuData } = props
  const { parentLink, title, navList, selectedId } = menuData

  const ancestorItem = { label: parentLink.text, href: parentLink.url }
  return (
    <>
      <SharedMainMenu title={title} ancestorItem={ancestorItem}>
        <ul>
          {navList.items.map((item, index) => (
            <NavItem key={index} selected={item.id === selectedId} {...item} />
          ))}
        </ul>
      </SharedMainMenu>
    </>
  )
}

export default MainMenu
