import React, {Component} from 'react'
import '../sass/Edit.scss'
import {Upload, Icon, Modal, message, Form, Input, Button, DatePicker} from 'antd'

export default class Edit extends Component {
    constructor() {
        super()
        this.state = {
            time: '',
            previewVisible: false,
            previewImage: '',
            fileList: [],
            main_url: ''
        }
    }

    onChangeTime = (data, dataString) => {
        this.setState({time: dataString})
    }

    pushData = flag => {
        let editId = this.props.forEditId
        let activityList = this.props.activityList
        let list = []
        let zxActivityEndTimeId = ''

        for (let i = 0 ; i < activityList.length ; i++) {
            if (editId === activityList[i].id) {
                for (let j = 0 ; j < activityList[i].content_qualifiers.length ; j++) {
                    if (activityList[i].content_qualifiers[j].variant_code === 'zx.activity.endTime') {
                        zxActivityEndTimeId = activityList[i].content_qualifiers[j].id
                    }
                }
            }
        }
        if (flag === 'edit') {
            list.push(
                {
                    id: zxActivityEndTimeId,
                    qualifier_code: '',
                    value: this.state.time,
                    variant_code: 'zx.activity.endTime'
                }
            )
        } else {
            list.push(
                {
                    qualifier_code: '',
                    value: this.state.time,
                    variant_code: 'zx.activity.endTime'
                }
            )
        }
        let data = {content_qualifiers: list}

        if (this.name.value) {
            data.title = this.name.value
        }

        if (this.state.main_url) {
            data.main_url = this.state.main_url
        }

        if (this.rule.value) {
            data.content = this.rule.value
        }

        if (flag === 'edit') {
            this.props.editList(editId, data)
        } else {
            this.props.addActivity(data)
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
        let way = window.location.pathname
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
            <div className="edit">
                <div className="box">
                    {
                        way === '/activity/add/0' ?
                            <div className="header">修改活动</div> :
                            <div className="header">创建活动</div>
                    }
                    <div className="text">
                        <div className="left"><span>*</span>活动名称</div>
                        <div className="right"><input type="text" ref={node => this.name = node}/></div>
                    </div>
                    <div className="text">
                        <div className="left"><span>*</span>活动规则</div>
                        <div className="right"><textarea ref={node => this.rule = node}></textarea></div>
                    </div>
                    <div className="text">
                        <div className="left"><span>*</span>截止日期</div>
                        <div className="right"><DatePicker onChange={this.onChangeTime}/></div>
                    </div>
                    <div className="text">
                        <div className="left"><span>*</span>活动Banner</div>
                        <div className="right"><p>JPG/JPGE/PNG，大小尺寸750*270px</p></div>
                    </div>
                    <div className="text">
                        <div className="left"></div>
                        <div className="right">
                            <div className="upload"><div className="clearfix">
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
                            </div></div>
                        </div>
                    </div>
                    {
                        way === '/activity/add/0' ?
                            <div className="but" onClick={this.pushData.bind(this, 'edit')}>修改完成</div> :
                            <div className="but" onClick={this.pushData.bind(this, 'add')}>创建完成</div>
                    }
                </div>
            </div>
        )
    }
}
