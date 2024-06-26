import React from 'react'
import PropTypes from 'prop-types'
import TypescriptComponent from './TypescriptComponent.tsx'

// function Article({ classNames, children, uiKey = '' }) {
//   return (
//     <article className={`article article--no-start-margin ${classNames ? classNames.join(' ') : ''}`} key={uiKey}>
//       {children}
//     </article>
//   )
// }
function Article({ classNames, children, uiKey = '' }) {
  return (
    <div>
      <TypescriptComponent title={"I'M A TYPESCRIPT COMPONENT"} />
      <article className={`article article--no-start-margin ${classNames ? classNames.join(' ') : ''}`} key={uiKey}>
        {children}
      </article>
    </div>
  )
}

Article.propTypes = {
  classNames: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

Article.defaultProps = {
  classNames: [],
}

export default Article
