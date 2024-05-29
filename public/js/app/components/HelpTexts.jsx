import React from 'react'

function HelpTexts({ helptexts }) {
  return (
    <div className="article">
      <ul>
        {helptexts.map(value => (
          <li key={value}>{value}</li>
        ))}
      </ul>
    </div>
  )
}

export default HelpTexts
