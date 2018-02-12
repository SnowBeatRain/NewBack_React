import fetch from 'isomorphic-fetch'
import {message} from 'antd'

// Let Host
// If (process.env.NODE_ENV === 'production') {
//   Host = '生产'
// } else if (process.env.NODE_ENV === 'test') {
//   Host = '测试'
// } else {
//   Host = '开发'
// }

// Url
// Let baseurl = 'baseurl'
// Function url(url) {
//   Return baseurl + url
// }

// 开发模式使用proxy

// Fecth 请求
function ApiFetch(api, params = {}, urlparams = {}, isJson = false) {
  let headers = {
      time: Date.parse(new Date()) / 1000,
      version: 'v1',
      authorization: sessionStorage.getItem('login-token')
    },
    body = new FormData()

  // 判断是否要求json格式数据
    if (api.type.method === 'get') {
          let str = ''

          for (let key in urlparams) {
              str += `${key}=${urlparams[key]}&`
          }
          str = str.slice(0, -1)

          return fetch(`${api.url}?${str}`, Object.assign({}, api.type, {headers}))
              .then(res => res.json())
    } else {
        if (!isJson) {
            for (let i in params) {
                body.append(i, params[i])
            }
        } else {
            headers['Content-Type'] = 'application/json'
            body = JSON.stringify(params)
        }

        let str = ''

        for (let key in urlparams) {
            str += `${key}=${urlparams[key]}&`
        }
        str = str.slice(0, -1)

        return fetch(`${api.url}?${str}`, Object.assign({}, api.type, {headers, body}))
            .then(res => res.json())
    }
}

// 该项目中时间戳精确到秒也就是10位因此需要*1000
function dateFormat(d) {
    if (`${d}`.length === 10) {
        d *= 1000
    }

    //判断时间字符串是否单个
    function test(data) {
        return data < 10 ? `0${data}` : data
    }
    let time = new Date(parseInt(d))
    let year = time.getFullYear()
    let month = test(time.getMonth() + 1)
    let date = test(time.getDate())
    let hour = test(time.getHours())
    let minute = test(time.getMinutes())
    let second = test(time.getSeconds())

    return `${year}-${month}-${date} ${hour}:${minute}:${second}`
}

// 获取 id对应属性
function getquery(id) {
    let path = window.location.search

    path = path.split('?')[1]
    let patharr = path.split('&')
    let obj = {}

    for (let i = 0; i < patharr.length;i++) {
        let key = patharr[i].split('=')[0]

        obj[key] = patharr[i].split('=')[1]
    }

    return obj[id]
}

    // 非空验证
    function _isBlank(val, msg) {
        if (val.length === 0) {
            message.warning(msg)

            return false
        }

        return true
    }

    // 手机号格式验证
    function _valPhone(phone, msg) {
        if (_isBlank(phone, '手机号不能为空')) {
            if (!/^1(3|4|5|7|8)\d{9}$/.test(phone)) {
                message.warning(msg)

                return false
            }

            return true
        }
    }

// 获取token
function Removetoken() {
  sessionStorage.removeItem('login-token')
}

// 格式化数字 123456 => 123,456

function modifyNum(num) {
    return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
}

export const tool = {
  fetch: ApiFetch,
  removetoken: Removetoken,
  getquery,
    _valPhone,
    _isBlank,
    modifyNum,
    dateFormat
}
