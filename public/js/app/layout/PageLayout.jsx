import React from 'react'
import PropTypes from 'prop-types'

import { Col, Row } from 'reactstrap'

import MainMenu from '../components/MainMenu'

function MainContent({ children }) {
  return (
    <Col tag="main" id="mainContent">
      {children}
    </Col>
  )
}

function PageLayout({ menuData = {}, children }) {
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

export default PageLayout
