import React, { useEffect, useState } from 'react'

import { observer } from 'mobx-react'
import { useStore } from '../mobx'
import i18n from '../../../../i18n'
import { Checkbox } from '@kth/kth-reactstrap/dist/components/studinfo'
import { getParamConfig } from '../../../../domain/searchParams'

const optionsReducer = (state, action) => {
  const { value, type } = action
  const { options } = state

  switch (type) {
    case 'ADD_ITEM': {
      const lastIndex = options.length

      options[lastIndex] = value // because while it is in state it, turns array into ordered object
      return { options }
    }
    case 'REMOVE_ITEM': {
      const removeIndex = options.indexOf(value)
      if (removeIndex >= 0) {
        options.splice(removeIndex, 1) // delete options[removeIndex]
      }
      return { options }
    }
  }
}

function SearchOptions({ paramName, onChange }) {
  //caption = 'N/A',
  const store = useStore()
  const { languageIndex } = store
  const initialParamValue = store[paramName]
  const [{ options }, setOptions] = React.useReducer(optionsReducer, { options: initialParamValue })
  const { bigSearch } = i18n.messages[languageIndex]
  const searchHeadLevel = bigSearch[paramName]

  const values = getParamConfig(paramName, languageIndex)
  // [
  //   { label: 'Pre-university level', id: 'PREPARATORY', value: '0' },
  //...
  // ]

  useEffect(() => {
    // if (options && options.length > 0) no we still need update full value with empty
    onChange({ [paramName]: options })
  }, [options])

  function handleChange(e) {
    const { value, checked } = e.target
    console.log('value', value)
    setOptions({ value, type: checked ? 'ADD_ITEM' : 'REMOVE_ITEM' })
  }
  console.log('zzzzzzz options', options)

  return (
    <div key={paramName} className="form-group">
      <label className="form-control-label" htmlFor="exampleFormControlCheckboxes">
        {searchHeadLevel}
      </label>
      {values.map(({ label, id, value }) => (
        <div key={id} className="form-check form-group">
          <input
            id={id}
            name={paramName}
            value={value}
            type="checkbox"
            className="form-check-input"
            onChange={handleChange}
            checked={!!(options && options.includes(value))}
          />
          <label htmlFor={id} className="form-control-label">
            {label}
          </label>
        </div>
      ))}
      {/* <Checkbox
                id={id}
                // checked={unchecked}
                text={label}
                onChange={handleChange}
                value={value}
              /> */}
    </div>
  )
}

export default observer(SearchOptions)
