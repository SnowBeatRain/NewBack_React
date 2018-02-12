import React, {Component} from 'react'
import Header from '../../global/components/Header'
import Nav from '../../global/components/Nav'
import Account from '../components/Account'
import AddOrEdit from '../components/AddOrEdit'
import {tool} from '../../config/utils'
import {api} from '../../config/api'

export default class App extends Component {
  constructor() {
    super()
    this.state = {isAddOrEdit: false, from: null, total: 0}
  }
    componentWillMount = () => {
        this.getAccountnumber(1, 10)
    }

    getAccountnumber = (page, pageSize) => {
        tool.fetch(api.API_GET_PEOPLE_LIST, {}, {company_id: sessionStorage.getItem('user-id'), page_index: page, page_size: pageSize}).then(json => {
            if (json.code === 0) {
            }
        })

        //获取活动列表
    }

    isAddOrEdit = id => {
      this.setState({from: id, isAddOrEdit: !this.state.isAddOrEdit})
    }

  render() {
    return (
      <div>
        <Header/>
        <div style={{float: 'left'}}><Nav/></div>
        <div style={{float: 'left'}}><Account isAddOrEdit={this.isAddOrEdit} total={this.state.total}/></div>
          {
              this.state.isAddOrEdit &&
                  <AddOrEdit isAddOrEdit={this.isAddOrEdit} from={this.state.from}/>
          }
      </div>
    )
  }
}
