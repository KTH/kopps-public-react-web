import React from 'react'

import { Col, Row } from 'reactstrap'
import SearchFilters from '../components/SearchFilters'

interface MainContentProps {
  children: React.ReactNode;
}

interface SearchPageLayoutProps {
  children: React.ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <Col tag="main" id="mainContent">
      {children}
    </Col>
  );
};

const SearchPageLayout: React.FC<SearchPageLayoutProps> = ({ children }) => {
  return (
    // Container in publicLayout.handlebars – begin
    <Row>
      <SearchFilters title="Filtrera dina sökval" ancestorItem={{href: "/student/kurser/sokkurs", label: "Sök kurser"}}/>
      <MainContent>{children}</MainContent>
    </Row>
    // Container – end
  );
};

export default SearchPageLayout
