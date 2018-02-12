import React, {Component} from 'react'
import '../sass/AddTalk.scss'
import {Upload, Icon, Modal, message, Form, Input, Button} from 'antd'

export default class AddTalk extends Component {
    constructor() {
        super()
        this.state = {
            isLook: false,
            previewVisible: false,
            previewImage: '',
            fileList: [],
            main_url: ''
        }
    }

    getValue = flag => {
        let editData = this.props.forEditData
        let editDataDetail = editData.content_qualifiers
        let editId = this.props.editId
        let list = []

        if (flag === 'edit') {
            let zxSampleDesignerID = ''
            let zxSampleAddressId = ''
            let zxSampleDetailAddressId = ''
            let zxSampleHouseTypeId = ''
            let zxSampleSquareId = ''
            let zxSampleHomeTypeId = ''
            let zxSampleModeId = ''
            let zxSampleStyleId = ''
            let zxSampleBudgetId = ''

            for (let i = 0 ; i < editDataDetail.length ; i++) {
                if (editDataDetail[i].variant_code === 'zx.sample.designer') {
                    zxSampleDesignerID = editDataDetail[i].id
                }
                if (editDataDetail[i].variant_code === 'zx.sample.address') {
                    zxSampleAddressId = editDataDetail[i].id
                }
                if (editDataDetail[i].variant_code === 'zx.sample.detailAddress') {
                    zxSampleDetailAddressId = editDataDetail[i].id
                }
                if (editDataDetail[i].variant_code === 'zx.sample.HouseType') {
                    zxSampleHouseTypeId = editDataDetail[i].id
                }
                if (editDataDetail[i].variant_code === 'zx.sample.square') {
                    zxSampleSquareId = editDataDetail[i].id
                }
                if (editDataDetail[i].variant_code === 'zx.sample.HomeType') {
                    zxSampleHomeTypeId = editDataDetail[i].id
                }
                if (editDataDetail[i].variant_code === 'zx.sample.Mode') {
                    zxSampleModeId = editDataDetail[i].id
                }
                if (editDataDetail[i].variant_code === 'zx.sample.Style') {
                    zxSampleStyleId = editDataDetail[i].id
                }
                if (editDataDetail[i].variant_code === 'zx.sample.budget') {
                    zxSampleBudgetId = editDataDetail[i].id
                }
            }

            if (this.designName.value) {
                list.push(
                    {
                        id: zxSampleDesignerID,
                        value: this.designName.value,
                        variant_code: 'zx.sample.designer',
                        qualifier_code: ''
                    }
                )
            }
            if (this.houseName.value) {
                list.push(
                    {
                        id: zxSampleAddressId,
                        qualifier_code: '',
                        value: this.houseName.value,
                        variant_code: 'zx.sample.address'
                    }
                )
            }
            if (this.houseNameDetail.value) {
                list.push(
                    {
                        id: zxSampleDetailAddressId,
                        qualifier_code: '',
                        value: this.houseNameDetail.value,
                        variant_code: 'zx.sample.detailAddress'
                    }
                )
            }
            if (this.houseCount.value) {
                list.push(
                    {
                        id: zxSampleSquareId,
                        qualifier_code: '',
                        value: this.houseCount.value,
                        variant_code: 'zx.sample.square'
                    }
                )
            }
            if (this.decorateBudget.value) {
                list.push(
                    {
                        id: zxSampleBudgetId,
                        qualifier_code: '',
                        value: this.decorateBudget.value,
                        variant_code: 'zx.sample.budget'
                    }
                )
            }

            list.push(
                {
                    id: zxSampleHouseTypeId,
                    qualifier_code: this.houseUnit.value,
                    value: '',
                    variant_code: 'zx.sample.HouseType'
                },
                {
                    id: zxSampleHomeTypeId,
                    qualifier_code: this.houseType.value,
                    value: '',
                    variant_code: 'zx.sample.HomeType'
                },
                {
                    id: zxSampleModeId,
                    qualifier_code: this.decorateWay.value,
                    value: '',
                    variant_code: 'zx.sample.Mode'
                },
                {
                    id: zxSampleStyleId,
                    qualifier_code: this.decorateStyle.value,
                    value: '',
                    variant_code: 'zx.sample.Style'
                }
            )
        } else {
            list.push(
                {
                    qualifier_code: '',
                    value: this.designName.value,
                    variant_code: 'zx.sample.designer'
                },
                {
                    qualifier_code: '',
                    value: this.houseName.value,
                    variant_code: 'zx.sample.address'
                },
                {
                    qualifier_code: '',
                    value: this.houseNameDetail.value,
                    variant_code: 'zx.sample.detailAddress'
                },

                {
                    qualifier_code: this.houseUnit.value,
                    value: '',
                    variant_code: 'zx.sample.HouseType'
                },
                {
                    qualifier_code: '',
                    value: this.houseCount.value,
                    variant_code: 'zx.sample.square'
                },
                {
                    qualifier_code: this.houseType.value,
                    value: '',
                    variant_code: 'zx.sample.HomeType'
                },
                {
                    qualifier_code: this.decorateWay.value,
                    value: '',
                    variant_code: 'zx.sample.Mode'
                },
                {
                    qualifier_code: this.decorateStyle.value,
                    value: '',
                    variant_code: 'zx.sample.Style'
                },
                {
                    qualifier_code: '',
                    value: this.decorateBudget.value,
                    variant_code: 'zx.sample.budget'
                },
            )
        }
        let data = {
            content: '',
            content_qualifiers: list
        }

        if (this.title.value) {
            data.title = this.title.value
        }
        if (this.state.main_url) {
            data.main_url = this.state.main_url
        }

        if (flag === 'edit') {
            this.props.editList(editId, data)
        } else {
            this.props.addCase(data)
        }
    }
    handleImageCancel = () => {
        this.setState({previewVisible: false})
    }

