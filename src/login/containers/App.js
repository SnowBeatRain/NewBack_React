import React, {Component} from 'react'
import Login from '../components/Login'
import {message} from 'antd'
import {api} from '../../config/api'
import {tool} from '../../config/utils'

export default class App extends Component {
  constructor() {
    super()
  }

  // 登录获取token

  login = (phone, password) => {
    let reg = /^1[3|4|5|7|8][0-9]{9}$/

    if (!reg.test(phone)) {
      message.warning('手机号输入错误')

      return
    }
    if (password.length < 6) {
      message.warning('密码输入错误')

      return
    }
    let list = {
        password,
        phone
      },
      data = JSON.stringify(list)

    fetch(api.API_GET_LOGIN_TOKEN.url, {
      method: 'POST',
      headers: {
        version: 'v1',
        time: Date.parse(new Date()) / 1000
      },
      body: data
    }).then(response => response.json().then(json => {
      if (json.code === 0) {
          sessionStorage.setItem('login-token', json.data.access_token)
          sessionStorage.setItem('user-name', json.data.staff.name)
          sessionStorage.setItem('user-id', json.data.staff.id)

          // 获取公司信息
          tool.fetch(api.API_COMPANY_LIST, {}, {company_id: json.data.company_id}).then(json => {
              if (json.code === 0) {
                  sessionStorage.setItem('company-name', json.data.name)
                  sessionStorage.setItem('logo', json.data.logo)
              }
          })
        message.success('登录成功')
        this.props.history.push('/home')
      } else {
        message.warning(json.msg)
      }
    }))
  }
  render() {
    return (
      <div>
        <Login login={this.login}/>
      </div>
    )
  }
}
