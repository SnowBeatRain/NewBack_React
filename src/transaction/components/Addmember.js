import React, {Component} from 'react'
import '../sass/Addmember.scss'

export default class Addmember extends Component {
    constructor() {
        super()
    }

    // 保存数据
    Savemember = () => {
        let {handleSavemember, title, Editid} = this.props
    let price = parseFloat(this.money.value)
    let month_number = parseInt(this.time.value % 12)
    let year_number = parseInt(this.time.value / 12)
    let name = this.name.value
    let remark = this.remark.value

        // 格式校验

    handleSavemember(title, {price, month_number, year_number, name, remark}, {id: Editid})
}
    render() {
        const {closeWindow, title, name, price, month, remark} = this.props

        return (
            <div className="addmember">
                <div className="content">
                <div className="tit">
                    <span>{title}</span>
                    <i className="iconfont icon-Page fr" onClick={closeWindow.bind(this)}></i>
                </div>
                <div className="list">
                    <div className="list_item">
                        <input type="text" defaultValue={name} ref={node => this.name = node}/>
                        <span className="name">名称</span></div>
                    <div className="list_item">
                        <input type="text" defaultValue={price} ref={node => this.money = node} placeholder="请输入金额"/>
                        <span className="money">定价金额</span></div>
                    <div className="list_item">
                        <input type="text" defaultValue={month} ref={node => this.time = node}/>
                        <span className="name">有效期(月)</span>
                    </div>
                    <div className="list_item">
                        <input type="text" defaultValue={remark} placeholder="请输入说明" ref={node => this.remark = node}/>
                        <span className="name">说明</span></div>
                    <button onClick={this.Savemember}>提交</button>
                </div>
            </div>
            </div>
        )
    }
}
