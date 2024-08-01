import React from 'react'

import { Col, Row } from 'reactstrap'
import { PageHeading } from '@kth/kth-reactstrap/dist/components/studinfo'
import SearchFilters from '../components/SearchFilters'

import { useStore } from '../mobx'
import i18n from '../../../../i18n'

interface MainContentProps {
  children: React.ReactNode
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <Col tag="main" id="mainContent">
      {children}
    </Col>
  )
}

const NewSearchPage = () => {
  const { languageIndex } = useStore()

  const { bigSearch, messages } = i18n.messages[languageIndex]
  const { main_menu_search_all_new } = messages
  const { searchHeading } = bigSearch
  return (
    <Row>
      <SearchFilters
        ancestorItem={{ href: '/student/kurser/sokkurs-ny-design', label: main_menu_search_all_new }}
      />
      <MainContent>
        <PageHeading>{searchHeading}</PageHeading>
        <h4>TODO: Här kommer resultat senare</h4>
      </MainContent>
    </Row>
  )
}

export default NewSearchPage
