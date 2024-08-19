import React, { useReducer } from 'react'

import './styles/searchPage.scss'

import { useNavigate } from 'react-router-dom'

import { Col, Row } from 'reactstrap'
import { Link, PageHeading } from '@kth/kth-reactstrap/dist/components/studinfo'
import SearchInput from '../components/SearchInput'

import { useStore } from '../mobx'
import i18n from '../../../../i18n'

import { CourseSearchParams, MainContentProps, SEARCH_MODES, SearchPageProps } from './types/searchPageTypes'
import { CollapseDetails } from '@kth/kth-reactstrap/dist/components/utbildningsinfo'
import { FooterContent, HelpTexts, Lead } from '../components'
import { getHelpText } from '../util/newSearchHelper'
import { useLangHrefUpdate } from '../hooks/useLangHrefUpdate'
import { SearchFilters } from '../components'
import { stringifyUrlParams } from '../../../../domain/searchParams'
import { FILTER_MODES } from '../components/SearchFilters/types'
import { courseSearchLink } from '../util/links'

const paramsReducer = (state: CourseSearchParams, action: any) => ({ ...state, ...action })

const NewSearchLandingPage: React.FC<SearchPageProps> = ({ searchMode = SEARCH_MODES.default }) => {
  const { languageIndex, language } = useStore()
  useLangHrefUpdate()
  const { bigSearch, searchInstructions, thirdCycleSearch, thirdCycleSearchInstructions } = i18n.messages[languageIndex]
  const { searchHeading: defaultSearchHeading, searchButton } = bigSearch
  const { search_help_collapse_header: defaultCollapseHeader } = searchInstructions
  const { searchHeading: thirdCycleSearchHeading, linkToUsualSearch } = thirdCycleSearch
  const { search_help_collapse_header: thirdCycleSearchCollapseHeader } = thirdCycleSearchInstructions

  let searchHeading, collapseHeader, helptextsProps

  const [courseSearchParams, setCourseSearchParams] = useReducer(paramsReducer, {
    pattern: '',
    period: [],
    eduLevel: [],
    showOptions: [],
    department: '',
  })

  const defaultHelptexts = getHelpText(languageIndex, 'searchInstructions', [
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

  const thirdCycleSearchHelptexts = getHelpText(languageIndex, 'thirdCycleSearchInstructions', [
    'search_research_help_1',
    'search_research_help_2',
    'search_research_help_3',
    'search_research_help_4',
    'search_research_help_5',
    'search_research_help_6',
  ])

  switch (searchMode) {
    case SEARCH_MODES.default:
      searchHeading = defaultSearchHeading
      collapseHeader = defaultCollapseHeader
      helptextsProps = {
        helptexts: defaultHelptexts,
        htmlIndexes: [9],
      }
      break
    case SEARCH_MODES.thirdCycleCourses:
      searchHeading = thirdCycleSearchHeading
      collapseHeader = thirdCycleSearchCollapseHeader
      helptextsProps = {
        helptexts: thirdCycleSearchHelptexts,
      }
    default:
      break
  }

  const navigate = useNavigate()

  const handleSubmit = (pattern: string) => {
    let filteredParams
    let stringifiedSearchParams
    switch (searchMode) {
      case SEARCH_MODES.default:
        filteredParams = Object.fromEntries(
          Object.entries({ ...courseSearchParams, pattern }).filter(([key, value]) => value !== '')
        )
        stringifiedSearchParams = stringifyUrlParams(filteredParams)
        navigate({
          pathname: '/student/kurser/sokkurs-ny-design/resultat',
          search: `?${stringifiedSearchParams}`,
        })
        break
      case SEARCH_MODES.thirdCycleCourses:
        filteredParams = Object.fromEntries(
          Object.entries({ ...courseSearchParams, eduLevel: [3], pattern }).filter(([key, value]) => value !== '')
        )
        stringifiedSearchParams = stringifyUrlParams(filteredParams)
        navigate({
          pathname: '/utbildning/forskarutbildning/kurser/sok-ny-design/resultat',
          search: `?${stringifiedSearchParams}`,
        })
      default:
        break
    }
  }

  return (
    <Row className="search-landing-page">
      <>
        <PageHeading>{searchHeading}</PageHeading>
        <SearchInput caption={searchButton} onSubmit={handleSubmit} />
        <CollapseDetails title={collapseHeader}>
          <HelpTexts {...helptextsProps} />
        </CollapseDetails>
        <SearchFilters
          filterMode={FILTER_MODES[searchMode]}
          courseSearchParams={courseSearchParams}
          setCourseSearchParams={setCourseSearchParams}
          collapsable={true}
        />
        {searchMode === SEARCH_MODES.thirdCycleCourses && (
          <>
            <Row>
              <Link href={courseSearchLink('sokkurs', language)}>{linkToUsualSearch}</Link>
            </Row>
            <Row>
              <FooterContent></FooterContent>
            </Row>
          </>
        )}
      </>
    </Row>
  )
}

export default NewSearchLandingPage
