import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import PropTypes from 'prop-types'

import { Col, Row } from 'reactstrap'
import { Breadcrumbs } from '@kth/kth-reactstrap/dist/components/utbildningsinfo'

import { useStore } from '../mobx'
import MainMenu from '../components/MainMenu'
import LanguageControl from '../components/LanguageControl'

function renderBreadcrumbsIntoKthHeader(breadcrumbs, language) {
  const { breadcrumbsDynamicItems, include, items = [] } = breadcrumbs
  const breadcrumbsEnd = [...items, ...breadcrumbsDynamicItems]

  const breadcrumbContainer = document.getElementById('breadcrumbs-header')

  if (breadcrumbContainer) {
    const root = createRoot(breadcrumbContainer)
    root.render(
      <>
        <Breadcrumbs include={include} items={breadcrumbsEnd} language={language} />
        <LanguageControl language={language} />
      </>
    )
  }
}

function MainContent({ children }) {
  return (
    <Col>
      <main id="mainContent">{children}</main>
    </Col>
  )
}

function PageLayout({ breadcrumbs, menuData, children }) {
  const { breadcrumbsDynamicItems = [], language } = useStore()

  useEffect(() => {
    let isMounted = true
    if (isMounted) renderBreadcrumbsIntoKthHeader({ ...breadcrumbs, breadcrumbsDynamicItems }, language)
    return () => (isMounted = false)
  })
  return (
    // Container in publicLayout.handlebars – begin
    <Row>
      <MainMenu menuData={menuData} />
      <MainContent>{children}</MainContent>
    </Row>
    // Container – end
  )
}

MainContent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}
// PageLayout: prop type `menuData.navList.items[0].type` is invalid;
// it must be a function, usually from the `prop-types` package, but received `undefined
PageLayout.propTypes = {
  breadcrumbs: PropTypes.shape({
    include: PropTypes.oneOf(['none', 'university', 'student', 'directory']),
    items: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
        label: PropTypes.string,
      })
    ),
  }),
  menuData: PropTypes.shape({
    ariaLabel: PropTypes.string,
    navList: PropTypes.shape({
      type: PropTypes.oneOf(['expandable']),
      items: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          // type: PropTypes.oneOf[('ancestor', 'leaf')],
          text: PropTypes.string,
        })
      ),
    }),
    parentLink: PropTypes.shape({ text: PropTypes.string, url: PropTypes.string }),
    selectedId: PropTypes.string,
  }),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

PageLayout.defaultProps = {
  breadcrumbs: { include: 'student', items: [] },
  menuData: {},
}
export default PageLayout
