import React from 'react'
import { inject, observer} from 'mobx-react'

@inject(['routerStore'])
class Start extends React.Component {
  render () {
    console.log('????999?>routerStore>', this.props.routerStore)
    return (
      <div>
        <h1>HELLO!!</h1>
      </div>
    )
  }
}

export default Start
