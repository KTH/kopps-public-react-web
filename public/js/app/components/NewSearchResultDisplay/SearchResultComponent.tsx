import React from 'react'
import { SearchResultComponentParams, VIEW } from './types'
import ListView from './ListView'
import TableView from './TableView'
const SearchResultComponent: React.FC<SearchResultComponentParams> = ({ searchResults, view }) => {
  switch (view) {
    case VIEW.list:
      return <ListView results={searchResults.searchHits} />
    case VIEW.table:
      return <TableView />
    default:
      return null
  }
}

export default SearchResultComponent
