import React, { Component, Fragment } from 'react'

class Button extends Component {
  constructor(props) {
    super(props)
    this.message = props.message
  }

  state = {
    buttonClicked: false
  }

  toggleButton = () => this.setState({ buttonClicked: !this.state.buttonClicked })

  render() {
    return (
      <Fragment>
        <h1 className="display-3">Node-web</h1>
        <h2>You are upp and running kth-node react!</h2>
        <hr className="my-2" />
        <h3 data-testid="message-header">{`Message from routerStore: ${this.message}`}</h3>
        <button type="button" onClick={this.toggleButton}>
          Try me
        </button>
        <p data-testid="click-message">{this.state.buttonClicked ? 'Button works!' : ''}</p>
      </Fragment>
    )
  }
}

export default Button
