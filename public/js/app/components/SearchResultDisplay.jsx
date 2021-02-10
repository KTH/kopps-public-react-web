import React, { useState } from 'react'

import { observer } from 'mobx-react'
import { useStore } from '../mobx'

import i18n from '../../../../i18n'

function SearchResultDisplay({ caption = 'N/A' }) {
  const { language: lang , koppsCourseData: data} = useStore()

  const [buttonClicked, setButtonClicked] = useState(false)

  return (
    <>
      {data ? <p>{JSON.stringify(data)}</p> : null}
    </>
  )
}

export default observer(SearchResultDisplay)
