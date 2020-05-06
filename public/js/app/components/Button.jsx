import React, { Fragment, useState } from 'react'

function Button({ message = 'N/A' }) {
  const [buttonClicked, setButtonClicked] = useState(false)

  return (
    <Fragment>
      <h1 className="display-3">Node-web</h1>
      <h2>You are upp and running kth-node react!</h2>
      <hr className="my-2" />
      <h3 data-testid="message-header">{`Message from routerStore: ${message}`}</h3>
      <button type="button" onClick={() => setButtonClicked(true)}>
        Try me
      </button>
      <p data-testid="click-message">{buttonClicked ? 'Button works!' : ''}</p>
    </Fragment>
  )
}

export default Button
