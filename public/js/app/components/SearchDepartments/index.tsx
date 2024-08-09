import React, { useState, ChangeEvent } from 'react'
import { useStore } from '../../mobx'
import i18n from '../../../../../i18n'
import translate from '../../../../../domain/translate'
import { localeCompareDepartments } from '../../../../../domain/departments'

import { SearchDepartmentsProps, SchoolsWithDepartments } from './types'

const SearchDepartments: React.FC<SearchDepartmentsProps> = ({ onChange, disabled = false }) => {
  const store = useStore()
  const {
    currentSchoolsWithDepartments,
    deprecatedSchoolsWithDepartments,
    departmentCodeOrPrefix: initialDepartmentCode = '',
    language,
    languageIndex,
  } = store

  const [department, setDepartment] = useState<string>(initialDepartmentCode)
  const { department: departmentLabel, departmentsAll, departmentsWithin } = i18n.messages[languageIndex].bigSearch
  const t = translate(language)

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const department = e.target.value
    setDepartment(department)
    onChange({ department })
  }

  return (
    <div key="department" className="form-group">
      <fieldset>
        <legend className="form-control-label">{departmentLabel}</legend>
        <select
          id="department"
          value={department}
          name="department"
          className="form-control"
          onChange={handleChange}
          disabled={disabled}
          aria-label={departmentLabel}
        >
          <option value="" key="all-schools">
            {departmentsAll}
          </option>
          {currentSchoolsWithDepartments.map(
            ({ departmentPrefix, name: schoolName, departments }: SchoolsWithDepartments) => (
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
            )
          )}
          <option key="deprecated-schools" className="form-control-label">
            {t('departments_deprecated_schools')}
          </option>
          {deprecatedSchoolsWithDepartments.map(
            ({ departmentPrefix, name: schoolName, departments }: SchoolsWithDepartments) => (
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
            )
          )}
        </select>
      </fieldset>
    </div>
  )
}

export default SearchDepartments
