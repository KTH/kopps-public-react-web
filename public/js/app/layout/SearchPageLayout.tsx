import React from 'react'
import PropTypes from 'prop-types'

import { Col, Row } from 'reactstrap'
import SearchFilters from '../components/SearchFilters'

function MainContent({ children }) {
  return (
    <Col tag="main" id="mainContent">
      {children}
    </Col>
  )
}

function SearchPageLayout({ children }) {
  return (
    // Container in publicLayout.handlebars – begin
    <Row>
      <SearchFilters />
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
SearchPageLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

SearchPageLayout.defaultProps = {
  menuData: {},
}
export default SearchPageLayout
