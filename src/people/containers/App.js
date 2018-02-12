import React, {Component} from 'react'
import Header from '../../global/components/Header'
import Nav from '../../global/components/Nav'
import People from '../components/People'
import Addpeople from '../components/Addpeople'
import Qrcode from '../components/Qrcode'
import {tool} from '../../config/utils'
import {api} from '../../config/api'
import {message} from 'antd'

export default class App extends Component {
    constructor() {
        super()
        this.state = {
            showAdd: false,
            showQr: false,
            sellerList: [],
            sellerTotal: 0,
            page_size: 10,
            page_index: 1,
            sellerID: ''
        }
    }

    componentDidMount() {
        let {page_size, page_index} = this.state

        this._getsellerList(page_size, page_index)
    }

    // 获取销售人员列表
    _getsellerList = (page_size, page_index) => {
        let company_id = sessionStorage.getItem('user-id')

        page_size = parseInt(page_size)
        page_index = parseInt(page_index)
            let params = {company_id, page_size, page_index}

        tool.fetch(api.API_GET_SELLER_LIST, {}, params).then(res => {
            if (res.code === 0) {
                this.setState({
                    sellerList: res.data.list,
                    sellerTotal: res.data.total
                })
            }
        })
    }

    // 显示添加窗口
    _showADD = () => {
        this.setState({showAdd: true})
    }

    // 添加平台销售人员
    _handleAddpeople = sellerinfo => {
        tool.fetch(api.API_POST_ADD_SELLER, sellerinfo, {}, true).then(res => {
            if (res.code === 0) {
                message.success('添加成功')
                this._handleClose()
                this._getsellerList()
            }
        })
    }

    // 跳转页面
    _gosellPage = page_index => {
        const {page_size} = this.state

        this._getsellerList(page_size, page_index)
        this.setState({page_index})
    }

    // 展示二维码弹窗
    _handleShowqr = id => {
        this.setState({
            showQr: true,
            sellerID: id
        })
    }

    // 关闭弹窗
    _handleClose = () => {
        this.setState({showAdd: false})
    }
    _closeQrcode = () => {
        this.setState({showQr: false})
    }

    render() {
        let {showAdd, showQr, sellerList, sellerTotal, page_index, page_size, sellerID} = this.state

        return (
            <div className="people">
                <Header/>
                <div className="out_nav fl"><Nav/></div>
                <div className="people_container fr">
                    <People
                        showADD={this._showADD}
                        handleShowqr={this._handleShowqr}
                        sellerTotal={sellerTotal}
                        sellerList={sellerList}
                        _gosellPage = {this._gosellPage}
                        page_index={page_index}
                        page_size ={page_size}
                    />
                </div>
                {showAdd && <Addpeople
                    showClose={this._handleClose}
                    _handleAddpeople={this._handleAddpeople}
                />}
                {showQr && <Qrcode
                    closeQrcode={this._closeQrcode}
                    sellerID ={sellerID}
                />}
            </div>
        )
    }
}
