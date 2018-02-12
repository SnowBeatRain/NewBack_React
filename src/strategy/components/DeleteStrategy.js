import React, {Component} from 'react'
import '../sass/DeleteStrategy.scss'

export default class DeleteStrategy extends Component {
    constructor() {
        super()
    }
    render() {
        let {isDeleteStrategy, userId, deleteList} = this.props

        return (
            <div className="delete-strategy">
                <div className="mask" onClick={isDeleteStrategy.bind(this, false)}></div>
                <div className="box">
                    <i className="iconfont icon-Page" onClick={isDeleteStrategy.bind(this, false)}></i>
                    <p>确定要删除该攻略？</p>
                    <div className="but" onClick={deleteList.bind(this, userId)}>确定</div>
                    <div className="but" onClick={isDeleteStrategy.bind(this, false)}>取消</div>
                </div>
            </div>
        )
    }
}
