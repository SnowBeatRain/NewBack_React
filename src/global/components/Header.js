import React, {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {tool} from '../../config/utils'
import '../sass/Header.scss'

class Header extends Component {
  constructor() {
    super()
  }

  // 退出：1.清token 2.路由跳转login
    handleExit = e => {
      e.stopPropagation()
      tool.removetoken()
      this.props.history.push('/login')
    }

    render() {
        let userName = sessionStorage.getItem('user-name')
        let company = sessionStorage.getItem('company-name')

return (
        <div className ="de-header">
          <div className ="left">
            <span className ="txt">{company}</span>
            <span className ="line"></span>
          </div>
          <div className ="right">
            <i className ="iconfont icon-advicecopy msg-icon"></i>
            <Link to = "/message" className = "msg">消息</Link>
            <span className = "name">{userName}</span>
            <span className = "exit" onClick={this.handleExit}>退出</span>
          </div>
        </div>
      )
    }
}

export default withRouter(Header)
