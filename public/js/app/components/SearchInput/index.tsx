import React, { CSSProperties, useState, ChangeEvent, FormEvent, useEffect } from 'react'
import { useStore } from '../../mobx'
import i18n from '../../../../../i18n'

import { SearchInputProps } from './types'
import { useCourseSearchParams } from '../../hooks/useCourseSearchParams'

const SearchInput: React.FC<SearchInputProps> = ({ caption, onSubmit, realTimeUpdates = false, searchLabel, disabled }) => {
  const [courseSearchParams, setCourseSearchParams] = useCourseSearchParams()
  const [inputText, setInputText] = useState<string>(courseSearchParams.pattern)

  useEffect(() => {
    if (courseSearchParams.pattern !== inputText) setInputText(courseSearchParams.pattern)
    // This useEffect listens for changes in the courseSearchParams, which relates to changes in the search parameters.
    // If the input text has been modified by the user and handleSubmit is not called (meaning the search parameters haven't been updated yet),
    // this effect ensures that if someone changes the filters in another part of the application, if the input field's internal state doesn't match the initial value from the parent (e.g., due to manual input changes),
    // the input field will reset to reflect the initial value passed from the parent component.
  }, [courseSearchParams])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value)
    if (realTimeUpdates) onSubmit(e.target.value)
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
    flex: 'none',
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
          data-testid="pattern"
          type="text"
          onChange={handleChange}
          maxLength={80}
          size={50}
          value={inputText}
          name="pattern"
          disabled={disabled}
        />
      </div>
      {!realTimeUpdates && (
        <button disabled={disabled} className="kth-button primary" type="submit" style={SubmitStyles}>
          {caption}
        </button>
      )}
    </form>
  )
}

export default SearchInput
