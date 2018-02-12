import React, {Component} from 'react'
import {Pagination} from 'antd'
import '../sass/People.scss'

export default class People extends Component {
    constructor() {
        super()
    }

     render() {
         let {handleShowqr, showADD, sellerList, sellerTotal, _gosellPage, page_size, page_index} = this.props

         return (
            <div className="people_wrap">
                <div className="summary">
                    <div className="title">销售概况</div>
                    <div className="summary_detail">
                        <div className="sum">
                            <div className="top">销售总数</div>
                            <span className="num">773</span>
                            <span className="rmb">家</span>
                        </div>
                        <div className="sum sec">
                            <span className="line"></span>
                            <div className="top">年销售数量</div>
                            <span className="num">467</span>
                            <span className="rmb">家</span>
                            <span className="line"></span>
                        </div>
                        <div className="sum month">
                            <div className="top">月销售数量</div>
                            <span className="num">58</span>
                            <span className="rmb">家</span>
                        </div>
                    </div>
                </div>
                <div className="trade_query">
                    <div className="search">
                        <input type="text" placeholder="请输入销售人员的编号"/>
                        <button>搜索</button>
                        <button className="add" onClick={showADD.bind(this)} >+新增人员</button>
                    </div>
                    <div className="list">
                        <table>
                            <thead>
                            <tr>
                                <th>姓名</th>
                                <th>所属公司</th>
                                <th>联系方式</th>
                                <th>销售业绩(家)</th>
                                <th>销售总额(元)</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {sellerList.map((item, index) =>
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>迅匠公司</td>
                                    <td>{item.phone}</td>
                                    <td>235</td>
                                    <td>23450</td>
                                    <td><button onClick={handleShowqr.bind(this, item.id)}>生成二维码</button></td>
                                </tr>

                            )}
                            </tbody>
                        </table>
                    </div>
                    <div className="page">
                        <span className="txt fl">显示第{(page_index - 1) * page_size + 1}到第{page_size * page_index > sellerTotal ? sellerTotal : page_index * page_size}条记录,
                            总共{sellerTotal}条记录</span>
                        <div className="paging fr"><Pagination
                            defaultCurrent={1}
                            total={sellerTotal}
                            onChange = {_gosellPage.bind(this)}
                        />
                        </div>
                    </div>
                </div>
            </div>
        )
     }
}
