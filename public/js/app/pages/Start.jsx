import React from 'react'

import { observer } from 'mobx-react'
import { useStore } from '../mobx'

import Button from '../components/Button'

const Start = () => {
  const { getMessage } = useStore()

  return <Button message={getMessage()} />
}

export default observer(Start)
