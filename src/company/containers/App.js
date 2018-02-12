import React, {Component} from 'react'
import Header from '../../global/components/Header'
import Nav from '../../global/components/Nav'
import Companydetail from '../components/Companydetail'
import Query from '../components/Query'
import {tool} from '../../config/utils'
import {api} from '../../config/api'
import {message} from 'antd'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
        list: [],
        total: 0,
        companyDetail: {},
        page_index: 1,
        page_size: 10
  }
  }

   componentDidMount() {
      let {page_index, page_size} = this.state

       this._getPage({page_index, page_size})
   }

    // 获取pageData
    _getPage = params => {
        tool.fetch(api.API_GET_MANGECOMPANY_LIST, {}, params).then(res => {
            if (res.code === 0) {
                this.setState({
                    list: res.data.list,
                    total: res.data.total
                })
            } else {
                message.warning(res.msg)
            }
        }).catch(err => {
            message.warning(err.detail)
        })
    }

   // 跳转详情
    handleDetail = id => {
      this.setState({companyID: id}, () => {
          this._getDetail({company_id: id})
      })

      this.props.history.push('/company/detail')
    }

    // 获取公司详情data
    _getDetail = params => {
        tool.fetch(api.API_GET_MANGECOMPANY_INFO, {}, params).then(res => {
            if (res.code === 0) {
                    this.setState({companyDetail: res.data})
            }
        }).catch(err => {
            message.warning(err.detail)
        })
    }

    // 跳转页面
    _changePage = page => {
        this.setState({page_index: page}, () => {
            this._getPage({page_index: page, page_size: 10})
        })
    }

    // 改变审核状态
    changeStatus = (id, status) => {
        tool.fetch(api.API_POST_AUDIT_STATUS, {company_id: id, state: status}, {}, true).then(
            res => {
                if (res.code === 0) {
                    message.success('操作成功')
                }
            }

        )
    }

    // 审核公司结果
    _companyAudit = (id, status, e) => {
      e.stopPropagation()
        this.changeStatus(id, status) //改状态
       //重新获取涉及到性能
        let {page_index, page_size} = this.state

        this._getPage({page_index, page_size})
    }

  render() {
      let path = window.location.pathname
      const {page_size, page_index, list, total, companyDetail, status} = this.state

return (
          <div className="company">
            <Header/>
            <div className="fl"><Nav/></div>
            <div className="fr wrap">
              <div className="content">
                  {path === '/company' && <Query
                      checkDetail ={this.handleDetail}
                      list = {list}
                      total = {total}
                      _changePage= {this._changePage}
                      page_index={page_index}
                      page_size ={page_size}
                      _companyAudit={this._companyAudit}
                      status={status}
                  />}
                  {
                  path === '/company/detail' && <Companydetail
                      {...companyDetail}
                      _companyAudit={this._companyAudit}
                  />}
              </div>
            </div>
          </div>
    )
  }
}
