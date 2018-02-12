import React, {Component} from 'react'
import Header from '../../global/components/Header'
import Nav from '../../global/components/Nav'
import Trade from '../components/Trade'
import Member from '../components/Member'
import Addmember from '../components/Addmember'
import {tool} from '../../config/utils'
import {api} from '../../config/api'
import {message} from 'antd'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
        showAdd: false,
        title: '',
        Memberlist: [],
        Membertotal: 0,
        Editid: '',
        TradeData: {},
        page_index: 1,
        page_size: 10,
        companyList: [],
        companyTotal: 0,
        defaultdata: {}

    }
  }

  // 获取交易中心交易状况和公司列表状况
  componentDidMount() {
      let {page_index, page_size} = this.state

      tool.fetch(api.API_GET_TRADEINFO).then(res => {
          if (res.code === 0) {
            this.setState({TradeData: res.data})
         }
      }).catch(err => message.warning('获取数据出错'))
      this._getMemberlist()
      this._getCompanyPage({page_index, page_size})
  }

    // 获取pageData
    _getCompanyPage = params => {
        tool.fetch(api.API_GET_MANGECOMPANY_LIST, {}, params).then(res => {
            if (res.code === 0) {
                this.setState({
                    companyList: res.data.list,
                    companyTotal: res.data.total
                })
            } else {
                message.warning(res.msg)
            }
        }).catch(err => {
            message.warning(err.detail)
        })
    }

    // 跳转页面
    _changeCompanyPage = page => {
        this.setState({page_index: page}, () => {
            this._getCompanyPage({page_index: page, page_size: 10})
        })
    }

  //获取会员信息
  _getMemberlist = () => {
        tool.fetch(api.API_GET_MEMBER_LIST).then(res => {
            if (res.code === 0) {
                this.setState({
                    Memberlist: res.data.list,
                    Membertotal: res.data.total

                })
            }
        }).catch(err => {
            message.warning(err.detail)
        })
    }

  // 增加&编辑会员
    _handleAddmember = (from, id, defaultdata) => {
       let changetitle = {
           0: '新增',
           1: '编辑'
        }

        this.setState({
            title: changetitle[from],
            showAdd: true,
            Editid: id
        })

        //编辑模式回显
        if (from === '1') {
            this.setState({defaultdata})
        }
    }

  // 移除会员
    _removeMemeber = id => {
    }

    // 保存&编辑 会员函数
    _handleSavemember = (title, params, url) => {
        if (title === '新增') {
              tool.fetch(api.API_ADD_MEMBER, params, {}, true).then(res => {
                  if (res.code === 0) {
                      message.success('保存成功')
                      this._closeWindow()
                      this._getMemberlist()
                  }
        })
        } else {
            tool.fetch(api.API_EDIT_MEMBER, params, url, true).then(res => {
                if (res.code === 0) {
                    message.success('保存成功')
                    this._closeWindow()
                    this._getMemberlist()
                }
            })
        }
    }

    //关闭弹窗
    _closeWindow =() => {
        this.setState({showAdd: false})
    }

  render() {
    let path = window.location.pathname
    const {page_size, showAdd, page_index, title, Memberlist, Membertotal, Editid, TradeData, companyList, companyTotal, defaultdata} = this.state

return (
      <div className="transaction">
        <Header/>
        <div className="out_nav fl"><Nav/></div>
        <div className="trade_container fr">
            {path === '/transaction' && <Trade
                {...TradeData}
                companyTotal={companyTotal}
                companyList ={companyList}
                page_index = {page_index}
                page_size ={page_size}
                _changeCompanyPage ={this._changeCompanyPage}
            />}
            {path === '/transaction/member' && <Member
                addMember={this._handleAddmember}
                _removeMemeber={this._removeMemeber}
                Membertotal={Membertotal}
                Memberlist={Memberlist}
            />}
        </div>
          {showAdd && <Addmember
              closeWindow ={this._closeWindow}
              title = {title}
              handleSavemember = {this._handleSavemember}
              Editid = {Editid}
              {...defaultdata}
          />}
      </div>
    )
}
}
