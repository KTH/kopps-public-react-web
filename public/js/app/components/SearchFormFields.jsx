import React, { useEffect, useState, useReducer } from 'react'
import { Col, Row } from 'reactstrap'

import { observer } from 'mobx-react'
import { useStore } from '../mobx'
import i18n from '../../../../i18n'

import { SearchOptions } from '../components/index'

const paramsReducer = (state, action) => {
  if (action.period && state.period) {
    const mergedBothYearPeriods = { period: [...state.period, ...action.period] }
    return { ...state, ...mergedBothYearPeriods }
  }
  return { ...state, ...action }
}

function SearchFormFields({ caption = 'N/A', onSubmit, isTest = false }) {
  const { language: lang, languageIndex, textPattern: initialPattern = '' } = useStore()
  // const [pattern, setPattern] = useState(initialPattern || '')

  const { generalSearch } = i18n.messages[languageIndex]
  const { searchLabel, searchStartPeriodPrefix, searchText } = generalSearch
  const [state, setState] = useReducer(paramsReducer, { pattern: initialPattern })

  const { pattern } = state
  console.log('-----top state', state)

  const currentYear = isTest ? new Date().setFullYear(2021) : new Date().getFullYear()
  const currentYearLabel = `${searchStartPeriodPrefix} ${currentYear}`
  const nextYearLabel = `${searchStartPeriodPrefix} ${Number(currentYear) + 1}`

  function handlePatternChange(e) {
    setState({ pattern: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(state)
  }

  function handlePeriodChange(periods) {
    setState(periods)
  }

  function handleParamChange(params) {
    setState(params)
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-label={caption}
      name="searchForm"
      role="search"
      style={{
        display: 'block',
      }}
    >
      <div className="form-group">
        <label htmlFor="pattern">
          {searchLabel}
          <span id="searchfield-help-text" style={{ fontWeight: 'normal', display: 'block' }}>
            {searchText}
          </span>
        </label>
        <input
          id="pattern"
          type="text"
          onChange={handlePatternChange}
          maxLength={80}
          size={50}
          value={pattern}
          name="pattern"
        />
      </div>
      <Row>
        <Col>
          <SearchOptions
            overrideSearchHead={currentYearLabel}
            paramAliasName="currentYear"
            paramName="period"
            onChange={handlePeriodChange}
          />
        </Col>
        <Col>
          <SearchOptions
            overrideSearchHead={nextYearLabel}
            paramAliasName="nextYear"
            paramName="period"
            onChange={handlePeriodChange}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <SearchOptions paramName="eduLevel" onChange={handleParamChange} />
        </Col>
        <Col>
          <SearchOptions paramName="showOptions" onChange={handleParamChange} />
        </Col>
      </Row>
      <Row>
        <Col></Col>
      </Row>

      <button className="btn btn-primary" type="submit" style={{ float: 'right' }}>
        {caption}
      </button>
    </form>
  )
}

export default observer(SearchFormFields)
