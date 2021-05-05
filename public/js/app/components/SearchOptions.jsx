import React, { useEffect, useState } from 'react'

import { observer } from 'mobx-react'
import { useStore } from '../mobx'
import i18n from '../../../../i18n'

function SearchOptions({ caption = 'N/A', pattern: externalPattern, onSubmit }) {
  const { language: lang, languageIndex } = useStore()
  const [pattern, setPattern] = useState(externalPattern || '')

  const { generalSearch } = i18n.messages[languageIndex]
  const { searchLabel, searchText } = generalSearch

    const paramName = 'eduLevel'
  const values = [{ label: 'Pre-university level', id: 'PREPARATORY', value: '0' },
  { label: 'First cycle', id: 'BASIC', value: '1' },
  { label: 'Second cycle', id: 'ADVANCED', value: '2' },
  { label: 'Third cycle', id: 'RESEARCH', value: '3' }]

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
    // <form>
    <>
      <div className="form-group">
        <label className="form-control-label" htmlFor="exampleFormControlCheckboxes">
          Educational level:
        </label>

        <div class="form-check form-group">
          <input id="0" name="eduLevel" value="0" type="checkbox" class="form-check-input" />
            <label for="0" class="form-control-label">
              Pre-university level
            </label>
          </div>

          <div class="form-check form-group">
            <input type="checkbox" class="form-check-input" id="exampleCheck1"></input>
            <label class="form-control-label" for="exampleCheck1">
              Check me out
            </label>
          </div>
          <div class="form-check form-group">
            <input type="checkbox" class="form-check-input" id="exampleCheck2"></input>
            <label class="form-control-label" for="exampleCheck2">
              Check me out
            </label>
          </div>
          <div class="form-check form-group">
            <input type="checkbox" class="form-check-input" id="exampleCheck3"></input>
            <label class="form-control-label" for="exampleCheck3">
              Check me out
            </label>
          </div>
        </div>
      </>
      //{' '}
    </form>
  )
}

export default observer(SearchOptions)
