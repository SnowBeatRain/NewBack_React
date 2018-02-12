import React, {Component} from 'react'
import '../sass/Login.scss'

export default class App extends Component {
  constructor() {
    super()
  }
  getData = () => {
    this.props.login(this.phone.value, this.password.value)
  }
  render() {
return (
      <div className="login">
        <div className="title">装修我当家</div>
        <div className="background"></div>
        <div className="text">
          <div className="head"><i className="iconfont icon-group"/><p>请登录</p></div>
          <input type="text" maxLength="11" ref={node => this.phone = node} placeholder="请输入用户名"/>
          <input type="password" minLength="6" ref={node => this.password = node} placeholder="请输入密码"/>
          <button onClick={this.getData}>登录</button>
        </div>
      </div>
    )
  }
}
