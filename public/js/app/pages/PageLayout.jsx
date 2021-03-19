import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Col, Row } from 'reactstrap'
import { Breadcrumbs } from '@kth/kth-reactstrap/dist/components/utbildningsinfo'

import { useStore } from '../mobx'
import MainMenu from '../components/MainMenu'

function renderBreadcrumbsIntoKthHeader(language) {
  const breadcrumbContainer = document.getElementById('breadcrumbs-header')
  if (breadcrumbContainer) {
    ReactDOM.render(<Breadcrumbs include="directory" language={language} />, breadcrumbContainer)
  }
}

function MainContent({ children }) {
  return (
    <Col>
      <main id="mainContent">{children}</main>
    </Col>
  )
}

function PageLayout({ children }) {
  const { language } = useStore()
  useEffect(() => renderBreadcrumbsIntoKthHeader(language))
  return (
    // Container in publicLayout.handlebars – begin
    <Row>
      <MainMenu />
      <MainContent>{children}</MainContent>
    </Row>
    // Container – end
  )
}

export default PageLayout
