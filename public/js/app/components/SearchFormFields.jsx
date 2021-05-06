import React, { useEffect, useState, useReducer } from 'react'

import { observer } from 'mobx-react'
import { useStore } from '../mobx'
import i18n from '../../../../i18n'

import { SearchOptions } from '../components/index'

const paramsReducer = (state, action) => ({ ...state, ...action })

function SearchFormFields({ caption = 'N/A', onSubmit }) {
  const { language: lang, languageIndex, textPattern: initialPattern = '' } = useStore()
  // const [pattern, setPattern] = useState(initialPattern || '')

  const { generalSearch } = i18n.messages[languageIndex]
  const { searchLabel, searchText } = generalSearch
  const [state, setState] = useReducer(paramsReducer, { pattern: initialPattern })

  const { pattern, eduLevel, showOptions } = state
  console.log('-----top state', state)

  // useEffect(() => {
  //   setPattern(externalPattern)
  // }, [externalPattern])

  function handlePatternChange(e) {
    setState({ pattern: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(state)
  }

  function handleParamChange(params) {
    console.log('update params', params)
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
      <SearchOptions paramName="eduLevel" onChange={handleParamChange} />
      <SearchOptions paramName="showOptions" onChange={handleParamChange} />
      <button className="btn btn-primary" type="submit" style={{ float: 'right' }}>
        {caption}
      </button>
    </form>
  )
}

export default observer(SearchFormFields)
