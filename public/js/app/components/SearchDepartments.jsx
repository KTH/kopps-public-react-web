import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { useStore } from '../mobx'
import i18n from '../../../../i18n'
import translate from '../../../../domain/translate'

import { localeCompareDepartments } from '../../../../domain/departments'

function SearchDepartments({ onChange }) {
  const store = useStore()
  const {
    schoolsWithDepartments,
    currentSchoolsWithDepartments,
    deprecatedSchoolsWithDepartments,
    departmentCodeOrPrefix: initialDepartmentCode = '',
    language,
    languageIndex,
  } = store
  const [department, setDepartment] = useState(initialDepartmentCode)
  const { department: departmentLabel, departmentsAll, departmentsWithin } = i18n.messages[languageIndex].bigSearch
  const t = translate(language)

  useEffect(() => {
    let isMounted = true
    if (isMounted) onChange({ department })
    return () => (isMounted = false)
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
          aria-label={departmentLabel}
        >
          <option value="" key="all-schools">
            {departmentsAll}
          </option>
          {currentSchoolsWithDepartments.map(({ departmentPrefix, name: schoolName, departments }) => (
            <optgroup label={schoolName} key={schoolName}>
              <option key={`all-within-department-${departmentPrefix}`} value={departmentPrefix}>
                {`${departmentsWithin} ${schoolName}`}
              </option>
              {departments
                .sort(localeCompareDepartments(language))
                .map(({ code: departmentCode, name: departmentName }) => (
                  <option key={departmentCode} value={departmentCode}>
                    {departmentName}
                  </option>
                ))}
            </optgroup>
          ))}
          <option key="deprecated-schools" className="form-control-label">
            {t('departments_deprecated_schools')}
          </option>
          {deprecatedSchoolsWithDepartments.map(({ departmentPrefix, name: schoolName, departments }) => (
            <optgroup label={schoolName} key={schoolName}>
              <option key={`all-within-department-${departmentPrefix}`} value={departmentPrefix}>
                {`${departmentsWithin} ${schoolName}`}
              </option>
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
SearchDepartments.propTypes = {
  onChange: PropTypes.func.isRequired,
}

export default SearchDepartments
