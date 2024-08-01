import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { useStore } from '../mobx'
import i18n from '../../../../i18n'

interface SearchInputFieldProps {
  caption: string;
  onSubmit: (pattern: string) => void;
  pattern?: string;
}

const SearchInputField: React.FC<SearchInputFieldProps> = ({ caption, pattern: externalPattern = '', onSubmit }) => {
  const { languageIndex } = useStore()
  const [pattern, setPattern] = useState<string>(externalPattern)

  const { generalSearch } = i18n.messages[languageIndex]
  const { searchLabel } = generalSearch

  useEffect(() => {
    let isMounted = true

    if (isMounted && typeof externalPattern === 'string') setPattern(externalPattern)
    return () => {
      isMounted = false
    }
  }, [externalPattern])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPattern(e.target.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div className="form-group">
        <label htmlFor="pattern">{searchLabel}</label>
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
      <button className="kth-button primary" type="submit" style={{ alignSelf: 'flex-end' }}>
        {caption}
      </button>
    </form>
  )
}

export default SearchInputField
