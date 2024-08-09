import React, { CSSProperties, useState, ChangeEvent, FormEvent } from 'react'
import { useStore } from '../../mobx'
import i18n from '../../../../../i18n'

import { SearchInputProps } from './types'

const SearchInputField: React.FC<SearchInputProps> = ({
  caption,
  pattern: externalPattern = '',
  onSubmit,
  disabled,
}) => {
  const { languageIndex } = useStore()
  const [pattern, setPattern] = useState<string>(externalPattern)

  const { generalSearch } = i18n.messages[languageIndex]
  const { searchLabel } = generalSearch

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPattern(e.target.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(pattern)
  }

  const FormStyles: CSSProperties = {
    display: 'flex',
    alignItems: 'end',
  }

  const SubmitStyles: CSSProperties = {
    margin: '2px 0.5rem',
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-label={caption}
      className="form-group"
      name="searchForm"
      role="search"
      style={FormStyles}
    >
      <div>
        <label htmlFor="pattern">{searchLabel}</label>
        <input
          id="pattern"
          type="text"
          onChange={handleChange}
          maxLength={80}
          size={50}
          value={pattern}
          name="pattern"
          disabled={disabled}
        />
      </div>
      <button disabled={disabled} className="kth-button primary" type="submit" style={SubmitStyles}>
        {caption}
      </button>
    </form>
  )
}

export default SearchInputField
