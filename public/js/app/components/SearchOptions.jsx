import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { useStore } from '../mobx'
import i18n from '../../../../i18n'
import { getParamConfig } from '../../../../domain/searchParams'

function SearchOptions({ overrideSearchHead = '', paramAliasName = '', paramName, onChange }) {
  const store = useStore()
  const { languageIndex } = store
  const initialParamValue = store[paramName] || []
  const [options, setOptions] = useState(initialParamValue)
  const { bigSearch } = i18n.messages[languageIndex]
  const searchHeadLevel = overrideSearchHead || bigSearch[paramName]

  const values = React.useMemo(
    () => getParamConfig(paramAliasName || paramName, languageIndex),
    [paramAliasName, paramName, languageIndex]
  )

  function handleChange(e) {
    const { value, checked } = e.target
    setOptions(prevOptions => {
      const updatedOptions = checked ? [...prevOptions, value] : prevOptions.filter(option => option !== value)

      onChange({ [paramName]: updatedOptions })
      return updatedOptions
    })
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
