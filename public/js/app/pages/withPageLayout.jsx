/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import PageLayout from './PageLayout'

function withPageLayout(WrappedComponent) {
  return function addPageLayout(props) {
    return (
      <PageLayout {...props}>
        <WrappedComponent {...props} />
      </PageLayout>
    )
  }
}

export default withPageLayout
