import React, {Component} from 'react'
import '../sass/ReplyDetail.scss'

export default class Message extends Component {
    constructor() {
        super()
        this.state = {isShowReply: false}
    }
    isShowReply = () => {
        this.setState({isShowReply: !this.state.isShowReply})
    }
    render() {
        return (
            <div className="reply-detail">
                <p className="top" onClick={this.isShowReply}><span className="left">小王</span>驱蚊器翁轻微群翁群翁群翁群翁群翁</p>
                {
                    this.state.isShowReply &&
                     <div className="reply-box">
                        <div className="information">
                            <span>姓名：</span>张先生&nbsp;&nbsp;&nbsp;&nbsp;
                            <span>姓名：</span>张先生&nbsp;&nbsp;&nbsp;&nbsp;
                            <span>姓名：</span>张先生&nbsp;&nbsp;&nbsp;&nbsp;
                            <span>姓名：</span>张先生&nbsp;&nbsp;&nbsp;&nbsp;
                            <span>姓名：</span>张先生&nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                        <div className="message-revert">
                            <p>[装修公司回复]</p>
                            <p>业务咨询</p>
                        </div>
                        <input type="text" className="reply" placeholder="请填写您的回复"/>
                        <div className="but">提交回复</div>
                    </div>
                }
            </div>
        )
    }
}
