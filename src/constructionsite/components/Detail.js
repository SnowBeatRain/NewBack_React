import React, {Component} from 'react'
import '../sass/Detail.scss'

export default class Detail extends Component {
  constructor() {
    super()
      this.state = {flag: '0'}
  }

  flag = id => {
    this.setState({flag: id})
  }

  render() {
 let {isUpdatePhoto, isAdd, jumpConstruction, detaliList, playList} = this.props
      let time = Date.parse(new Date()) / 1000

return (
      <div className="construction-detail">
        <div className="content">
          <div className="title">工地管理>
                  {
                      detaliList.content_qualifiers &&
                      detaliList.content_qualifiers.map(item =>
                      item.variant_code === 'zx.project.projectName' ?
                          item.value :
                          null
                  )
                  }
          </div>
          <div className="box">
            <div className="img-box">
              <img src={detaliList.main_url} alt="加载失败"/>
              {/*<div>开工阶段</div>*/}
            </div>
            <div className="text">
              <div className="top">
                  {
                      detaliList.content_qualifiers &&
                      detaliList.content_qualifiers.map(item =>
                          item.variant_code === 'zx.project.projectName' ?
                              item.value :
                              null
                      )
                  }
              </div>
              <p>
                      {
                          detaliList.content_qualifiers &&
                          detaliList.content_qualifiers.map(item =>
                              item.variant_code === 'zx.sample.HouseType' ?
                                  item.qualifier_name :
                              null
                      )
                  }
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {
                  time - detaliList.created < 360 ?
                      '刚刚更新' :
                      null
              }</p>
              <p><i className="iconfont icon-location"></i>
                  {
                      detaliList.content_qualifiers &&
                      detaliList.content_qualifiers.map(item =>
                          item.variant_code === 'zx.project.address' ?
                              item.value :
                              null
                      )
                  }
                  {
                      detaliList.content_qualifiers &&
                      detaliList.content_qualifiers.map(item =>
                          item.variant_code === 'zx.project.detailAddress' ?
                              item.value :
                              null
                      )
                  }
              </p>
              <p>
                <span className="elect">前期</span>&nbsp;
                <span className="elect">——</span>&nbsp;
                <span>设计</span>&nbsp;
                <span>——</span>&nbsp;
                <span>拆改</span>&nbsp;
                <span>——</span>&nbsp;
                <span>水电</span>&nbsp;
                <span>——</span>&nbsp;
                <span>泥木</span>&nbsp;
                <span>——</span>&nbsp;
                <span>油漆</span>&nbsp;
                <span>——</span>&nbsp;
                <span>安装</span>&nbsp;
                <span>——</span>&nbsp;
                <span>竣工</span>
              </p>
              <p style={{marginTop: 0}}>
                <i className="iconfont icon-xiangshangyuansanjia top elect"></i>
                <i className="iconfont icon-xiangshangyuansanjia top"></i>
                <i className="iconfont icon-xiangshangyuansanjia top"></i>
                <i className="iconfont icon-xiangshangyuansanjia top"></i>
                <i className="iconfont icon-xiangshangyuansanjia top"></i>
                <i className="iconfont icon-xiangshangyuansanjia top"></i>
                <i className="iconfont icon-xiangshangyuansanjia top"></i>
                <i className="iconfont icon-xiangshangyuansanjia top"></i>
              </p>
            </div>
            <div className="button">
              <div className="input" onClick={jumpConstruction.bind(this, 'editConstruction', detaliList.id)}>编辑</div>
            </div>
          </div>
          <div className={
              this.state.flag === '0' ?
              'nav' :
              'nav backg'}>
            <div
                className={
                    this.state.flag === '0' ?
                        'list elect' :
                        'list'
                  }
                onClick={this.flag.bind(this, '0')}
            >工地直播</div>
            <div
                className={
                    this.state.flag === '0' ?
                        'list' :
                        'list elect'
                }
                 onClick={this.flag.bind(this, '1')}>项目成员</div>
              {
                  this.state.flag === '1' ?
                      <div className="list-but" onClick={isAdd.bind(this, true)}>添加项目成员</div> :
                      null
              }
              {
                this.state.flag === '0' ?
                    playList.list.map((item, index) =>
                        item.id === detaliList.id ?
                        <div className="content" key={index}>
                            <div className="header">
                                <img src={item.owner_head_image_url} alt="加载失败"/>
                                <div className="text">
                                    <p>{item.owner_name}</p>
                                    <p className="small">{item.created}</p>
                                </div>
                                <div className="but" onClick={isUpdatePhoto.bind(this, true)}>更新</div>
                            </div>
                            <div className="design">{item.content}</div>
                            <div className="photo">
                                {
                                    item.content_images.map((data, flag) =>
                                      <img src={data.imageimage_large_url} key={flag}/>
                                    )
                                }
                            </div>
                        </div> :
                            null

                    ) :
                    <div className="content">
                        <div className="people">
                            <img src={require('../../img-31cd5193138a490999dd53949c79158d.jpg')} alt="加载失败"/>
                            <p>张晓明【工长】<br/> 未激活</p>
                        </div>
                        <div className="people">
                            <img src={require('../../img-31cd5193138a490999dd53949c79158d.jpg')} alt="加载失败"/>
                            <p>张晓明【工长】<br/> 未激活</p>
                        </div>
                        <div className="people">
                            <img src={require('../../img-31cd5193138a490999dd53949c79158d.jpg')} alt="加载失败"/>
                            <p>张晓明【工长】<br/> 未激活</p>
                        </div>
                        <div className="people">
                            <img src={require('../../img-31cd5193138a490999dd53949c79158d.jpg')} alt="加载失败"/>
                            <p>张晓明【工长】<br/> 未激活</p>
                        </div>
                        <div className="people">
                            <img src={require('../../img-31cd5193138a490999dd53949c79158d.jpg')} alt="加载失败"/>
                            <p>张晓明【工长】<br/> 未激活</p>
                        </div>
                        <div className="people">
                            <img src={require('../../img-31cd5193138a490999dd53949c79158d.jpg')} alt="加载失败"/>
                            <p>张晓明【工长】<br/> 未激活</p>
                        </div>
                        <div className="people">
                            <img src={require('../../img-31cd5193138a490999dd53949c79158d.jpg')} alt="加载失败"/>
                            <p>张晓明【工长】<br/> 未激活</p>
                        </div>
                        <div className="people">
                            <img src={require('../../img-31cd5193138a490999dd53949c79158d.jpg')} alt="加载失败"/>
                            <p>张晓明【工长】<br/> 未激活</p>
                        </div>
                        <div className="people">
                            <img src={require('../../img-31cd5193138a490999dd53949c79158d.jpg')} alt="加载失败"/>
                            <p>张晓明【工长】<br/> 未激活</p>
                        </div>
                    </div>
              }
          </div>
        </div>
      </div>
    )
  }
}
