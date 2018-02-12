import React, {Component} from 'react'
import Header from '../../global/components/Header'
import Nav from '../../global/components/Nav'
import Message from '../components/Message'

export default class App extends Component {
  constructor() {
    super()
    this.state = {id: null}
  }

  render() {
    return (
      <div>
        <Header/>
        <div style={{float: 'left'}}><Nav/></div>
        <div style={{float: 'left'}}><Message/></div>
      </div>
    )
  }
}
