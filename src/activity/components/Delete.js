import React, {Component} from 'react'
import '../sass/Delete.scss'

export default class Delete extends Component {
    constructor() {
        super()
    }
    render() {
        let {isDelete, userId, deleteList} = this.props

        return (
            <div className="delete">
                <div className="mask" onClick={isDelete.bind(this, false)}></div>
                <div className="box">
                    <i className="iconfont icon-Page" onClick={isDelete.bind(this, false)}></i>
                    <p>确定要删除该活动？</p>
                    <div className="but" onClick={deleteList.bind(this, userId)}>确定</div>
                    <div className="but" onClick={isDelete.bind(this, false)}>取消</div>
                </div>
            </div>
        )
    }
}
