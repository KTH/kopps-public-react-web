import React from 'react'

import { useNavigate } from 'react-router-dom'

import { Col, Row } from 'reactstrap'
import { PageHeading } from '@kth/kth-reactstrap/dist/components/studinfo'
import SearchInput from '../components/SearchInput'
import { stringifyUrlParams } from '../../../../domain/searchParams'

import { useStore } from '../mobx'
import i18n from '../../../../i18n'

import { MainContentProps } from './types/searchPageTypes'

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <Col tag="main" id="mainContent">
      {children}
    </Col>
  )
}

const NewSearchLandingPage = () => {
  const { languageIndex, setPattern, textPattern } = useStore()
  const { bigSearch } = i18n.messages[languageIndex]
  const { searchHeading, searchButton } = bigSearch

  const navigate = useNavigate()

  const handleSubmit = (pattern: string) => {
    setPattern(pattern)
    const searchStr = stringifyUrlParams({ pattern: pattern })
    navigate({
      pathname: '/student/kurser/sokkurs-ny-design/resultat',
      search: searchStr,
    })
  }

  return (
    <Row>
      <MainContent>
        <PageHeading>{searchHeading}</PageHeading>
        <SearchInput pattern={textPattern} caption={searchButton} onSubmit={handleSubmit} />
      </MainContent>
    </Row>
  )
}

export default NewSearchLandingPage
