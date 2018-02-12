import React, {Component} from 'react'
import '../sass/AddOrEdit.scss'

export default class AddOrEdit extends Component {
    constructor() {
        super()
    }

    render() {
        let {isAddOrEdit, from} = this.props

return (
            <div className="add-or-edit">
                <div className="mask" onClick={isAddOrEdit}></div>
                <div className="box">
                    {
                        from === 'add' ?
                            <div className="header">新增账号<i className="iconfont icon-Page" onClick={isAddOrEdit}></i></div> :

                            <div className="header">修改账号<i className="iconfont icon-Page" onClick={isAddOrEdit}></i></div>
                    }
                    <div className="text">
                        <div className="left"><span>*</span>姓名</div>
                        <div className="right"><input type="text" placeholder="请填写用户名"/></div>
                    </div>
                    <div className="text">
                        <div className="left"><span>*</span>公司职位</div>
                        <div className="right"><input type="text" placeholder="请填写公司职位"/></div>
                    </div>
                    <div className="text">
                        <div className="left"><span>*</span>密码</div>
                        <div className="right"><input type="text" maxLength="11" placeholder="请填写密码"/></div>
                    </div>
                    <div className="text">
                        <div className="left"><span>*</span>电话</div>
                        <div className="right"><input type="text" maxLength="11" placeholder="请填写电话"/></div>
                    </div>
                    <div className="but">确定</div>
                </div>
            </div>
        )
    }
}
