import React, {Component} from 'react'
import '../sass/AddPeople.scss'
import {tool} from '../../config/utils'

export default class Addpeople extends Component {
    constructor() {
        super()
    }

    newSeller =() => {
    let {_handleAddpeople} = this.props
    let company_id = sessionStorage.getItem('user-id')
    let email = ''
    let name = this.name.value
    let phone = this.call.value
    let remark = ''
    let role_type = 1
    let status = 0

        if (tool._isBlank(name, '姓名不能为空') && tool._valPhone(phone, '手机格式不正确')) {
 _handleAddpeople({company_id, email, name, phone, remark, role_type, status})
}
    }
    render() {
        let {showClose} = this.props

        return (
            <div className="addpeople">
                <div className="content">
                    <div className="tit">
                        <span>新增人员</span>
                        <i className="iconfont icon-Page fr" onClick={showClose.bind(this)}></i>
                    </div>
                    <div className="list">
                        <div className="list_item"><input type="text" ref = {node => this.name = node}/><span className="name">姓名</span></div>
                        <div className="list_item"><input type="text" ref = {node => this.company = node} placeholder="请输入销售人员所属公司"/><span className="money">所属公司</span></div>
                        <div className="list_item"><input type="text" ref = {node => this.call = node}placeholder="请输入销售人员联系方式"/><span className="name">联系方式</span></div>
                        <button onClick={this.newSeller}>提交</button>
                    </div>
                </div>
            </div>
        )
    }
}
