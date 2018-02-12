import React, {Component} from 'react'
import '../sass/StrategyEdit.scss'
import {Upload, Icon, Modal, message, Form, Input, Button} from 'antd'

export default class StrategyEdit extends Component {
    constructor() {
        super()
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: [],
            main_url: ''
        }
    }
    getValue = flag => {
        let list = []
        let editId = this.props.editId
        let strategyList = this.props.strategyList
        let zxStrategyStageId = ''

        for (let i = 0 ; i < strategyList.length ; i++) {
            if (editId === strategyList[i].id) {
                for (let j = 0; j < strategyList[i].content_qualifiers.length; j++) {
                    if (strategyList[i].content_qualifiers[j].variant_code === 'zx.strategy.Stage') {
                        zxStrategyStageId = strategyList[i].content_qualifiers[j].id
                    }
                }
            }
        }
        if (flag === 'edit') {
            list.push(
                {
                    id: zxStrategyStageId,
                    qualifier_code: this.stage.value,
                    value: '',
                    variant_code: 'zx.strategy.Stage'
                }
            )
        } else {
            list.push(
                {
                    qualifier_code: this.stage.value,
                    value: '',
                    variant_code: 'zx.strategy.Stage'
                }
            )
        }
        let data = {content_qualifiers: list}

        if (this.title.value) {
            data.title = this.title.value
        }
        if (this.content.value) {
            data.content = this.content.value
        }
        if (this.state.main_url) {
            data.main_url = this.state.main_url
        }
        if (flag === 'edit') {
            this.props.editList(editId, data)
        } else {
            this.props.addStrategy(data)
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
        let {addStrategyList} = this.props
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
            <div className="strategy-edit">
                <div className="content">
                    {
                        path === '/strategy/add/0' ?
                            <div className="title">修改攻略</div> :
                        <div className="title">新增攻略</div>
                    }
                    <div className="text">
                        <div className="left"><span>*</span>装修阶段</div>
                        <div className="right">
                            <select ref={node => this.stage = node}>
                                {
                                    addStrategyList.list &&
                                    addStrategyList.list.map(item =>
                                        item.variant_code === 'zx.strategy.Stage' ?
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
                        <div className="left"><span>*</span>标题</div>
                        <div className="right">
                            <input type="text" placeholder="请添加攻略标题" ref={node => this.title = node} maxLength={10}/>
                        </div>
                    </div>
                    <div className="text">
                        <div className="left"><span>*</span>封面案例</div>
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
                    <div className="text">
                        <div className="left"><span>*</span>内容</div>
                        <div className="right"><textarea type="text" placeholder="请添加攻略内容" ref={node => this.content = node} maxLength={200}></textarea></div>
                    </div>
                    {
                        path === '/strategy/add/0' ?
                            <div className="push" onClick={this.getValue.bind(this, 'edit')}>修改</div> :
                            <div className="push" onClick={this.getValue.bind(this, 'add')}>提交</div>
                    }
                </div>
            </div>
        )
    }
}
