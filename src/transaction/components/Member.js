import React, {Component} from 'react'
import '../sass/Member.scss'

export default class Member extends Component {
    constructor() {
        super()
        this.state = {}
    }

    componentWillMount() {

    }

    render() {
        const {addMember, Membertotal, Memberlist, _removeMemeber} = this.props

        return (
            <div className="member">
                <div className="title">
                    会员方案
                </div>
                <div className="service">
                    <div className="top_service">
                        <button className="fr" onClick={addMember.bind(this, '0')}>新增</button>
                        <span className="tit fr">企业VIP会员特权服务</span>
                    </div>
                    <div className="list">
                        <table>
                            <thead>
                            <tr>
                                <th>名称</th>
                                <th>定价(元)</th>
                                <th>有效期(月)</th>
                                <th>说明</th>
                                <th>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Memberlist.map((item, index) =>
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.year_number * 12 + item.month_number}</td>
                                    <td>{item.remark}</td>
                                    <td className= "last">
                                        <button className="btn_edit" onClick={addMember.bind(this, '1', item.id, {name: item.name, price: item.price, month: item.year_number * 12 + item.month_number, remark: item.remark})} >编辑</button>
                                        <button className="btn_remove" onClick={_removeMemeber.bind(this, item.id)}>删除</button>
                                    </td>
                                </tr>)
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
