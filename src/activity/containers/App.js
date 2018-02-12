import React, {Component} from 'react'
import Header from '../../global/components/Header'
import Nav from '../../global/components/Nav'
import Activity from '../components/Activity'
import Edit from '../components/Edit'
import Delete from '../components/Delete'
import {tool} from '../../config/utils'
import {message} from 'antd'
import {api} from '../../config/api'

export default class App extends Component {
  constructor() {
    super()
    this.state = {isDelete: false, activityList: [], total: 0, userId: '', forEditId: ''}
  }

  componentWillMount = () => {
      this.getActivity(1, 10)
  }

  getActivity = (page, pageSize) => {
      tool.fetch(api.API_GET_LIST, {}, {category_path: 'com.boshu.zx.activity', page_index: page, page_size: pageSize}).then(json => {
          if (json.code === 0) {
              this.setState({activityList: json.data.list, total: json.data.count})
          }
      })

      //获取活动列表
  }

  addActivity = data => {
      tool.fetch(api.API_PUSH_LIST, data, {user_id: sessionStorage.getItem('user-id'), category_path: 'com.boshu.zx.activity'}, true)
          .then(json => {
              if (json.code === 0) {
                  message.success('添加成功')
                  this.getActivity(1, 10)
              } else {
                  message.warning(json.msg)
              }
          })
  }

    editList = (id, data) => {
        tool.fetch(api.API_EDIT, data, {content_id: id}, true)
            .then(json => {
                if (json.code === 0) {
                    message.success('修改成功')
                    this.getActivity(1, 10)
                    this.props.history.push('/activity')
                } else {
                    message.warning('修改失败')
                }
            })
    }
    deleteList = id => {
        tool.fetch(api.API_DELETE, {}, {content_id: id})
            .then(json => {
                if (json.code === 0) {
                    message.success('删除成功')
                    this.getActivity(1, 10)
                    this.setState({isDelete: false})
                    this.props.history.push('/activity')
                } else {
                    message.warning('删除失败')
                }
            })
    }
    isDelete = (is, id) => {
        this.setState({isDelete: is, userId: id})
    }
    jumpActivity = (data, id) => {
      if (data === 'add') {
          this.props.history.push('/activity/add')
      } else if (data === 'edit') {
          this.props.history.push('/activity/add/0')
          this.setState({forEditId: id})
      }
    }
  render() {
      let way = window.location.pathname

    return (
      <div>
        <Header/>
        <div style={{float: 'left'}}><Nav/></div>
          {
              way === '/activity' ?
                  <div style={{float: 'left'}}><Activity isDelete={this.isDelete} jumpActivity={this.jumpActivity} activityList={this.state.activityList} _changePage={this.getActivity} total={this.state.total}/></div> :
              way === '/activity/add' ?
                  <div style={{float: 'left'}}><Edit addActivity={this.addActivity} editList={this.editList} forEditId={this.state.forEditId} activityList={this.state.activityList}/></div> :
              way === '/activity/add/0' ?
                  <div style={{float: 'left'}}><Edit addActivity={this.addActivity} editList={this.editList} forEditId={this.state.forEditId} activityList={this.state.activityList}/></div> :
                  null
          }
          {this.state.isDelete &&
            <Delete isDelete={this.isDelete} userId={this.state.userId} deleteList={this.deleteList}/>
          }
      </div>
    )
  }
}
