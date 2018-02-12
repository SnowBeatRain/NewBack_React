import React, {Component} from 'react'
import '../sass/Message.scss'
import ReplyDetail from '../components/ReplyDetail'

export default class Message extends Component {
    constructor() {
        super()
    }
    render() {
        return (
            <div className="message">
                <div className="box">
                    <div className="header">消息中心</div>
                    <ReplyDetail/>
                    <ReplyDetail/>
                </div>
            </div>
        )
    }
}
