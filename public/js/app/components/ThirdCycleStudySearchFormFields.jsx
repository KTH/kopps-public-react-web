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

  const { generalSearch, bigSearch } = i18n.messages[languageIndex]
  const { searchLabel, collapseHeaderOtherSearchOptions } = generalSearch
  const { onlyMHULabel } = bigSearch
  const [state, setState] = useReducer(paramsReducer, { pattern: initialPattern })
  const { pattern } = state

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
        <label htmlFor="pattern">{searchLabel}</label>
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
              paramName="showOptions"
              paramAliasName="onlyMHU"
              overrideSearchHead={onlyMHULabel}
              onChange={handleParamChange}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <SearchDepartments onChange={handleParamChange} />
          </Col>
        </Row>
      </CollapseDetails>
      <Row>
        <Col style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="kth-button primary" type="submit" style={{ float: 'end' }}>
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
