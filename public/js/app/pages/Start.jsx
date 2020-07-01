import React from 'react'

import { observer } from 'mobx-react'
import { useStore } from '../mobx'

import Button from '../components/Button'

const Start = () => {
  const { getMessage } = useStore()

  const message = getMessage()

  return (
    <main id="mainContent">
      <h1 className="display-3">Node-web</h1>
      <h2>You are up and running kth-node with React!</h2>
      <hr className="my-2" />
      <h3 data-testid="message-header">{`Message from applicationStore: ${message}`}</h3>
      <Button caption="Try me" />
    </main>
  )
}

export default observer(Start)
