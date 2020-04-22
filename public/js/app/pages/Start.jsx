import React, { Component, Fragment } from 'react'
import { inject, observer } from 'mobx-react'
import Button from '../components/Button'

@inject(['routerStore'])
@observer
class Start extends Component {
  render() {
    const { message } = this.props.routerStore
    return <Button message={message} />
  }
}

export default Start
