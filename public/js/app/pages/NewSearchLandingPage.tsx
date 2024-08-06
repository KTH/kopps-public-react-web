import React from 'react'

import { useNavigate } from 'react-router-dom'

import { Col, Row } from 'reactstrap'
import { PageHeading } from '@kth/kth-reactstrap/dist/components/studinfo'
import SearchInput from '../components/SearchInput'
import { stringifyUrlParams } from '../../../../domain/searchParams'
import { newSearchResultLink } from '../util/links'

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
  const { languageIndex, language, setPattern } = useStore()
  const navigate = useNavigate()

  const { bigSearch } = i18n.messages[languageIndex]
  const { searchHeading, searchButton } = bigSearch

  const handleSubmit = (pattern: string) => {
    setPattern(pattern)
    const searchStr = stringifyUrlParams({ pattern: pattern })
    let newUrl = newSearchResultLink(searchStr, language)
    if (newUrl.startsWith('/')) navigate(newUrl)
    else window.location.href = newUrl
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
