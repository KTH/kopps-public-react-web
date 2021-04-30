import React, { useEffect, useState } from 'react'

import { observer } from 'mobx-react'
import { useStore } from '../mobx'

import i18n from '../../../../i18n'

function SearchInputField({ caption = 'N/A', pattern: externalPattern, eduLevels = [3], onSubmit }) {
  const { language: lang, koppsCourseSearch } = useStore()
  const [pattern, setPattern] = useState(externalPattern || '')
  // const [eduLevels, setEduLevels] = useState(externalEduLevel || [3]) // 3 -> Forskarnivå

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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="pattern">
          Ange del av kursnamn eller kurskod:
          <span id="searchfield-help-text" style={{ fontWeight: 'normal', display: 'block' }}>
            Exempel på kurskod: SF1624
          </span>
        </label>
        {/* type="text" size="50" maxLength="80" value="" name="pattern"  */}
        <input id="pattern" onChange={handleChange} />
      </div>
      <button className="btn btn-primary" type="submit">
        {/* TODO: handle  koppsCourseSearch('sf') when too much search-error-overflow*/}
        {caption}
      </button>
    </form>
  )
}

export default observer(SearchInputField)
