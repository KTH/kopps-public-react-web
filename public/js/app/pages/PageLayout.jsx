import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Col, Row } from 'reactstrap'
import { Breadcrumbs } from '@kth/kth-reactstrap/dist/components/utbildningsinfo'
import MainMenu from '../components/MainMenu'
import { useStore } from '../mobx'

function renderBreadcrumbsIntoKthHeader(language) {
  const breadcrumbContainer = document.getElementById('breadcrumbs-header')
  if (breadcrumbContainer) {
    ReactDOM.render(<Breadcrumbs include="directory" language={language} />, breadcrumbContainer)
  }
}

function MainContent({ children }) {
  return <main id="mainContent">{children}</main>
}

function PageLayout({ children }) {
  const { language } = useStore()
  useEffect(() => renderBreadcrumbsIntoKthHeader(language))
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
