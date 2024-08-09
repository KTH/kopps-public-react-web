import React, { useState, useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../mobx'
import i18n from '../../../../../i18n'
import { getParamConfig } from '../../../../../domain/searchParams'
import { SearchOptionsProps } from './types'

const SearchOptions: React.FC<SearchOptionsProps> = ({
  overrideSearchHead = '',
  paramAliasName = '',
  paramName,
  onChange,
  disabled = false,
}) => {
  const store = useStore()
  const { languageIndex } = store
  const initialParamValue = store[paramName] as string[]
  const [options, setOptions] = useState<string[]>(initialParamValue || [])

  const { bigSearch } = i18n.messages[languageIndex]
  const searchHeadLevel = overrideSearchHead || bigSearch[paramName]

  const values = useMemo(
    () => getParamConfig(paramAliasName || paramName, languageIndex),
    [paramAliasName, paramName, languageIndex]
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    setOptions(prevOptions => {
      if (checked) {
        prevOptions.push(value)
      } else {
        const index = prevOptions.indexOf(value)
        if (index >= 0) {
          prevOptions.splice(index, 1)
        }
      }
      onChange({ [paramName]: prevOptions })
      return prevOptions
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

SearchOptions.defaultProps = {
  overrideSearchHead: '',
  paramAliasName: '',
  disabled: false,
}

export default observer(SearchOptions)
