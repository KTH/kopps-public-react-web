import React from 'react'
import { hydrate, ReactDOM } from 'react-dom'
import { Router } from 'react-router'

// Components
// import Start from './view/Start.jsx'

class Start extends React.Component {
  render () {
    return (
      <div>
        <h1>HELLO!!</h1>
      </div>
    )
  }
}

function appFactory () {
  return (

    <Start />//, document.querySelector('#kth-node')
  )
}

if (typeof window !== 'undefined') {
  console.log('appFactory!!!!!!!!!!!!!!!', appFactory())
  ReactDOM.render(<Router /* history={browserNativeHistoryApiWrapper} */>{appFactory()}</Router>, document.getElementById('kth-node'))
}

export { appFactory }
