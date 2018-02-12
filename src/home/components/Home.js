import React, {Component} from 'react'
import '../sass/Home.scss'

export default class Home extends Component {
  constructor() {
    super()
  }
  render() {
      let {jump, pageView, constructionList, caseList, deleteList} = this.props
      let userName = sessionStorage.getItem('user-name')
      let company = sessionStorage.getItem('company-name')
      let logo = sessionStorage.getItem('logo')
      let now = new Date()
      let hour = now.getHours()
      let time = null
      let count = 0
      let created = Date.parse(new Date()) / 1000

      if (hour >= 0 && hour < 6) {
          time = '凌晨好'
      } else if (hour >= 6 && hour < 12) {
          time = '上午好'
      } else if (hour >= 12 && hour < 18) {
          time = '下午好'
      } else {
          time = '晚上好'
      }

return (
      <div className="home">
        <div className="content-top">
          <div className="left">
            <img src={logo} alt="加载失败"/>
            <div>hi,{userName}</div>
            <p>{time}，祝您工作顺利</p>
          </div>
          <div className="right">
            <div className="title">{company}</div>
            <div className="box">
              <div className="quantity">{pageView.browse_number}</div>
              <div className="text">案例浏览量</div>
            </div>
            <div className="line"></div>
            <div className="box center">
              <div className="quantity">{pageView.fans_number}</div>
              <div className="text">工地围观数</div>
            </div>
            <div className="line"></div>
            <div className="box center">
              <div className="quantity">{pageView.appoint_number}</div>
              <div className="text">客户预约</div>
            </div>
          </div>
        </div>
        <div className="content-bot">
          <div className="title">
            <div className="line"></div>
            <div className="text">工地管理</div>
            <div className="more" onClick={jump.bind(this, 'moreConstruction')}>更多<i className="iconfont icon-sanjiaoyoubiao"></i></div>
          </div>
            {
                constructionList.length ?
                    <div className="box">
                        <div className="img-box">
                            <img src={constructionList[0].main_url} alt="加载失败"/>
                            {/*<div>无字段</div>*/}
                        </div>
                        <div className="text">
                            <div className="top">
                                {
                                    constructionList[0].content_qualifiers.map(title =>
                                        title.variant_code === 'zx.project.projectName' ?
                                            title.value :
                                            null
                                    )
                                }
                            </div>
                            <p>
                                {
                                    constructionList[0].content_qualifiers.map(title =>
                                        title.variant_code === 'zx.project.HouseType' ?
                                            title.value :
                                            null
                                    )
                                }
                            </p>
                            <p><i className="iconfont icon-location"></i>
                                {
                                    constructionList[0].content_qualifiers.map(title =>
                                        title.variant_code === 'zx.project.address' ?
                                            title.value :
                                            null
                                    )
                                }
                                {
                                    constructionList[0].content_qualifiers.map(title =>
                                        title.variant_code === 'x.project.detailAddress' ?
                                            title.value :
                                            null
                                    )
                                }
                            </p>
                            <p>
                                {
                                    time - constructionList[0].created < 360 ?
                                        '刚刚更新' :
                                        null
                                }
                            </p>
                        </div>
                        <div className="money">
                            {
                                constructionList[0].content_qualifiers.map(title =>
                                title.variant_code === 'zx.project.budget' ?
                                    parseInt(title.value) / 10000 :
                                    null
                            )
                            }
                        <span>万</span></div>
                        <div className="button">
                            {/*<div className="input">更新</div>*/}
                            {/*<div className="input nobg" onClick={jump.bind(this, 'edit', constructionList[0].id)}>编辑</div>*/}
                            <div className="input nobg" onClick={deleteList.bind(this, constructionList[0].id)}>删除</div>
                        </div>
                    </div> :
                    <div className="box">
                       <p>项目还没有开工，快去添加项目吧</p>
                       <p className="home-add" onClick={jump.bind(this, 'add')}>+ 创建工地</p>
                    </div>

            }

        </div>
        <div className="content-bot">
          <div className="title">
            <div className="line"></div>
            <div className="text">案例管理</div>
            <div className="more" onClick={jump.bind(this, 'moreCase')}>更多<i className="iconfont icon-sanjiaoyoubiao"></i></div>
          </div>

            {
                caseList.length ?
                    <div className="box">
                        <div className="img-box">
                            <img src={caseList[0].main_url} alt="加载失败"/>
                        </div>
                        <div className="text">
                            <div className="top">无字段</div>
                            <p>

                                {
                                    caseList[0].content_qualifiers.map(title =>
                                        title.variant_code === 'zx.sample.square' ?
                                            `${title.value}㎡/` :
                                            null
                                    )
                                }
                                {
                                    caseList[0].content_qualifiers.map(title =>
                                    title.variant_code === 'zx.sample.HouseType' ?
                                    `${title.qualifier_name}/` :
                                    null
                                    )
                                }
                                {
                                    caseList[0].content_qualifiers.map(title =>
                                    title.variant_code === 'zx.sample.Style' ?
                                    `${title.qualifier_name}/` :
                                    null
                                    )
                                }
                                {
                                    caseList[0].content_qualifiers.map(title =>
                                    title.variant_code === 'zx.sample.Mode' ?
                                    `${title.qualifier_name}/` :
                                    null
                                    )
                                }
                                {
                                    caseList[0].content_qualifiers.map(title =>
                                    title.variant_code === 'zx.sample.budget' ?
                                    `${title.value}元` :
                                    null
                                    )
                                }

                                </p>
                            <p>工期: 无字段</p>
                            <p>浏览量: 无字段</p>
                        </div>
                        <div className="money"></div>
                        <div className="button">
                            {/*<div className="input"onClick={jump.bind(this, 'editCase', caseList[0].id)}>编辑</div>*/}
                            <div className="input nobg" onClick={deleteList.bind(this, caseList[0].id)}>删除</div>
                        </div>
                    </div> :
                    <div className="box">
                        <p>没有添加案例</p>
                        <p className="home-add" onClick={jump.bind(this, 'addCase')}>+ 添加案例</p>
                    </div>
            }

        </div>
      </div>
    )
  }
}
