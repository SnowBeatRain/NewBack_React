import React from 'react'
import {withRouter} from 'react-router-dom'
import Routes from './router/index'

import './App.scss'

// Export default class App extends Component {

class App extends React.Component {
  constructor() {
    super()
  }

  // 判断是否有token 没有跳转到login
  componentDidMount() {
    let loginToken = window.sessionStorage.getItem('login-token')

    if (!loginToken) {
      this.props.history.push('/login')
    }
  }
  render() {
    return (
      <div style={{background: '#ffffff'}}>
        <Routes/>
      </div>
    )
  }
}
export default withRouter(App)
