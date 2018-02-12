import React, {Component} from 'react'
import Header from '../../global/components/Header'
import Nav from '../../global/components/Nav'
import Home from '../components/Home'
import {api} from '../../config/api'
import {tool} from '../../config/utils'
import {message} from 'antd'

export default class HomeApp extends Component {
  constructor() {
    super()
    this.state = {
        id: null,
        pageView: {},
        caseList: [],
        constructionList: []
    }
  }
  componentDidMount = () => {
      tool.fetch(api.API_GET_PAGE_VIEW, {}, {company_id: sessionStorage.getItem('user-id')}).then(json => {
          if (json.code === 0) {
              this.setState({pageView: json.data})
          }
      })
      this.getConstruction(1, 1)
      this.getCase(1, 1)
  }

  getConstruction = (page, pageSize) => {
      tool.fetch(api.API_GET_LIST, {}, {category_path: 'com.boshu.zx.project', page_index: page, page_size: pageSize}).then(json => {
          if (json.code === 0) {
              this.setState({constructionList: json.data.list})
          }
      })

      //获取工地列表
  }

  getCase = (page, pageSize) => {
      tool.fetch(api.API_GET_LIST, {}, {category_path: 'com.boshu.zx.sample', page_index: page, page_size: pageSize}).then(json => {
          if (json.code === 0) {
              this.setState({caseList: json.data.list})
          }
      })

      // 获取案例列表
  }
    deleteList = id => {
        tool.fetch(api.API_DELETE, {}, {content_id: id})
            .then(json => {
                if (json.code === 0) {
                    message.warning('删除成功')
                    this.getConstruction(1, 1)
                    this.getCase(1, 1)
                } else {
                    message.warning('删除失败')
                }
            })
    }
  jumpHome = (operation, id) => {
     if (operation === 'moreConstruction') {
         this.props.history.push('/constructionsite')
     } else if (operation === 'moreCase') {
         this.props.history.push('/case')
     } else if (operation === 'add') {
         this.props.history.push('/constructionsite/add')
     } else if (operation === 'edit') {
         this.props.history.push(`/constructionsite/add/0?id=${id}`)
     } else if (operation === 'addCase') {
         this.props.history.push('/case/add')
     } else if (operation === 'editCase') {
         this.props.history.push('/case/add/0')
     }
  }

  render() {
return (
      <div>
        <Header/>
        <div style={{float: 'left'}}><Nav/></div>
          <div style={{float: 'left'}}><Home jump={this.jumpHome} pageView={this.state.pageView} constructionList={this.state.constructionList} caseList={this.state.caseList} deleteList={this.deleteList}/></div>
      </div>

    )
  }
}
