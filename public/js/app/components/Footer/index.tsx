import React from 'react'
import { FooterProps } from './types'

function Footer({ children }: FooterProps) {
  return (
    <footer id="articleFooter" className="border-top mt-4 pt-1">
      {children}
    </footer>
  )
}

export default Footer
