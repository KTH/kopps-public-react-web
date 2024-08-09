import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { useStore } from '../mobx'
import i18n from '../../../../i18n'
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
        options.splice(removeIndex, 1)
      }
      return { options }
    }
    default: {
      throw new Error(
        `Cannot change the state in reducer. Unknown type of action: ${type}. Allowed options: ADD_ITEM, REMOVE_ITEM`
      )
    }
  }
}

function SearchOptions({ overrideSearchHead = '', paramAliasName = '', paramName, onChange, disabled }) {
  const store = useStore()
  const { languageIndex } = store
  const initialParamValue = store[paramName]
  const [{ options }, setOptions] = React.useReducer(optionsReducer, { options: initialParamValue || [] })
  const { bigSearch } = i18n.messages[languageIndex]
  const searchHeadLevel = overrideSearchHead || bigSearch[paramName]

  const values = React.useMemo(
    () => getParamConfig(paramAliasName || paramName, languageIndex),
    [paramAliasName, paramName, languageIndex]
  )
  // [{ label, id, value}, ...]

  useEffect(() => {
    let isMounted = true

    if (isMounted) onChange({ [paramName]: options })
    return () => (isMounted = false)
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
              disabled={disabled}
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

SearchOptions.propTypes = {
  overrideSearchHead: PropTypes.string,
  paramAliasName: PropTypes.oneOf(['currentYear', 'nextYear', 'onlyMHU', '']),
  paramName: PropTypes.oneOf(['eduLevel', 'period', 'showOptions']).isRequired,
  onChange: PropTypes.func.isRequired,
}

SearchOptions.defaultProps = {
  overrideSearchHead: '',
  paramAliasName: '',
}

export default SearchOptions
