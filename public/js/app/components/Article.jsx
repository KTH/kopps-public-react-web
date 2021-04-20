import React from 'react'
import PropTypes from 'prop-types'

function Article({ classNames, children }) {
  return <article className={`article ${classNames ? classNames.join(' ') : ''}`}>{children}</article>
}

Article.propTypes = {
  classNames: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

Article.defaultProps = {
  classNames: [],
}

export default Article
