import React from 'react'
import { View, VIEW } from './types'
import StandardView from './ListView'
import TableView from './TableView'
import { SearchData } from 'kopps-public-react-web/shared/SearchTypes'

const SearchResultContent: React.FC<{
  searchData: SearchData
  view: View
}> = ({ searchData, view }) => {
  switch (view) {
    case VIEW.list:
      return <StandardView searchData={searchData} />
    case VIEW.table:
      return <TableView searchData={searchData} />
    default:
      return null
  }
}

export default SearchResultContent
