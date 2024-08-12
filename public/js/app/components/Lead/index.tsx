import React from 'react'

import { LeadProps } from './types'

const Lead: React.FC<LeadProps> = ({ text }) => {
  return (
    <div className="lead">
      <p>{text}</p>
    </div>
  )
}

export default Lead
