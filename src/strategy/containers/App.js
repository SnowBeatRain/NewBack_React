import React, {Component} from 'react'
import Header from '../../global/components/Header'
import Nav from '../../global/components/Nav'
import Strategy from '../components/Strategy'
import DeleteStrategy from '../components/DeleteStrategy'
import StrategyEdit from '../components/StrategyEdit'
import {tool} from '../../config/utils'
import {api} from '../../config/api'
import {message} from 'antd'

export default class App extends Component {
  constructor() {
    super()
    this.state = {id: null, isDeleteStrategy: false, strategyList: [], total: 0, addStrategyList: {}, userId: '', editId: ''}
  }

    componentWillMount = () => {
        this.getStrategy(1, 10)

        // 获取添加工地选项列表
        tool.fetch(api.API_GET_CONSTRUCTION_LIST, {}, {}).then(json => {
            if (json.code === 0) {
                this.setState({addStrategyList: json.data})
            }
        })
    }

    addStrategy = data => {
        tool.fetch(api.API_PUSH_LIST, data, {user_id: sessionStorage.getItem('user-id'), category_path: 'com.boshu.zx.strategy'}, true)
            .then(json => {
                if (json.code === 0) {
                    message.success('添加成功')
                    this.getStrategy(1, 10)
                } else {
                    message.warning(json.msg)
                }
            })
    }
    deleteList = id => {
        tool.fetch(api.API_DELETE, {}, {content_id: id})
            .then(json => {
                if (json.code === 0) {
                    message.success('删除成功')
                    this.getStrategy(1, 10)
                    this.props.history.push('/strategy')
                    this.setState({isDeleteStrategy: false})
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
                    this.getStrategy(1, 10)
                    this.props.history.push('/strategy')
                } else {
                    message.warning('修改失败')
                }
            })
    }
    getStrategy = (page, pageSize) => {
        tool.fetch(api.API_GET_LIST, {}, {category_path: 'com.boshu.zx.strategy', page_index: page, page_size: pageSize}).then(json => {
            if (json.code === 0) {
                this.setState({strategyList: json.data.list, total: json.data.count})
            }
        })

        //获取活动列表
    }
    isDeleteStrategy = (is, id) => {
      this.setState({isDeleteStrategy: is, userId: id})
    }
    jumpStrategy = (data, id) => {
        if (data === 'add') {
            this.props.history.push('/strategy/add')
        } else if (data === 'edit') {
            this.props.history.push('/strategy/add/0')
            this.setState({editId: id})
        }
    }

  render() {
    let path = window.location.pathname

    return (
      <div>
        <Header/>
          <div style={{float: 'left'}}><Nav/></div>
          {
              path === '/strategy' ?
                  <div style={{float: 'left'}}><Strategy isDeleteStrategy={this.isDeleteStrategy} jumpStrategy={this.jumpStrategy} strategyList={this.state.strategyList} _changePage={this.getStrategy} total={this.state.total}/></div> :
              path === '/strategy/add' ?
                  <div style={{float: 'left'}}><StrategyEdit editList={this.editList} editId={this.state.editId} strategyList={this.state.strategyList} addStrategyList={this.state.addStrategyList} addStrategy={this.addStrategy}/></div> :
              path === '/strategy/add/0' ?
                  <div style={{float: 'left'}}><StrategyEdit editList={this.editList} editId={this.state.editId} strategyList={this.state.strategyList} addStrategyList={this.state.addStrategyList} addStrategy={this.addStrategy}/></div> :
                  null
          }
        {
            this.state.isDeleteStrategy &&
                <DeleteStrategy isDeleteStrategy={this.isDeleteStrategy} userId={this.state.userId} deleteList={this.deleteList}/>
          }
      </div>
    )
  }
}
