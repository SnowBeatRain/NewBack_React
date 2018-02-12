import React, {Component} from 'react'
import '../sass/Case.scss'
import {Pagination} from 'antd'

export default class Case extends Component {
    constructor() {
        super()
    }
    render() {
        let {jumpCase, caseList, total, _changePage, deleteList} = this.props

        return (
            <div className="case">
                <div className="all">
                    <div className="header">
                        案例管理
                        <div className="case-add" onClick={jumpCase.bind(this, 'add')}>+ 添加案例</div>
                    </div>
                    {
                        caseList.length &&
                        caseList.map((item, index) =>
                            <div className="box" key={index}>
                                <div className="img-box" onClick={jumpCase.bind(this, 'detail', item.id)}>
                                    <img src={item.main_url} alt="加载失败"/>
                                </div>
                                <div className="text">
                                    <div className="top">{item.title}</div>
                                    <p>
                                        {
                                            item.content_qualifiers.map(title =>
                                                title.variant_code === 'zx.sample.square' ?
                                                    `${title.value}㎡/` :
                                                    null
                                            )
                                        }
                                        {
                                            item.content_qualifiers.map(title =>
                                                title.variant_code === 'zx.sample.HouseType' ?
                                                    `${title.qualifier_name}/` :
                                                    null
                                            )
                                        }
                                        {
                                            item.content_qualifiers.map(title =>
                                                title.variant_code === 'zx.sample.Style' ?
                                                    `${title.qualifier_name}/` :
                                                    null
                                            )
                                        }
                                        {
                                            item.content_qualifiers.map(title =>
                                                title.variant_code === 'zx.sample.Mode' ?
                                                    `${title.qualifier_name}/` :
                                                    null
                                            )
                                        }
                                        {
                                            item.content_qualifiers.map(title =>
                                                title.variant_code === 'zx.sample.budget' ?
                                                    `${title.value}元` :
                                                    null
                                            )
                                        }
                                    </p>
                                    {/*<p>工期：无字段</p>*/}
                                    <p>浏览量：无字段</p>
                                </div>
                                <div className="money"></div>
                                <div className="button">
                                    <div className="input" onClick={jumpCase.bind(this, 'edit', item.id)}>编辑</div>
                                    <div className="input nobg" onClick={deleteList.bind(this, item.id)}>删除</div>
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
