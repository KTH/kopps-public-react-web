import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Button from '../components/Button'

@inject(['routerStore'])
@observer
class Start extends Component {
  render() {
    const { routerStore } = this.props
    const { message } = routerStore
    return <Button message={message} />
  }
}

export default Start
