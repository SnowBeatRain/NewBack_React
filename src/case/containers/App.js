import React, {Component} from 'react'
import Header from '../../global/components/Header'
import Nav from '../../global/components/Nav'
import Case from '../components/Case'
import CaseDetail from '../components/CaseDetail'
import AddTalk from '../components/AddTalk'
import UploadEffect from '../components/UploadEffect'
import {api} from '../../config/api'
import {tool} from '../../config/utils'
import {message} from 'antd'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
        id: null,
        caseList: [],
        caseData: {},
        designList: [],
        testList: [],
        total: 0,
        addCaseList: [],
        editId: '',
        forEditData: {},
        qualityList: [],
        programmeList: []
    }
  }

    componentWillMount = () => {
        this.getCase(1, 10)

        // 获取添加案例选项列表
        tool.fetch(api.API_GET_CONSTRUCTION_LIST, {}, {}).then(json => {
            if (json.code === 0) {
                this.setState({addCaseList: json.data})
            }
        })
    }
    deleteList = id => {
        tool.fetch(api.API_DELETE, {}, {content_id: id})
            .then(json => {
                if (json.code === 0) {
                    message.success('删除成功')
                    this.getCase(1, 10)
                    this.props.history.push('/case')
                } else {
                    message.warning('删除失败')
                }
            })
    }
    getCase = (page, pageSize) => {
        tool.fetch(api.API_GET_LIST, {}, {category_path: 'com.boshu.zx.sample', page_index: page, page_size: pageSize}).then(json => {
            if (json.code === 0) {
                this.setState({caseList: json.data.list, total: json.data.count})
            }
        })

        // 获取案例列表
    }

    addCase = (data, id) => {
        tool.fetch(api.API_PUSH_LIST, data, {user_id: sessionStorage.getItem('user-id'), category_path: 'com.boshu.zx.sample'}, true)
            .then(json => {
                if (json.code === 0) {
                        message.success('添加成功')
                        this.getCase(1, 10)

                        // this.jumpCase('uploadadd')
                } else {
                    message.warning(json.msg)
                }
            })
    }
    editList = (id, data) => {
        tool.fetch(api.API_EDIT, data, {content_id: id}, true)
            .then(json => {
                if (json.code === 0) {
                    this.getCase(1, 10)
                    message.success('编辑成功')

                    // this.jumpCase('uploadedit')
                } else {
                }
            })
    }

    //获取详情页面方案
    getProgramme = id => {
        tool.fetch(api.API_GET_CASE_DETAIL, {}, {content_id: id, category_path: 'com.boshu.zx.sampleScheme'})
            .then(json => {
                if (json.code === 0) {
                    this.setState({programmeList: json.data.list})
                } else {
                    message.warning('获取案例列表失败')
                }
            })
    }

    //获取详情页面质检记录
    getQuality= id => {
        tool.fetch(api.API_GET_CASE_DETAIL, {}, {content_id: id, category_path: 'com.boshu.zx.sampleQC'})
            .then(json => {
                if (json.code === 0) {
                    this.setState({qualityList: json.data.list})
                } else {
                    message.warning('获取质检记录列表失败')
                }
            })
    }
    jumpCase = (data, id) => {
      if (data === 'add') {
          this.props.history.push('/case/add')
      } else if (data === 'edit') {
          this.props.history.push('/case/add/0')
          this.setState({editId: id})
          for (let i = 0 ; i < this.state.caseList.length ; i++) {
              if (id === this.state.caseList[i].id) {
                  this.setState({forEditData: this.state.caseList[i]})
              }
          }
      } else if (data === 'detail') {
          this.props.history.push('/case/detail')
          let caseDetail = this.state.caseList

          this.getQuality(id)
          this.getProgramme(id)

          for (let i = 0 ; i < caseDetail.length ; i++) {
              if (caseDetail[i].id === id) {
                  this.setState({caseData: caseDetail[i]})
              }
          }

          // 获取设计方案
          tool.fetch(api.API_GET_CASE_DESIGN, {}, {content_id: id, category_path: 'com.boshu.zx.sampleScheme'}).then(json => {
              if (json.code === 0) {
                  this.setState({designList: json.data.list})
              }
          })

          // 获取质检记录
          tool.fetch(api.API_GET_CASE_DESIGN, {}, {content_id: id, category_path: 'com.boshu.zx.sampleQC'}).then(json => {
              if (json.code === 0) {
                  this.setState({testList: json.data.list})
              }
          })
      } else if (data === 'uploadadd') {
          this.props.history.push('/case/uploadadd')
      } else if (data === 'uploadedit') {
          this.props.history.push('/case/uploadedit')
      }
  }
  render() {
      let way = window.location.pathname

    return (
      <div>
        <Header/>
        <div style={{float: 'left'}}><Nav/></div>
          {
              way === '/case' ?
                  <div style={{float: 'left'}}><Case jumpCase={this.jumpCase} caseList={this.state.caseList} _changePage={this.getCase} total={this.state.total} deleteList={this.deleteList}/></div> :
              way === '/case/detail' ?
                  <div style={{float: 'left'}}><CaseDetail programmeList={this.state.programmeList} qualityList={this.state.qualityList} deleteList={this.deleteList} jumpCase={this.jumpCase} caseData={this.state.caseData} designList={this.state.designList} caseList={this.state.caseList}/></div> :
              way === '/case/add' ?
                  <div style={{float: 'left'}}><AddTalk jumpCase={this.jumpCase} addCaseList={this.state.addCaseList} addCase={this.addCase} editList={this.editList} editId={this.state.editId} forEditData={this.state.forEditData}/></div> :
              way === '/case/add/0' ?
                   <div style={{float: 'left'}}><AddTalk jumpCase={this.jumpCase} addCaseList={this.state.addCaseList} addCase={this.addCase} editList={this.editList} editId={this.state.editId} forEditData={this.state.forEditData}/></div> :
              way === '/case/uploadadd' ?
                   <div style={{float: 'left'}}><UploadEffect/></div> :
              way === '/case/uploadedit' ?
                   <div style={{float: 'left'}}><UploadEffect/></div> :
              null
          }
        {/**/}
      </div>
    )
  }
}
