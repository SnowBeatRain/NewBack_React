import React, {Component} from 'react'
import '../sass/ConstructionsiteAll.scss'
import {Pagination} from 'antd'

export default class ConstructionsiteAll extends Component {
  constructor() {
    super()
  }

  render() {
    let {isUpdatePhoto, jumpConstruction, constructionList, total, _changePage, deleteList} = this.props
    let time = Date.parse(new Date()) / 1000

    return (
      <div className="constructionsiteAll">
        <div className="content-bot">
          <div className="title">
            <div className="text">工地管理</div>
            <div className="constructionsite-establish" onClick={jumpConstruction.bind(this, 'addConstruction')}>+ 创建工地</div>
          </div>
          <div className="category">
            <div className="child elect">全部</div>
            <div className="child">在建中</div>
            <div className="child">已完成</div>
          </div>

                {
                    constructionList.length &&
                      constructionList.map((item, index) =>
                        <div className="box" key={index}>
                            <div className="img-box" onClick={jumpConstruction.bind(this, 'detail', item.id)}>
                                <img
                                    src=
                                      {
                                        item.main_url ?
                                            item.main_url :
                                            null
                                      }
                                     alt="加载失败"/>
                                {/*<div>无字段</div>*/}
                            </div>
                            <div className="text">
                                <div className="top">
                                    {
                                      item.content_qualifiers.map(title =>
                                          title.variant_code === 'zx.project.projectName' ?
                                              title.value :
                                              null
                                      )
                                    }
                                </div>
                                <p>
                                    {
                                        item.content_qualifiers.map(title =>
                                        title.variant_code === 'zx.project.HouseType' ?
                                            title.qualifier_name :
                                            null
                                    )
                                    }
                                </p>
                                <p><i className="iconfont icon-location"></i>
                                    {
                                        item.content_qualifiers.map(title =>
                                            title.variant_code === 'zx.project.address' ?
                                                title.value :
                                                null
                                        )
                                    }
                                    {
                                        item.content_qualifiers.map(title =>
                                            title.variant_code === 'zx.project.detailAddress' ?
                                                title.value :
                                                null
                                        )
                                    }
                                </p>
                                <p>{
                                    time - item.created < 360 ?
                                        '刚刚更新' :
                                        null
                                }</p>
                            </div>
                            <div className="money">
                                    {
                                        item.content_qualifiers.map(title =>
                                        title.variant_code === 'zx.project.budget' ?
                                            parseInt(title.value) / 10000 :
                                            null
                                    )
                                }
                                <span>万</span>
                            </div>
                            <div className="button">
                                <div className="input" onClick={isUpdatePhoto.bind(this, true)}>更新</div>
                                <div className="input nobg" onClick={jumpConstruction.bind(this, 'editConstruction', item.id)}>编辑</div>
                                <div className="input nobg nobd" onClick={deleteList.bind(this, item.id)}>删除</div>
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
