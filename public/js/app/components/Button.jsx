import React, { useState } from 'react'

function Button({ caption = 'N/A' }) {
  const [buttonClicked, setButtonClicked] = useState(false)

  return (
    <>
      <button type="button" onClick={() => setButtonClicked(true)}>
        {caption}
      </button>
      <p data-testid="click-message">{buttonClicked ? 'Button works!' : ''}</p>
    </>
  )
}

export default Button
