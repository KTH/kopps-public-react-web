/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'

function ParentLink({ url, text }) {
  return (
    <a className="kth-button back" href={url}>
      {text}
    </a>
  )
}

function NavItem({ text, url, selected }) {
  return (
    <li>
      <a href={url} {...(selected ? { 'aria-current': 'page' } : {})}>
        {text}
      </a>
    </li>
  )
}

function NavList({ items, selectedId }) {
  return (
    <ul>
      {items.map((item, index) => (
        <NavItem key={index} selected={item.id === selectedId} {...item} />
      ))}
    </ul>
  )
}

function MainMenu(props) {
  const { menuData } = props
  const { parentLink, title, navList, selectedId } = menuData
  return (
    <nav id="mainMenu" className="kth-local-navigation col" aria-labelledby="local-navigation-title">
      <ParentLink {...parentLink} />
      <h2 id="local-navigation-title">{title}</h2>

      <NavList selectedId={selectedId} {...navList} />
    </nav>
  )
}

export default MainMenu
