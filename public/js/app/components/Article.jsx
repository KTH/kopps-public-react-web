import React from 'react'
import PropTypes from 'prop-types'

function Article({ classNames, children, uiKey = '' }) {
  return (
    <article className={`article article--no-start-margin ${classNames ? classNames.join(' ') : ''}`} key={uiKey}>
      {children}
    </article>
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
