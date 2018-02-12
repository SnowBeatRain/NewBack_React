import React, {Component} from 'react'
import '../sass/Activity.scss'
import {Pagination} from 'antd'

export default class Activity extends Component {
    constructor() {
        super()
    }
    render() {
        let {isDelete, jumpActivity, activityList, total, _changePage} = this.props

return (
            <div className="activity">
                <div className="content">
                    <div className="header">
                        活动列表
                        <div className="but" onClick={jumpActivity.bind(this, 'add')}>+ 创建活动</div>
                    </div>
                    {
                        activityList &&
                        activityList.map((item, index) =>
                            <div className="list" key={index}>
                                <div className="top">
                                    <img src={item.main_url} alt="加载失败"/>
                                    <div className="button" onClick={jumpActivity.bind(this, 'edit', item.id)}>修改</div>
                                    <div className="button delete" onClick={isDelete.bind(this, true, item.id)}>删除</div>
                                </div>
                                <div className="bot">
                                    <div className="text">
                                        <div className="left">活动名称:</div>
                                        <div className="right">{item.title}</div>
                                    </div>
                                    <div className="text">
                                        <div className="left">活动细节:</div>
                                        <div className="right">{item.content}</div>
                                    </div>
                                    <div className="text">
                                        <div className="left">截止日期:</div>
                                        <div className="right">
                                            {
                                                    item.content_qualifiers.map(items =>
                                                        items.variant_code === 'zx.activity.endTime' ?
                                                            items.value :
                                                            null
                                                    )
                                            }
                                        </div>
                                    </div>
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