    handleImageLoad = (file, fileList) => {
        let reg = /^image\/*/

        if (!reg.test(file.type)) {
            message.warning('不可上传非图片文件')

            return false
        }
        if (file.size > 10485760) {
            message.warning('图片过大，请限制在10M之内')

            return false
        }
    }

    handleImagePreview = file => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true
        })
    }

    handleImageChange = ({file, fileList}) => {
        if (file.response) {
            this.setState({fileList, main_url: file.response.data})
        }
        this.setState({fileList})
    }

    render() {
        let path = window.location.pathname
        let {addCaseList} = this.props
        const {previewVisible, previewImage, fileList} = this.state
        const uploadSetting = {
            action: '/upload/images',
            listType: 'picture-card',
            name: 'image',
            headers: {
                authorization: `Bearer ${sessionStorage.getItem('login-token')}`,
                time: Date.parse(new Date()) / 1000,
                version: 'v1'
            }
        }
        const uploadButton =
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">Upload</div>
            </div>

return (
            <div className="add-talk">
                <div className="content">
                    {
                        path === '/case/add/0' ?
                            <div className="title">修改案例</div> :
                        <div className="title">添加案例</div>
                    }
                    <div className="text">
                        <div className="left">基本信息</div>
                        <div className="right"></div>
                    </div>
                    <div className="text">
                        <div className="left"><span>*</span>案例名称</div>
                        <div className="right"><input type="text" ref={node => this.title = node}/></div>
                    </div>
                    <div className="text">
                        <div className="left"><span>*</span>设计师</div>
                        <div className="right"><input type="text" ref={node => this.designName = node}/></div>
                    </div>
                    <div className="text">
                        <div className="left"><span>*</span>小区名称</div>
                        <div className="right"><input type="text" ref={node => this.houseName = node}/>
                            <i className="iconfont icon-location"></i>
                            <input type="text" className="two" placeholder="请输入详细门牌号，例8楼808室" ref={node => this.houseNameDetail = node}/></div>
                    </div>
                    <div className="text">
                        <div className="left"><span>*</span>户型</div>
                        <div className="right">
                            <select ref={node => this.houseUnit = node}>
                                {
                                    addCaseList.list &&
                                    addCaseList.list.map(item =>
                                        item.variant_code === 'zx.sample.HouseType' ?
                                            item.variant_qualifiers.map((title, index) =>
                                                <option value={title.code} key={index}>{title.name}</option>
                                            ) :
                                            null
                                    )
                                }
                            </select>
                            <input type="text" className="two twos" placeholder="共" ref={node => this.houseCount = node}/>
                            <em>㎡</em>
                        </div>
                    </div>
                    <div className="text">
                        <div className="left"><span>*</span>房型</div>
                        <div className="right">
                            <select ref={node => this.houseType = node}>
                                {
                                    addCaseList.list &&
                                    addCaseList.list.map(item =>
                                        item.variant_code === 'zx.sample.HomeType' ?
                                            item.variant_qualifiers.map((title, index) =>
                                                <option value={title.code} key={index}>{title.name}</option>
                                            ) :
                                            null
                                    )
                                }
                            </select>
                        </div>
                    </div>
                    <div className="text">
                        <div className="left"><span>*</span>装修方式</div>
                        <div className="right">
                            <select ref={node => this.decorateWay = node}>
                                {
                                    addCaseList.list &&
                                    addCaseList.list.map(item =>
                                        item.variant_code === 'zx.sample.Mode' ?
                                            item.variant_qualifiers.map((title, index) =>
                                                <option value={title.code} key={index}>{title.name}</option>
                                            ) :
                                            null
                                    )
                                }
                            </select>
                        </div>
                    </div>
                    <div className="text">
                        <div className="left"><span>*</span>装修风格</div>
                        <div className="right">
                            <select ref={node => this.decorateStyle = node}>
                                {
                                    addCaseList.list &&
                                    addCaseList.list.map(item =>
                                        item.variant_code === 'zx.sample.Style' ?
                                            item.variant_qualifiers.map((title, index) =>
                                                <option value={title.code} key={index}>{title.name}</option>
                                            ) :
                                            null
                                    )
                                }
                            </select>
                        </div>
                    </div>
                    <div className="text">
                        <div className="left"><span>*</span>装修预算</div>
                        <div className="right">
                            <input type="text" placeholder="请填写" ref={node => this.decorateBudget = node}/>
                        </div>
                    </div>
                    <div className="text">
                        <div className="left"><span>*</span>案例封面</div>
                        <div className="right">建议上传效果图，支持JPG/JPGE/PNG格式，最大10MB</div>
                    </div>
                    <div className="photo">
                        <div className="clearfix">
                            <Upload
                                {...uploadSetting}
                                fileList={fileList}
                                accept="image/png,image/jpg,image/jpeg,image/gif,image/bmp"
                                beforeUpload={this.handleImageLoad}
                                onPreview={this.handleImagePreview}
                                onChange={this.handleImageChange}
                            >
                                {fileList.length >= 1 ? null : uploadButton}
                            </Upload>
                            <Modal visible={previewVisible} footer={null} onCancel={this.handleImageCancel}>
                                <img alt="example" style={{width: '100%'}} src={previewImage}/>
                            </Modal>
                        </div>
                    </div>
                    {
                        path === '/case/add/0' ?
                            <div className="push" onClick={this.getValue.bind(this, 'edit')}>完成</div> :
                            <div className="push" onClick={this.getValue.bind(this, 'add')}>完成</div>
                    }
                </div>
            </div>
        )
    }
}
