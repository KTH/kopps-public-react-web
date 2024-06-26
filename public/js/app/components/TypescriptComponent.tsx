import React, { FC } from 'react'

interface TitleProps {
  title: string
}

const TypescriptComponent: FC<TitleProps> = ({ title }) => {
  return <p className="typescript-component">{title}</p>
}

export default TypescriptComponent
