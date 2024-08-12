import React, { useMemo } from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../mobx'
import i18n from '../../../../../i18n'
import { getParamConfig } from '../../../../../domain/searchParams'
import { SearchOptionConfig, SearchOptionValues, SearchOptionsProps } from './types'

const SearchOptions: React.FC<SearchOptionsProps> = ({
  overrideSearchHead = '',
  paramAliasName = '',
  paramName,
  onChange,
  disabled,
  selectedValues,
}) => {
  const store = useStore()
  const { languageIndex } = store

  const { bigSearch } = i18n.messages[languageIndex]
  const searchHeadLevel = overrideSearchHead || bigSearch[paramName]

  const values: SearchOptionConfig[] = useMemo(
    () => getParamConfig(paramAliasName || paramName, languageIndex),
    [paramAliasName, paramName, languageIndex]
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target
    const newValues = checked ? [...selectedValues, value] : selectedValues.filter(x => x !== value)
    onChange({ [paramName]: newValues as SearchOptionValues })
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
              checked={!!(selectedValues && selectedValues.includes(value))}
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
