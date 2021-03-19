import React from 'react'

const DUMMY = {
  ariaLabel: 'Sub menu',
  url: '#',
  parentLink: 'Parent Link',
  ancester: 'Ancester',
  leafLink: 'Leaf Link',
  leafSelected: 'Leaf Selected',
}

const MainMenu = () => (
  <nav id="mainMenu" aria-label={DUMMY.ariaLabel} className="col navbar navbar-expand-lg navbar-light">
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="nav">
        <li className="parentLink">
          <a href={DUMMY.url}>{DUMMY.parentLink}</a>
        </li>
      </ul>
      <ul className="nav nav-list expandable">
        <li className="nav-item ancestor">
          <div>{DUMMY.ancester}</div>
        </li>
        <li className="nav-item leaf">
          <a className="nav-link" href={DUMMY.url}>
            {DUMMY.leafLink}
          </a>
        </li>
        <li className="nav-item leaf selected">
          <span className="nav-link">{DUMMY.leafSelected}</span>
        </li>
      </ul>
    </div>
  </nav>
)

export default MainMenu
