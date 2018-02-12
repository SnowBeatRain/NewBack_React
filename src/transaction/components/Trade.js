import React, {Component} from 'react'
import '../sass/Trade.scss'
import {Pagination} from 'antd'
import {tool} from '../../config/utils'

export default class Trade extends Component {
    constructor() {
        super()
    }

    // 该项目中时间戳精确到秒也就是10位因此需要*1000
    dateFormat = d => {
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

    render() {
        const {trade_month_price, trade_total_price, trade_year_price, companyTotal, companyList, page_index, _changeCompanyPage, page_size} = this.props

return (
            <div className="trade">
                <div className="summary">
                    <div className="title">交易概况</div>
                    <div className="summary_detail">
                        <div className="sum">
                            <div className="top">交易总额</div>
                            <span className="num">{tool.modifyNum(trade_total_price)}</span>
                            <span className="rmb">元</span>
                        </div>
                        <div className="sum sec">
                            <span className="line"></span>
                            <div className="top">年交易金额</div>
                            <span className="num">{tool.modifyNum(trade_year_price)}</span>
                            <span className="rmb">元</span>
                            <span className="line"></span>
                        </div>
                        <div className="sum month">
                            <div className="top">月交易总额</div>
                            <span className="num">{tool.modifyNum(trade_month_price)}</span>
                            <span className="rmb">元</span>
                        </div>
                    </div>
                </div>
                <div className="trade_query">
                    <div className="search">
                        <input type="text" placeholder="请输入公司的名字或者来源"/>
                        <button>搜索</button>
                    </div>
                    <div className="list">
                        <table>
                            <thead>
                            <tr>
                                <th>客户公司名称</th>
                                <th>来源</th>
                                <th>交易金额</th>
                                <th>会员等级</th>
                                <th>付款时间</th>
                                <th>状态</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                companyList.map((item, index) =>
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.seller}</td>
                                        <td>{tool.modifyNum(item.real_price)}</td>
                                        <td>{item.club_card_name}</td>
                                        <td>{tool.dateFormat(item.payed_date)}</td>
                                        <td>即将到期</td>
                                    </tr>

                                )
                            }

                            </tbody>
                        </table>
                    </div>
                    <div className="page">
                        <span className="txt fl">
                            显示第{(page_index - 1) * page_size + 1}到第{page_index * page_size > companyTotal ? companyTotal : page_index * page_size}条记录,
                            总共{companyTotal}条记录</span>
                        <div className="paging fr"><Pagination onChange ={_changeCompanyPage.bind(this)} defaultCurrent={1} total={companyTotal}/></div>
                    </div>
                </div>
            </div>
        )
    }
}
