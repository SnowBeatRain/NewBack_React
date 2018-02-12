import React, {Component} from 'react'
import '../sass/Strategy.scss'
import {Pagination} from 'antd'

export default class Strategy extends Component {
    constructor() {
        super()
    }
    render() {
        let {isDeleteStrategy, jumpStrategy, strategyList, total, _changePage} = this.props

        return (
            <div className="strategy">
                <div className="all">
                    <div className="header">
                        装修攻略
                        <div className="case-add" onClick={jumpStrategy.bind(this, 'add')}>+ 新建攻略</div>
                    </div>
                    {/*<div className="strategy-nav">*/}
                        {/*<p className="elect">全部</p>*/}
                        {/*<p>装修前</p>*/}
                        {/*<p>装修中</p>*/}
                        {/*<p>装修后</p>*/}
                    {/*</div>*/}
                    {/*注释掉的导航*/}
                    {
                        strategyList.length &&
                        strategyList.map((item, index) =>
                            <div className="strategy-box" key={index}>
                                <div className="img-box">
                                    <img src={item.main_url} alt="加载失败"/>
                                    <div>
                                        {
                                            item.content_qualifiers.map(title =>
                                                title.variant_code === 'zx.strategy.Stage' ?
                                                    title.qualifier_name :
                                                    null
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="text">
                                    <div className="top">{item.title}</div>
                                    <p>{item.content}</p>
                                </div>
                                <div className="button">
                                    <div className="display-like">
                                        123<i className="iconfont icon-chakan"></i>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        123<i className="iconfont icon-dianzan"></i>
                                    </div>
                                    <div className="input nobg" onClick={isDeleteStrategy.bind(this, true, item.id)}>删除</div>
                                    <div className="input" onClick={jumpStrategy.bind(this, 'edit', item.id)}>编辑</div>
                                </div>
                            </div>
                        )
                    }
                    <div className="page">
                        <span className="txt fl">显示第1到第10条记录,总共{total}条记录</span>
                        <div className="paging fr"><Pagination onChange={_changePage.bind(this)}defaultCurrent={10} total={total}/></div>
                    </div>
                </div>
            </div>
        )
    }
}
