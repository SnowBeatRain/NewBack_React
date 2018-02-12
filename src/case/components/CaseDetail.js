import React, {Component} from 'react'
import '../sass/CaseDetail.scss'
import Talk from '../components/Talk'

export default class CaseDetail extends Component {
    constructor() {
        super()
        this.state = {flag: '0'}
    }

    flag = id => {
        this.setState({flag: id})
    }

    render() {
        let {jumpCase, caseData, designList, caseList, programmeList, qualityList, deleteList} = this.props

        return (
            <div className="case-detail">
                <div className="content">
                    <div className="title">案例管理>{caseData.title}
                        <div className="operation nobg" onClick={deleteList.bind(this, caseData.id)}>删除</div>
                        <div className="operation" onClick={jumpCase.bind(this, 'edit', caseData.id)}>编辑</div>
                    </div>
                    <div className="box">
                        <div className="img-box">
                            <img src={caseData.main_url} alt="加载失败"/>
                        </div>
                        <div className="text">
                            <div className="top">{caseData.title}</div>
                            <p>
                                {
                                    caseData.content_qualifiers.map(title =>
                                        title.variant_code === 'zx.sample.square' ?
                                            `${title.value}㎡/` :
                                            null
                                    )
                                }
                                {
                                    caseData.content_qualifiers.map(title =>
                                        title.variant_code === 'zx.sample.HouseType' ?
                                            `${title.qualifier_name}/` :
                                            null
                                    )
                                }
                                {
                                    caseData.content_qualifiers.map(title =>
                                        title.variant_code === 'zx.sample.Style' ?
                                            `${title.qualifier_name}/` :
                                            null
                                    )
                                }
                                {
                                    caseData.content_qualifiers.map(title =>
                                        title.variant_code === 'zx.sample.Mode' ?
                                            `${title.qualifier_name}/` :
                                            null
                                    )
                                }
                                {
                                    caseData.content_qualifiers.map(title =>
                                        title.variant_code === 'zx.sample.budget' ?
                                            `${title.value}元` :
                                            null
                                    )
                                }
                            </p>
                            {/*<p>工期：无字段</p>*/}
                            <p>浏览量：无字段</p>
                        </div>
                        <div className="case-people">
                            <div className="peoples">
                                <img src={require('../../img-31cd5193138a490999dd53949c79158d.jpg')} alt="加载失败"/>
                                <div className="right">
                                    <p>质检师</p>
                                    <p>李四</p>
                                </div>
                            </div>
                            <div className="peoples">
                                <img src={require('../../img-31cd5193138a490999dd53949c79158d.jpg')} alt="加载失败"/>
                                <div className="right">
                                    <p>质检师</p>
                                    <p>李四</p>
                                </div>
                            </div>
                            <div className="peoples">
                                <img src={require('../../img-31cd5193138a490999dd53949c79158d.jpg')} alt="加载失败"/>
                                <div className="right">
                                    <p>质检师</p>
                                    <p>李四</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="nav">
                        <div className={
                            this.state.flag === '0' ?
                                'list elect' :
                                'list'
                        }
                        onClick={this.flag.bind(this, '0')}
                        >设计方案</div>
                        <div className={
                            this.state.flag === '0' ?
                                'list' :
                                'list elect'
                        }
                        onClick={this.flag.bind(this, '1')}
                        >质检记录</div>
                        {
                            this.state.flag === '0' ?
                                programmeList ?
                                    programmeList.map((item, index) =>
                                        <div className="content-detail" key={index}>
                                            <div className="design-title">{item.name}</div>
                                            <div className="design">{item.remark}</div>
                                            <div className="photo">
                                                {
                                                    item.image_urls.map((photo, indexPhoto) =>
                                                        <img src={photo} key={indexPhoto} alt="加载失败"/>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    ) :
                                    null
                                    :
                                qualityList ?
                                    qualityList.map((items, indexs) =>
                                        <div className="content-detail">
                                            <div className="header">
                                                <img src={items.owner_head_image_url} alt="加载失败"/>
                                                <div className="text">
                                                    <p>{items.owner_name}</p>
                                                    <p className="small">最后更新时间:{items.created_at}</p>
                                                </div>
                                                {/*<div className="but">水电阶段</div>*/}
                                            </div>
                                            <div className="design">{items.remark}</div>
                                            <div className="photo">
                                                {
                                                    items.image_urls.map((photos, indexPhotos) =>
                                                        <img src={photos} alt="加载失败" key={indexPhotos}/>
                                                    )
                                                }
                                            </div>
                                            <Talk/><Talk/><Talk/><Talk/>
                                        </div>
                                    ) :
                                    null
                        }
                    </div>
                </div>
            </div>
        )
    }
}
