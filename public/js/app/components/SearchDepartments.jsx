import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { useStore } from '../mobx'
import i18n from '../../../../i18n'
import translate from '../../../../domain/translate'

import { localeCompareDepartments } from '../../../../domain/departments'

function SearchDepartments({ onChange, disabled, departmentCode }) {
  const store = useStore()
  const { currentSchoolsWithDepartments, deprecatedSchoolsWithDepartments, language, languageIndex } = store
  const { department: departmentLabel, departmentsAll, departmentsWithin } = i18n.messages[languageIndex].bigSearch
  const t = translate(language)

  function handleChange(e) {
    onChange({ department: e.target.value })
  }

  return (
    <div key="department" className="form-group">
      <fieldset>
        <legend className="form-control-label">{departmentLabel}</legend>
        <select
          id="department"
          value={departmentCode}
          name="department"
          className="form-control"
          onChange={handleChange}
          disabled={disabled}
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
