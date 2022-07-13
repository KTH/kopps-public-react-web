import React, { useReducer } from 'react'
import { Col, Row } from 'reactstrap'
import PropTypes from 'prop-types'
import { CollapseDetails } from '@kth/kth-reactstrap/dist/components/utbildningsinfo'

import { useStore } from '../mobx'
import i18n from '../../../../i18n'

// eslint-disable-next-line import/no-cycle
import { SearchDepartments, SearchOptions } from './index'

const paramsReducer = (state, action) => ({ ...state, ...action })

function SearchFormFields({ caption, openOptions, onSubmit }) {
  const { languageIndex, textPattern: initialPattern = '' } = useStore()

  const { generalSearch } = i18n.messages[languageIndex]
  const { searchLabel, searchStartPeriodPrefix, searchText, collapseHeaderOtherSearchOptions } = generalSearch
  const [state, setState] = useReducer(paramsReducer, { pattern: initialPattern })
  const { pattern } = state

  const currentYearDate = new Date().getFullYear()
  const currentYearLabel = `${searchStartPeriodPrefix} ${currentYearDate}`
  const nextYearLabel = `${searchStartPeriodPrefix} ${Number(currentYearDate) + 1}`

  function handlePatternChange(e) {
    const { value } = e.target
    const cleanTextPattern = value ? value.replace(/['"<>$]+/g, '') : ''
    setState({ pattern: cleanTextPattern })
  }

  function handleSubmit(e) {
    e.preventDefault()

    setState({ pattern: pattern.trim() })

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
      <CollapseDetails open={openOptions} title={collapseHeaderOtherSearchOptions}>
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
      </CollapseDetails>
      <Row>
        <Col>
          <button className="btn btn-primary" type="submit" style={{ float: 'right' }}>
            {caption}
          </button>
        </Col>
      </Row>
    </form>
  )
}

SearchFormFields.propTypes = {
  caption: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  openOptions: PropTypes.bool.isRequired,
}

export default SearchFormFields
