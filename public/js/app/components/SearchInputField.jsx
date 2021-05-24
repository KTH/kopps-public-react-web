import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { observer } from 'mobx-react'
import { useStore } from '../mobx'
import i18n from '../../../../i18n'

function SearchInputField({ caption = 'N/A', pattern: externalPattern, onSubmit }) {
  const { languageIndex } = useStore()
  const [pattern, setPattern] = useState(externalPattern || '')

  const { generalSearch } = i18n.messages[languageIndex]
  const { searchLabel, searchText } = generalSearch

  useEffect(() => {
    if (typeof externalPattern === 'string') setPattern(externalPattern)
  }, [externalPattern])

  function handleChange(e) {
    setPattern(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(pattern)
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
          onChange={handleChange}
          maxLength={80}
          size={50}
          value={pattern}
          name="pattern"
        />
      </div>
      <button className="btn btn-primary" type="submit" style={{ float: 'right' }}>
        {caption}
      </button>
    </form>
  )
}

SearchInputField.propTypes = {
  caption: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  pattern: PropTypes.string,
}

SearchInputField.defaultProps = {
  pattern: '',
}

export default observer(SearchInputField)
