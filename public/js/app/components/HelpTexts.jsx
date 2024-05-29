import React from 'react'

/**
 * HelpTexts Component
 *
 * This component displays a list of help texts. Some of these texts may contain HTML elements
 * that need to be rendered as HTML rather than plain text. To specify which texts should be
 * rendered as HTML, pass their indexes in the `htmlIndexes` prop. This ensures that only the
 * specified texts are treated as HTML.
 *
 * Props:
 * - helptexts (array): An array of help text strings. Some strings may contain HTML.
 * - htmlIndexes (array): An array of indexes indicating which help texts should be rendered
 *   as HTML.
 *
 * Example usage:
 * const helptexts = [
 *   'This is a plain text help message.',
 *   'If you have questions, please contact <a href="mailto:kopps@kth.se">kopps@kth.se</a>.',
 *   'Another plain text message.'
 * ];
 * const htmlIndexes = [1];
 *
 * <HelpTexts helptexts={helptexts} htmlIndexes={htmlIndexes} />
 */

function HelpTexts({ helptexts, htmlIndexes = [] }) {
  return (
    <div className="article">
      <ul>
        {helptexts.map((value, index) => {
          if (htmlIndexes.includes(index)) {
            return (
              // eslint-disable-next-line react/no-danger
              <li key={value} dangerouslySetInnerHTML={{ __html: value }} />
            )
          } else return <li key={value}>{value}</li>
        })}
      </ul>
    </div>
  )
}

export default HelpTexts
