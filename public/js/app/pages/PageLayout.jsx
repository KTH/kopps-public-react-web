import React from 'react'
import { useParams } from 'react-router-dom'
import { Col, Row } from 'reactstrap'

import { useStore } from '../mobx'

const DUMMY = {
  url: '#',
  parentLink: 'Parent Link',
  ancester: 'Ancester',
  leafLink: 'Leaf Link',
  leafSelected: 'Leaf Selected',
}

const MainMenu = () => (
  <nav id="mainMenu" aria-label="" className="col navbar navbar-expand-lg navbar-light" style={{ paddingLeft: '15px' }}>
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
          <span className="nav-link" style={{ padding: '7px 15px 7px 0' }}>
            {DUMMY.leafSelected}
          </span>
        </li>
      </ul>
    </div>
  </nav>
)

const MainContent = () => {
  const { language } = useStore()
  const { page: pageName } = useParams()
  return (
    <main id="mainContent">
      <Row>
        <Col>
          <h1>{`Page ${pageName}`}</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>{`In language ${language}`}</h2>
        </Col>
      </Row>
    </main>
  )
}

const PageLayout = () => (
  <Row style={{ padding: '30px 0' }}>
    <MainMenu />
    <Col>
      <MainContent />
    </Col>
  </Row>
)

export default PageLayout
