import React, {Component} from 'react'
import '../sass/Add.scss'

export default class Add extends Component {
    constructor() {
        super()
    }
    render() {
        let {isAdd} = this.props

        return (
            <div className="add">
                <div className="mask" onClick={isAdd.bind(this, false)}></div>
                <div className="box">
                    <div className="header">项目添加成员<i className="iconfont icon-Page" onClick={isAdd.bind(this, false)}></i></div>
                    <div className="text">
                        <div className="left"><span>*</span>姓名</div>
                        <div className="right"><input type="text" placeholder="请填写人员姓名"/></div>
                    </div>
                    <div className="text">
                        <div className="left"><span>*</span>职位</div>
                        <div className="right"><input type="text" placeholder="请填写人员职位"/></div>
                    </div>
                    <div className="text">
                        <div className="left"><span>*</span>联系方式</div>
                        <div className="right"><input type="text" maxLength="11" placeholder="请填写人员联系方式"/></div>
                    </div>
                    <div className="text" style={{marginTop: 0}}>
                        <div className="left block">上传头像</div>
                        <div className="right small">支持JPG/JPGE/PNG格式</div>
                    </div>
                    <div className="upload"></div>
                    <div className="but">确定</div>
                </div>
            </div>
        )
    }
}
