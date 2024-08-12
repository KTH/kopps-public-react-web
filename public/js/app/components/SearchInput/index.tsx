import React, { CSSProperties, useState, ChangeEvent, FormEvent } from 'react'
import { useStore } from '../../mobx'
import i18n from '../../../../../i18n'

import { SearchInputProps } from './types'

const SearchInputField: React.FC<SearchInputProps> = ({ caption, initialValue = '', onSubmit, disabled }) => {
  const { languageIndex } = useStore()
  const [inputText, setInputText] = useState<string>(initialValue)

  const { generalSearch } = i18n.messages[languageIndex]
  const { searchLabel } = generalSearch

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(inputText)
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
          value={inputText}
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
