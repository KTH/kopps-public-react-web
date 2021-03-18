import React from 'react'
import { Col, Row } from 'reactstrap'
import MainMenu from '../components/MainMenu'

function MainContent({ children }) {
  return <main id="mainContent">{children}</main>
}

function PageLayout({ children }) {
  return (
    <Row style={{ padding: '30px 0' }}>
      <MainMenu />
      <Col>
        <MainContent>{children}</MainContent>
      </Col>
    </Row>
  )
}

export default PageLayout
