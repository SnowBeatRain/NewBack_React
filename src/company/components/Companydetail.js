import React, {Component} from 'react'
import '../sass/Companydetail.scss'

export default class Companydetail extends Component {
    constructor() {
        super()
        this.state = {show: false}
    }
    render() {
        const {name, address, telephone, id, _companyAudit} = this.props
        const {show} = this.state

return (
               <div className="detail_wrap">
                    <div className="title">
                        <span className="maj">公司管理</span> >公司详情
                    </div>
                    <div className="reg">
                        <div className="reg_info">工商注册信息</div>
                        <table className="reg_detail">
                            <tbody>
                            <tr>
                                <td className="name">公司名称 :</td>
                                <td className="name_info">{name}</td>
                            </tr>
                            <tr>
                                <td className="name">注册地址 :</td>
                                <td className="name_info">{address}</td>
                            </tr>
                            <tr>
                                <td className="name">法定代表人 :</td>
                                <td className="name_info">方世玉</td>
                            </tr>
                            <tr>
                                <td className="name">法定人联系方式 :</td>
                                <td className="name_info">{telephone}</td>
                            </tr>
                            <tr>
                                <td className="name">身份证号 :</td>
                                <td className="name_info">32132174894</td>
                            </tr>
                            </tbody>
                        </table>
                        <div className="reg_pic">
                            <div className="pic_top">营业执照</div>
                            <div className="pic_content">
                                <div className="pic_tit">营业执照:</div>
                                <div className="pics">
                                    <img src={require('../images/csxwechat.jpg')} alt=""/>
                                </div>
                            </div>
                        </div>
                        <div className="result">
                            <button onClick={_companyAudit.bind(this, id, 3)} className="pass">审核通过</button>
                            <button onClick={_companyAudit.bind(this, id, 1)} className={show ? 'pass' : ''}>审核不通过</button>
                        </div>
                    </div>
                </div>
            )
        }
}
