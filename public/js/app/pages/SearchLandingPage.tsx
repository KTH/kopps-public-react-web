import React, { useReducer } from 'react'

import './styles/searchPage.scss'

import { useNavigate } from 'react-router-dom'

import { PageHeading } from '@kth/kth-reactstrap/dist/components/studinfo'
import SearchInput from '../components/SearchInput'

import { useStore } from '../mobx'
import i18n from '../../../../i18n'

import { CourseSearchParams, SEARCH_MODES, SearchPageProps } from './types/searchPageTypes'
import { CollapseDetails } from '@kth/kth-reactstrap/dist/components/utbildningsinfo'
import { FooterContent, HelpTexts, Lead } from '../components'
import { getHelpText } from '../util/searchHelper'
import { useLangHrefUpdate } from '../hooks/useLangHrefUpdate'
import { SearchFilters } from '../components'
import { stringifyUrlParams } from '../../../../domain/searchParams'
import { pageLink } from '../util/links'

const paramsReducer = (state: CourseSearchParams, action: any) => ({ ...state, ...action })

const SearchLandingPage: React.FC<SearchPageProps> = ({ searchMode = SEARCH_MODES.default }) => {
  const { languageIndex, language } = useStore()
  const { generalSearch } = i18n.messages[languageIndex]
  const { searchLabel } = generalSearch
  useLangHrefUpdate()
  const { bigSearch, searchInstructions, thirdCycleSearch, thirdCycleSearchInstructions } = i18n.messages[languageIndex]
  const { searchHeading: defaultSearchHeading, searchButton, leadIntro: defaultSearchLeadIntro } = bigSearch
  const { search_help_collapse_header: defaultCollapseHeader } = searchInstructions
  const {
    searchHeading: thirdCycleSearchHeading,
    linkToUsualSearch,
    leadIntro: thirdCycleSearchLeadIntro,
  } = thirdCycleSearch
  const { search_help_collapse_header: thirdCycleSearchCollapseHeader } = thirdCycleSearchInstructions

  let searchHeading, collapseHeader, helptextsProps, leadIntro

  const [courseSearchParams, setCourseSearchParams] = useReducer(paramsReducer, {
    pattern: '',
    semesters: [],
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
      leadIntro = defaultSearchLeadIntro
      collapseHeader = defaultCollapseHeader
      helptextsProps = {
        helptexts: defaultHelptexts,
        htmlIndexes: [9],
      }
      break
    case SEARCH_MODES.thirdCycleCourses:
      searchHeading = thirdCycleSearchHeading
      leadIntro = thirdCycleSearchLeadIntro
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
          pathname: '/student/kurser/sokkurs/resultat',
          search: `?${stringifiedSearchParams}`,
        })
        break
      case SEARCH_MODES.thirdCycleCourses:
        filteredParams = Object.fromEntries(
          Object.entries({ ...courseSearchParams, eduLevel: [3], pattern }).filter(([key, value]) => value !== '')
        )
        stringifiedSearchParams = stringifyUrlParams(filteredParams)
        navigate({
          pathname: '/utbildning/forskarutbildning/kurser/sok/resultat',
          search: `?${stringifiedSearchParams}`,
        })
      default:
        break
    }
  }

  return (
    <div className="search-landing-page">
      <PageHeading>{searchHeading}</PageHeading>
      <Lead text={leadIntro} />
      <SearchInput caption={searchButton} onSubmit={handleSubmit} searchLabel={searchLabel}/>
      <SearchFilters
        searchMode={searchMode}
        courseSearchParams={courseSearchParams}
        setCourseSearchParams={setCourseSearchParams}
        collapsable={true}
      />
      <CollapseDetails title={collapseHeader}>
        <HelpTexts {...helptextsProps} />
      </CollapseDetails>
      {searchMode === SEARCH_MODES.thirdCycleCourses && (
        <a className="link-to" href={pageLink('/student/kurser/sokkurs?l=en', language)}>
          {linkToUsualSearch}
        </a>
      )}
      <FooterContent></FooterContent>
    </div>
  )
}

export default SearchLandingPage
