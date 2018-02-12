import React, {Component} from 'react'
import '../sass/Establish.scss'
import {Upload, Icon, Modal, message, Form, Input, Button} from 'antd'
import {api} from '../../config/api'
import {tool} from '../../config/utils'

export default class Establish extends Component {
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

  onChangeIsLook = () => {
    this.setState({isLook: !this.state.isLook})
  }
    getValue = flag => {
        let list = []
        let look = '0'

        if (this.state.isLook === false) {
          look = '0'
        } else {
          look = '1'
        }
        if (flag === 'edit') {
                let {forEditList, editId} = this.props
                let editData = forEditList.content_qualifiers
                let zxProjectIsopenId = ''
                let zxProjectProjectNameId = ''
                let zxProjectAddressId = ''
                let zxProjectDetailAddressId = ''
                let zxProjectHouseTypeId = ''
                let zxProjectSquareId = ''
                let zxProjectHomeTypeId = ''
                let zxProjectStageId = ''
                let zxProjectModeId = ''
                let zxProjectStyleId = ''
                let zxProjectBudgetId = ''

                for (let i = 0 ; i < editData.length ; i++) {
                    if (editData[i].variant_code === 'zx.project.isopen') {
                        zxProjectIsopenId = editData[i].id
                    }
                    if (editData[i].variant_code === 'zx.project.projectName') {
                        zxProjectProjectNameId = editData[i].id
                    }
                    if (editData[i].variant_code === 'zx.project.address') {
                        zxProjectAddressId = editData[i].id
                    }
                    if (editData[i].variant_code === 'zx.project.detailAddress') {
                        zxProjectDetailAddressId = editData[i].id
                    }
                    if (editData[i].variant_code === 'zx.project.HouseType') {
                        zxProjectHouseTypeId = editData[i].id
                    }
                    if (editData[i].variant_code === 'zx.project.square') {
                        zxProjectSquareId = editData[i].id
                    }
                    if (editData[i].variant_code === 'zx.project.HomeType') {
                        zxProjectHomeTypeId = editData[i].id
                    }
                    if (editData[i].variant_code === 'zx.project.Stage') {
                        zxProjectStageId = editData[i].id
                    }
                    if (editData[i].variant_code === 'zx.project.Mode') {
                        zxProjectModeId = editData[i].id
                    }
                    if (editData[i].variant_code === 'zx.project.Style') {
                        zxProjectStyleId = editData[i].id
                    }
                    if (editData[i].variant_code === 'zx.project.budget') {
                        zxProjectBudgetId = editData[i].id
                    }
                }
                if (this.projectName.value) {
                    list.push(
                        {
                            id: zxProjectProjectNameId,
                            value: this.projectName.value,
                            variant_code: 'zx.project.projectName',
                            qualifier_code: ''
                        }
                    )
                }
                if (this.houseName.value) {
                    list.push(
                        {
                            id: zxProjectAddressId,
                            value: this.houseName.value,
                            variant_code: 'zx.project.address',
                            qualifier_code: ''
                        }
                    )
                }
                if (this.houseNameDetail.value) {
                    list.push(
                        {
                            id: zxProjectDetailAddressId,
                            value: this.houseNameDetail.value,
                            variant_code: 'zx.project.detailAddress',
                            qualifier_code: ''
                        }
                    )
                }
                if (this.houseCount.value) {
                    list.push(
                        {
                            id: zxProjectSquareId,
                            value: this.houseCount.value,
                            variant_code: 'zx.project.square',
                            qualifier_code: ''
                        }
                    )
                }
                if (this.decorateBudget.value) {
                    list.push(
                        {
                            id: zxProjectBudgetId,
                            value: this.decorateBudget.value,
                            variant_code: 'zx.project.budget',
                            qualifier_code: ''
                        }
                    )
                }
                list.push(
                {
                    id: zxProjectIsopenId,
                    value: look,
                    variant_code: 'zx.project.isopen',
                    qualifier_code: ''
                },
                    {
                        id: zxProjectHouseTypeId,
                        value: '',
                        variant_code: 'zx.project.HouseType',
                        qualifier_code: this.houseUnit.value
                    },
                {
                    id: zxProjectModeId,
                    value: '',
                    variant_code: 'zx.project.Mode',
                    qualifier_code: this.decorateWay.value
                },
                    {
                        id: zxProjectHomeTypeId,
                        value: '',
                        variant_code: 'zx.project.HomeType',
                        qualifier_code: this.houseType.value
                    },
                    {
                        id: zxProjectStageId,
                        value: '',
                        variant_code: 'zx.project.Stage',
                        qualifier_code: this.phase.value
                    },
                {
                    id: zxProjectStyleId,
                    value: '',
                    variant_code: 'zx.project.Style',
                    qualifier_code: this.decorateStyle.value
                }
            )
        } else {
            list.push(
                {
                    qualifier_code: '',
                    value: look,
                    variant_code: 'zx.project.isopen'
                },
                {
                    qualifier_code: '',
                    value: this.projectName.value,
                    variant_code: 'zx.project.projectName'
                },
                {
                    qualifier_code: '',
                    value: this.houseName.value,
                    variant_code: 'zx.project.address'
                },
                {
                    qualifier_code: '',
                    value: this.houseNameDetail.value,
                    variant_code: 'zx.project.detailAddress'
                },
                {
                    qualifier_code: this.houseUnit.value,
                    value: '',
                    variant_code: 'zx.project.HouseType'
                },
                {
                    qualifier_code: '',
                    value: this.houseCount.value,
                    variant_code: 'zx.project.square'
                },
                {
                    qualifier_code: this.houseType.value,
                    value: '',
                    variant_code: 'zx.project.HomeType'
                },
                {
                    qualifier_code: this.phase.value,
                    value: '',
                    variant_code: 'zx.project.Stage'
                },
                {
                    qualifier_code: this.decorateWay.value,
                    value: '',
                    variant_code: 'zx.project.Mode'
                },
                {
                    qualifier_code: this.decorateStyle.value,
                    value: '',
                    variant_code: 'zx.project.Style'
                },
                {
                    qualifier_code: '',
                    value: this.decorateBudget.value,
                    variant_code: 'zx.project.budget'
                },
            )
        }

        let data = {
            content: '',
            content_qualifiers: list
        }

        if (this.state.main_url) {
            data.main_url = this.state.main_url
        }

        if (flag === 'add') {
            this.props.addConstruction(data)
        } else {
            this.props.editList(this.props.editId, data)
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
    let {addConstructionList} = this.props
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
      <div className="establish">
        <div className="content">
            {
                path === '/constructionsite/add/0' ?
                <div className="title">修改工地</div> :
                  <div className="title">创建工地</div>
            }
          <div className="text">
            <div className="left">基本信息</div>
            <div className="right"><input type="checkbox" className="checkbox" onChange={this.onChangeIsLook.bind(this)}/>允许项目被其他人查看</div>
          </div>
          <div className="text">
            <div className="left"><span>*</span>项目名称</div>
            <div className="right"><input type="text" ref={node => this.projectName = node} maxLength="10"/></div>
          </div>
            <div className="text">
                <div className="left"><span>*</span>联系方式</div>
                <div className="right"><input type="text" ref={node => this.phone = node} maxLength="11"/></div>
            </div>
          <div className="text">
            <div className="left"><span>*</span>小区名称</div>
            <div className="right"><input type="text" ref={node => this.houseName = node} maxLength="50"/>
                <i className="iconfont icon-location"></i>
                <input type="text" ref={node => this.houseNameDetail = node} className="two" placeholder="请输入详细门牌号，例8楼808室" maxLength="50"/></div>
          </div>
          <div className="text">
            <div className="left"><span>*</span>户型</div>
            <div className="right">
              <select ref={node => this.houseUnit = node}>
                  {
                      addConstructionList.list &&
                      addConstructionList.list.map(item =>
                          item.variant_code === 'zx.project.HouseType' ?
                              item.variant_qualifiers.map((title, index) =>
                                  <option value={title.code} key={index}>{title.name}</option>
                              ) :
                              null
                      )
                  }
              </select>
              <input type="text" className="two twos" placeholder="共" ref={nade => this.houseCount = nade} maxLength="10"/>
              <em>㎡</em>
            </div>
          </div>
          <div className="text">
            <div className="left"><span>*</span>房型</div>
            <div className="right">
              <select ref={node => this.houseType = node}>
                  {
                      addConstructionList.list &&
                      addConstructionList.list.map(item =>
                          item.variant_code === 'zx.project.HomeType' ?
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
            <div className="left"><span>*</span>施工阶段</div>
            <div className="right">
              <select ref={node => this.phase = node}>
                  {
                      addConstructionList.list &&
                      addConstructionList.list.map(item =>
                          item.variant_code === 'zx.project.Stage' ?
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
                      addConstructionList.list &&
                      addConstructionList.list.map(item =>
                          item.variant_code === 'zx.project.Mode' ?
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
                      addConstructionList.list &&
                      addConstructionList.list.map(item =>
                          item.variant_code === 'zx.project.Style' ?
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
              <input ref={node => this.decorateBudget = node} type="text" placeholder="请填写装修预算" maxLength="10"/>
            </div>
          </div>
          <div className="text">
            <div className="left"><span>*</span>工地封面</div>
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
                path === '/constructionsite/add/0' ?
                    <div className="push" onClick={this.getValue.bind(this, 'edit')}>修改完成</div> :
                    <div className="push" onClick={this.getValue.bind(this, 'add')}>创建完成</div>
            }
        </div>
      </div>
    )
  }
}
