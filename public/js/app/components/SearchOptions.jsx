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

function SearchOptions({ overrideSearchHead = '', paramAliasName = '', paramName, onChange }) {
  //caption = 'N/A',
  const store = useStore()
  const { languageIndex } = store
  const initialParamValue = store[paramName]
  const [{ options }, setOptions] = React.useReducer(optionsReducer, { options: initialParamValue || [] })
  const { bigSearch } = i18n.messages[languageIndex]
  const searchHeadLevel = overrideSearchHead || bigSearch[paramName]

  const values = React.useMemo(() => getParamConfig(paramAliasName || paramName, languageIndex), [
    paramAliasName,
    paramName,
    languageIndex,
  ])
  // [
  //   { label: 'Pre-university level', id: 'PREPARATORY', value: '0' },
  //...
  // ]

  useEffect(() => {
    onChange({ [paramName]: options })
  }, [options.length])

  function handleChange(e) {
    const { value, checked } = e.target
    setOptions({ value, type: checked ? 'ADD_ITEM' : 'REMOVE_ITEM' })
  }

  return (
    <div key={paramAliasName || paramName} className="form-group">
      <fieldset>
        <legend className="form-control-label">{searchHeadLevel}</legend>
        {values.map(({ label, id, value }) => (
          <div key={id} className="form-check form-group">
            <input
              id={id}
              name={paramAliasName || paramName}
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
      </fieldset>
    </div>
  )
}

export default SearchOptions
