import React, { CSSProperties, useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { useStore } from '../../mobx'
import i18n from '../../../../../i18n'

import { SearchInputProps } from './types'

const SearchInput: React.FC<SearchInputProps> = ({ caption, initialValue = '', onSubmit, disabled }) => {
  const { languageIndex } = useStore()
  const [inputText, setInputText] = useState<string>(initialValue)

  const { generalSearch } = i18n.messages[languageIndex]
  const { searchLabel } = generalSearch

  useEffect(() => {
    if (initialValue !== inputText) setInputText(initialValue)
    // This effect listens for changes in the onSubmit prop, which indirectly relates to changes in the search parameters.
    // If the input text has been modified by the user and handleSubmit is not called (meaning the search parameters haven't been updated yet),
    // this effect ensures that if someone changes the filters in another part of the application, if the input field's internal state doesn't match the initial value from the parent (e.g., due to manual input changes),
    // the input field will reset to reflect the initial value passed from the parent component.
  }, [onSubmit])

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

export default SearchInput
