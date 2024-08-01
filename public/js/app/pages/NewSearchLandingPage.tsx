import React from 'react'

import { useNavigate } from 'react-router-dom'

import { Col, Row } from 'reactstrap'
import { PageHeading } from '@kth/kth-reactstrap/dist/components/studinfo'
import SearchInput from '../components/SearchInput'
import { stringifyUrlParams } from '../../../../domain/searchParams'

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

const NewSearchLandingPage = () => {
  const navigate = useNavigate()
  const { languageIndex } = useStore()

  const { bigSearch } = i18n.messages[languageIndex]
  const { searchHeading, searchButton } = bigSearch

  const handleSubmit = (pattern: string) => {
    const searchStr = stringifyUrlParams({ pattern: pattern })
    navigate({ search: searchStr }, { replace: true })
    navigate(0)
  }

  return (
    <Row>
      <MainContent>
        <PageHeading>{searchHeading}</PageHeading>
        <SearchInput caption="searchButton" onSubmit={handleSubmit} />
      </MainContent>
    </Row>
  )
}

export default NewSearchLandingPage
