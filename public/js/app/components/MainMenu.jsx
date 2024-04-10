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

export function MainMenuMobile({ menuData }) {
  const { parentLink, title, navList, selectedId } = menuData

  return (
    <nav className="kth-local-navigation--mobile" aria-labelledby="kth-local-navigation-title--mobile">
      <button className="kth-button menu" id="kth-local-navigation-title--mobile">
        <span>{title}</span>
      </button>
      <dialog className="kth-mobile-menu left">
        <div className="kth-mobile-menu__navigation">
          <button className="kth-icon-button close">
            <span className="kth-visually-hidden">Close</span>
          </button>
        </div>
        <div className="mobile-menu__content">
          <ParentLink {...parentLink} />
          <span>{title}</span>
          <NavList selectedId={selectedId} {...navList} />
        </div>
      </dialog>
    </nav>
  )
}

export function MainMenuDesktop({ menuData }) {
  const { parentLink, title, navList, selectedId } = menuData
  return (
    <nav id="mainMenu" className="kth-local-navigation col" aria-labelledby="local-navigation-title">
      <ParentLink {...parentLink} />
      <h2 id="local-navigation-title">{title}</h2>

      <NavList selectedId={selectedId} {...navList} />
    </nav>
  )
}

function MainMenu(props) {
  const { menuData } = props
  return (
    <>
      <MainMenuMobile menuData={menuData} />
      <MainMenuDesktop menuData={menuData} />
    </>
  )
}

export default MainMenu
