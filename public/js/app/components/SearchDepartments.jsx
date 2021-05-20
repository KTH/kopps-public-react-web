import React, { useEffect, useState } from 'react'

import { observer } from 'mobx-react'
import { useStore } from '../mobx'
import i18n from '../../../../i18n'

function localeCompareDepartments(language) {
  return function compareDepartments(a, b) {
    return a.name.localeCompare(b.name, language)
  }
}
function SearchDepartments({ onChange }) {
  const store = useStore()
  const { schoolsWithDepartments, departmentCodeOrPrefix: initialDepartmentCode, language, languageIndex } = store
  const [department, setDepartment] = useState(initialDepartmentCode || '')
  const { department: departmentLabel, departmentsAll, departmentsWithin } = i18n.messages[languageIndex].bigSearch

  useEffect(() => {
    onChange({ department })
  }, [department])

  function handleChange(e) {
    setDepartment(e.target.value)
  }

  return (
    <div key="department" className="form-group">
      <fieldset>
        <legend className="form-control-label">{departmentLabel}</legend>
        <select
          id="department"
          defaultValue={initialDepartmentCode}
          name="department"
          className="form-control"
          onChange={handleChange}
        >
          <option value="" key="all-schools">
            {departmentsAll}
          </option>
          {schoolsWithDepartments.map(({ departmentPrefix, name: schoolName, departments }) => (
            <optgroup label={schoolName} key={schoolName}>
              <option
                key={`all-within-department-${departmentPrefix}`}
                value={departmentPrefix}
              >{`${departmentsWithin} ${schoolName}`}</option>
              {departments
                .sort(localeCompareDepartments(language))
                .map(({ code: departmentCode, name: departmentName }) => (
                  <option key={departmentCode} value={departmentCode}>
                    {departmentName}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
      </fieldset>
    </div>
  )
}

export default SearchDepartments
