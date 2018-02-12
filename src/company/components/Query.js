import React, {Component} from 'react'
import '../sass/Query.scss'
import '../sass/Page.scss'
import {Pagination} from 'antd'
import {tool} from '../../config/utils'
import Row from './Row'

export default class Page extends Component {
    constructor() {
        super()
    }

    render() {
        let {checkDetail, list, total, _changePage, page_index, page_size, _companyAudit} = this.props

return (
            <div className="query">
                <div className="manage">
                    <span>公司管理</span>
                    <div className="search">
                        <input type="text" placeholder="请输入公司的名字或人员编号"/>
                        <button>搜索</button>
                    </div>
                </div>
                <div className="term">
                    <div className="mem">
                        <span className="tit">会员等级:</span>
                        <span className="selected">不限</span>
                        <span>普通版</span>
                        <span>标准版</span>
                        <span>高级版</span>
                    </div>
                    <div className="account">
                        <span className="tit">账号状态:</span>
                        <span>不限</span>
                        <span>即将到期</span>
                        <span className="selected">待审核</span>
                        <span>已审核</span>
                    </div>

                </div>
                <div className="select_item">
                    <span className="first">已选条件:</span>
                    <span className="verify">
                        <span>待审核</span>
                        <i className="iconfont icon-Page dot"></i>
                    </span>
                    <span className="clear">
                        <i className="iconfont icon-clear"></i>
                        <span>清空所有</span>
                    </span>
                </div>
                <div className="list">
                    <table>
                        <thead>
                            <tr>
                                <th>客户公司名称</th>
                                <th>销售人员</th>
                                <th>交易金额</th>
                                <th>会员等级</th>
                                <th>付款时间</th>
                                <th>公司账号</th>
                                <th>账号状态</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                        {list.map((item, index) =>
                            <Row
                                key = {index}
                                checkDetail ={checkDetail}
                                _companyAudit = {_companyAudit}
                                item = {item}
                            />

                            )}

                        </tbody>
                    </table>
                </div>
                <div className="page">
                    <span className="txt fl">显示第{(page_index - 1) * page_size + 1}到第{page_index * page_size > total ? total : page_index * page_size}条记录,总共{total}条记录</span>
                    <div className="paging fr"><Pagination onChange={_changePage.bind(this)} defaultCurrent={1} total={total}/></div>
                </div>
            </div>
        )
    }
}
