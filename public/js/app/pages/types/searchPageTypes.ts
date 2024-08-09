import React from "react";

import { Pattern, Period, EduLevel, ShowOptions, DepartmentCodeOrPrefix } from "../../stores/types/searchPageStoreTypes";

export interface MainContentProps {
  children: React.ReactNode
}

export interface SearchParams {
  pattern: Pattern
  period: Period[]
  eduLevel: EduLevel[]
  showOptions: ShowOptions[]
  department: DepartmentCodeOrPrefix
}
