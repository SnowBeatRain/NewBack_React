import React, {Component} from 'react'
import '../sass/Account.scss'
import {Pagination} from 'antd'

export default class Account extends Component {
    constructor() {
        super()
    }

    render() {
        let {isAddOrEdit} = this.props

        return (
            <div className="account-box">
                <div className="trade_query">
                    <div className="account-header">账号管理
                        <div className="but" onClick={isAddOrEdit.bind(this, 'add')}>+ 新增账号</div>
                    </div>
                    <div className="list">
                        <table>
                            <thead>
                            <tr>
                                <th>用户名</th>
                                <th>公司职位</th>
                                <th>密码</th>
                                <th>电话</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>小王</td>
                                <td>管理人员</td>
                                <td>12345567</td>
                                <td>12345678911</td>
                                <td><span onClick={isAddOrEdit.bind(this, 'edit')}>修改</span><span>删除</span></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="page">
                        <span className="txt fl">显示第1到第10条记录,总共124条记录</span>
                        <div className="paging fr"><Pagination defaultCurrent={10} total={100}/></div>
                    </div>
                </div>
            </div>
        )
    }
}
