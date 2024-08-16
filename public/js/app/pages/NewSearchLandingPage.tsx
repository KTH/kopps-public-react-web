import React from 'react'

import { useNavigate } from 'react-router-dom'

import { Col, Row } from 'reactstrap'
import { PageHeading } from '@kth/kth-reactstrap/dist/components/studinfo'
import SearchInput from '../components/SearchInput'

import { useStore } from '../mobx'
import i18n from '../../../../i18n'

import { MainContentProps } from './types/searchPageTypes'
import { CollapseDetails } from '@kth/kth-reactstrap/dist/components/utbildningsinfo'
import { HelpTexts } from '../components'
import { getHelpText } from '../util/newSearchHelper'
import { useLangHrefUpdate } from '../hooks/useLangHrefUpdate'

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <Col tag="main" id="mainContent">
      {children}
    </Col>
  )
}

const NewSearchLandingPage = () => {
  const { languageIndex } = useStore()
  useLangHrefUpdate()
  const { bigSearch, searchInstructions } = i18n.messages[languageIndex]
  const { searchHeading, searchButton } = bigSearch
  const { search_help_collapse_header: collapseHeader } = searchInstructions

  const helptexts = getHelpText(languageIndex, 'searchInstructions', [
    'search_help_1',
    'search_help_2',
    'search_help_3',
    'search_help_4',
    'search_help_5',
    'search_help_6',
    'search_help_7',
    'search_help_8',
    'search_help_9',
    'search_help_10',
  ])

  const navigate = useNavigate()

  const handleSubmit = (pattern: string) => {
    navigate({
      pathname: '/student/kurser/sokkurs-ny-design/resultat',
      search: `?pattern=${pattern}`,
    })
  }

  return (
    <Row>
      <MainContent>
        <PageHeading>{searchHeading}</PageHeading>
        <SearchInput caption={searchButton} onSubmit={handleSubmit} />
        <CollapseDetails title={collapseHeader}>
          <HelpTexts helptexts={helptexts} htmlIndexes={[9]} />
        </CollapseDetails>
      </MainContent>
    </Row>
  )
}

export default NewSearchLandingPage
