import React from 'react'
import { inject, observer} from 'mobx-react'
import { Jumbotron, Button } from 'reactstrap'

@inject(['routerStore']) @observer
class Start extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      buttonClicked: false
    }
    this.toggleButton = this.toggleButton.bind(this)
  }

  toggleButton(event){
    this.setState({
      buttonClicked: this.state.buttonClicked !== true
    })
  }

  render () {
    return (

      <div>
         <Jumbotron>
          <h1 className="display-3">HELLO!!</h1>
          <h2>You are upp and running kth-node react!</h2> 
          <hr className="my-2" />
          <h3>Message from routerStore: {this.props.routerStore.test}</h3> 
          <Button onClick={this.toggleButton}>Try me</Button>
          <p>{this.state.buttonClicked ? "Button works!" : "" }</p>
        </Jumbotron>
      </div>
    )
  }
}

export default Start
