import React, { useReducer } from 'react'
import { Col, Row } from 'reactstrap'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'
import { useStore } from '../mobx'
import i18n from '../../../../i18n'

// eslint-disable-next-line import/no-cycle
import { SearchDepartments, SearchOptions } from './index'

const paramsReducer = (state, action) => ({ ...state, ...action })

function SearchFormFields({ caption, onSubmit, isTest = false }) {
  const { languageIndex, textPattern: initialPattern = '' } = useStore()

  const { generalSearch } = i18n.messages[languageIndex]
  const { searchLabel, searchStartPeriodPrefix, searchText } = generalSearch
  const [state, setState] = useReducer(paramsReducer, { pattern: initialPattern })
  const { pattern } = state

  const currentYearDate = isTest ? new Date().setFullYear(2021) : new Date().getFullYear()
  const currentYearLabel = `${searchStartPeriodPrefix} ${currentYearDate}`
  const nextYearLabel = `${searchStartPeriodPrefix} ${Number(currentYearDate) + 1}`

  function handlePatternChange(e) {
    setState({ pattern: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()

    onSubmit(state)
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
            onChange={handleParamChange}
          />
        </Col>
        <Col>
          <SearchOptions
            overrideSearchHead={nextYearLabel}
            paramAliasName="nextYear"
            paramName="period"
            onChange={handleParamChange}
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
        <Col>
          <SearchDepartments onChange={handleParamChange} />
        </Col>
      </Row>

      <button className="btn btn-primary" type="submit" style={{ float: 'right' }}>
        {caption}
      </button>
    </form>
  )
}

SearchFormFields.propTypes = {
  caption: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isTest: PropTypes.bool,
}

SearchFormFields.defaultProps = {
  isTest: false,
}

export default observer(SearchFormFields)
