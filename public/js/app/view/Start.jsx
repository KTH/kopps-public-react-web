import React from 'react'
import { inject, observer} from 'mobx-react'

@inject(['routerStore']) @observer
class Start extends React.Component {
  render () {
    return (
      <div>
        <h1>HELLO!! The result is from router store:</h1>
          <h2>{this.props.routerStore.test}</h2> 
      </div>
    )
  }
}

export default Start
