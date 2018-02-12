import React, {Component} from 'react'
import '../sass/Talk.scss'

export default class Talk extends Component {
    constructor() {
        super()
        this.state = {isShow: false}
    }
isTalk = () => {
        this.setState({isShow: !this.state.isShow})
}
    render() {
        return (
            <div>
                <div className="talk">
                    <span>Make:</span>&nbsp;&nbsp;&nbsp;&nbsp;孙工做事态度非常认真，专业能力强，为业主考虑。下次装修还找他。
                    <div className="icon" onClick={this.isTalk}><i className="iconfont icon-huifu"></i>回复</div>
                    <div className="revert">
                        <p>[装修公司回复]</p>
                        <p>业务咨询</p>
                    </div>
                    {
                        this.state.isShow &&
                        <div>
                           <input placeholder="写下您的回复:"></input>
                            <div className="submit">提交回复</div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}
