import React, { useEffect, useState } from 'react'

import { observer } from 'mobx-react'
import { useStore } from '../mobx'
import i18n from '../../../../i18n'

function SearchInputField({ caption = 'N/A', pattern: externalPattern, onSubmit }) {
  const { language: lang } = useStore()
  const [pattern, setPattern] = useState(externalPattern || '')

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
      aria-label={'Sök forskarkurs'}
      name="searchForm"
      role="search"
      style={{
        display: 'block',
      }}
    >
      <div className="form-group">
        <label htmlFor="pattern">
          Ange del av kursnamn eller kurskod:
          <span id="searchfield-help-text" style={{ fontWeight: 'normal', display: 'block' }}>
            Exempel på kurskod: SF1624
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

export default observer(SearchInputField)
