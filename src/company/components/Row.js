import React, {Component} from 'react'
import StatusTd from './StatusTd'
import {tool} from '../../config/utils'

export default class Row extends Component {
    constructor() {
        super()
    }
    render() {
        let {checkDetail, item, _companyAudit} = this.props

return (
            <tr onClick={checkDetail.bind(this, item.id)}>
                <td>{item.name}</td>
                <td>{item.seller}</td>
                <td>{tool.modifyNum(item.real_price)}</td>
                <td>{item.club_card_name}</td>
                <td>{tool.dateFormat(item.payed_date)}</td>
                <td>18835995967(待提供)</td>
                <td>{item.state_string}</td>
                <td>
                    <StatusTd
                        _companyAudit = {_companyAudit}
                        status ={item.company_state}
                        id = {item.id}
                    />
                </td>
            </tr>
        )
    }
}
