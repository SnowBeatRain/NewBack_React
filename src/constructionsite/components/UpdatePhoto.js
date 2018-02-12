import React, {Component} from 'react'
import '../sass/UpdatePhoto.scss'

export default class UpdatePhoto extends Component {
    constructor() {
        super()
    }
    render() {
        let {isUpdatePhoto} = this.props

        return (
           <div className="update-photo">
                <div className="mask" onClick={isUpdatePhoto.bind(this, false)}></div>
                <div className="box">
                    <div className="header">更新图片<i className="iconfont icon-Page" onClick={isUpdatePhoto.bind(this, false)}></i></div>
                    <p className="title">说点什么</p>
                    <textarea placeholder="新家换新颜，没一点都值得记录"></textarea>
                    <div className="select">
                        <div className="left"><span>*</span>施工阶段</div>
                        <div className="right">
                            <select>
                                <option value="">超级</option>
                                <option value="">无敌</option>
                                <option value="">究极</option>
                            </select>
                        </div>
                    </div>
                    <p className="text">上传施工图片&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>选择装修过程中的照片，每张低于5M，支持JPG/JPEG/PNG格式，最多9张</span></p>\
                    <div className="upload"></div>
                    <div className="but">确定发布</div>
                </div>
            </div>
        )
    }
}
