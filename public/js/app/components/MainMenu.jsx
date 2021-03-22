/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'

function ParentLink({ url, text }) {
  return (
    <ul className="nav">
      <li className="parentLink">
        <a href={url}>{text}</a>
      </li>
    </ul>
  )
}

function NavItem({ type, text, url, selected }) {
  return type === 'ancestor' ? (
    <li className="nav-item ancestor">
      <div>{text}</div>
    </li>
  ) : (
    <li className={`nav-item leaf${selected ? ' selected' : ''}`}>
      <a className="nav-link" href={url}>
        {text}
      </a>
    </li>
  )
}

function NavList({ type, items }) {
  const navListClasses = `nav nav-list${type ? ` ${type}` : ''}`
  return (
    <ul className={navListClasses}>
      {items.map((item, index) => (
        <NavItem key={index} {...item} />
      ))}
    </ul>
  )
}

function MainMenu(props) {
  const { menuData } = props
  const { ariaLabel, parentLink, navList } = menuData
  return (
    <nav id="mainMenu" aria-label={ariaLabel} className="col navbar navbar-expand-lg navbar-light">
      <div className="collapse navbar-collapse" id="navbarNav">
        <ParentLink {...parentLink} />
        <NavList {...navList} />
      </div>
    </nav>
  )
}

export default MainMenu
