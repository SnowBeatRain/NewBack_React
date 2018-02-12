import React, {Component} from 'react'
import ConstructionsiteAll from '../components/ConstructionsiteAll'
import Header from '../../global/components/Header'
import Nav from '../../global/components/Nav'
import Establish from '../components/Establish'
import Detail from '../components/Detail'
import UpdatePhoto from '../components/UpdatePhoto'
import Add from '../components/Add'
import {api} from '../../config/api'
import {tool} from '../../config/utils'
import {message} from 'antd'

export default class App extends Component {
  constructor() {
    super()
      this.state = {
        isUpdatePhoto: false,
        isAdd: false,
        constructionList: [],
        caseList: [],
        addConstructionList: [],
        detaliList: {},
          total: 0,
          playList: [],
          editId: '',
          forEditList: {}
    }
  }

    componentWillMount = () => {
        if (window.location.search) {
            console.log(tool.getquery('id'))
        }

        this.getConstructionList(1, 10)

        // 获取添加工地选项列表
        tool.fetch(api.API_GET_CONSTRUCTION_LIST, {}, {}).then(json => {
            if (json.code === 0) {
                this.setState({addConstructionList: json.data})
            }
        })

        // 获取工地直播
        tool.fetch(api.API_GET_LIST, {}, {category_path: 'com.boshu.zx.play'}).then(json => {
            if (json.code === 0) {
                this.setState({playList: json.data})
            }
        })
    }

    deleteList = id => {
      tool.fetch(api.API_DELETE, {}, {content_id: id})
          .then(json => {
              if (json.code === 0) {
                  message.success('删除成功')
                  this.getConstructionList(1, 10)
                  this.props.history.push('/constructionsite')
              } else {
                  message.warning('删除失败')
              }
          })
    }
    editList = (id, data) => {
        tool.fetch(api.API_EDIT, data, {content_id: id}, true)
            .then(json => {
                if (json.code === 0) {
                    message.success('修改成功')
                    this.getConstructionList(1, 10)
                    this.props.history.push('/constructionsite')
                } else {
                    message.warning('修改失败')
                }
            })
    }

    getConstructionList = (page, pageSize) => {
        tool.fetch(api.API_GET_LIST, {}, {category_path: 'com.boshu.zx.project', page_index: page, page_size: pageSize}).then(json => {
            if (json.code === 0) {
                this.setState({constructionList: json.data.list, total: json.data.count})
            }
        })

        // 获取工地列表
    }
  isUpdatePhoto = is => {
      this.setState({isUpdatePhoto: is})
  }
  isAdd = is => {
    this.setState({isAdd: is})
  }

  jumpConstruction = (data, id) => {
    if (data === 'detail') {
       this.props.history.push('/constructionsite/detail')
       let constructionDetail = this.state.constructionList

       for (let i = 0 ; i < constructionDetail.length ; i++) {
           if (constructionDetail[i].id === id) {
                this.setState({detaliList: constructionDetail[i]})
           }
       }
    } else if (data === 'addConstruction') {
        this.props.history.push('/constructionsite/add')
    } else if (data === 'editConstruction') {
        this.props.history.push('/constructionsite/add/0')
        this.setState({editId: id})
        let conList = this.state.constructionList

        for (let i = 0 ; i < conList.length ; i++) {
            if (conList[i].id === id) {
                this.setState({forEditList: conList[i]})
            }
        }
    }
  }

  // 新建工地
  addConstruction = data => {
      tool.fetch(api.API_PUSH_LIST, data, {user_id: sessionStorage.getItem('user-id'), category_path: 'com.boshu.zx.project'}, true)
          .then(json => {
              if (json.code === 0) {
                  message.success('添加成功')
                  this.getConstructionList(1, 10)
              } else {
                  message.warning(json.msg)
              }
          })
  }
  render() {
      let way = window.location.pathname

return (
      <div>
        <Header/>
        <div style={{float: 'left'}}><Nav/></div>
          {
              way === '/constructionsite' ?
                <div style={{float: 'left'}}>
                    <ConstructionsiteAll deleteList={this.deleteList} isUpdatePhoto={this.isUpdatePhoto} jumpConstruction={this.jumpConstruction} constructionList={this.state.constructionList} _changePage={this.getConstructionList} total={this.state.total}/>
                </div> :
              way === '/constructionsite/detail' ?
                <div style={{float: 'left'}}>
                    <Detail isUpdatePhoto={this.isUpdatePhoto} isAdd={this.isAdd} jumpConstruction={this.jumpConstruction} detaliList={this.state.detaliList} playList={this.state.playList}/>
                </div> :
              way === '/constructionsite/add' ?
                <div style={{float: 'left'}}>
                    <Establish addConstructionList={this.state.addConstructionList} addConstruction={this.addConstruction} editList={this.editList} editId={this.state.editId} forEditList={this.state.forEditList}/>
                </div> :
              way === '/constructionsite/add/0' ?
                  <div style={{float: 'left'}}>
                     <Establish addConstructionList={this.state.addConstructionList} addConstruction={this.addConstruction} editList={this.editList} editId={this.state.editId} forEditList={this.state.forEditList}/>
                  </div> :
                  null
          }
          {this.state.isUpdatePhoto &&
          <UpdatePhoto isUpdatePhoto={this.isUpdatePhoto}/>}
          {this.state.isAdd &&
          <Add isAdd={this.isAdd}/>}
      </div>
    )
  }
}
