import React, {Component} from 'react'
import '../sass/Uploadeffect.scss'

export default class UploadEffect extends Component {
    constructor() {
        super()
    }

    render() {
        let path = window.location.pathname

        return (
            <div className="upload-effect">
                <div className="content">
                    {
                        path === '/case/uploadadd' ?
                            <div className="title"><span>添加案例</span>>上传效果图</div> :
                            <div className="title"><span>修改案例</span>>上传效果图</div>
                    }

                    <div className="content-detail">
                        <div className="design-title">客厅</div>
                        <div className="design">设计源于生活，设计改变生活（美应该是生命的一种从容；美应该是生命的一种淡定；美应该是生命的一种豁达。质检完成，合格。</div>
                        <div className="effect-photo">
                            <img src={require('../../img-31cd5193138a490999dd53949c79158d.jpg')} alt="加载失败"/>
                            <img src={require('../../img-31cd5193138a490999dd53949c79158d.jpg')} alt="加载失败"/>
                            <img src={require('../../img-31cd5193138a490999dd53949c79158d.jpg')} alt="加载失败"/>
                            <img src={require('../../img-31cd5193138a490999dd53949c79158d.jpg')} alt="加载失败"/>
                            <img src={require('../../img-31cd5193138a490999dd53949c79158d.jpg')} alt="加载失败"/>
                        </div>
                    </div>
                    <div className="text">
                        <div className="left"><span>*</span>室内空间</div>
                        <div className="right">
                            <select>
                                <option value="">大</option>
                                <option value="">小</option>
                                <option value="">中</option>
                            </select>
                        </div>
                    </div>
                    <div className="text">
                        <div className="left"><span>*</span>效果图</div>
                        <div className="right">建议上传效果图，支持JPG/JPGE/PNG格式，最大10MB</div>
                    </div>
                    <div className="photo"></div>
                    <div className="text">
                        <div className="left"><span>*</span>备注</div>
                        <div className="right">
                            <textarea></textarea>
                        </div>
                    </div>
                    <div className="add-again">+继续添加</div>
                    {
                        path === '/case/uploadadd' ?
                            <div className="push">完成</div> :
                            <div className="push">完成</div>
                    }
                </div>
            </div>
        )
    }
}
